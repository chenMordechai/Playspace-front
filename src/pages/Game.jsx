import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { getGameById } from "../store/actions/game.action.js"
import { ActivityPreview } from "../cmps/ActivityPreview"
import { StagePreview } from "../cmps/StagePreview"
import { GameLine } from "../cmps/GameLine"
import { demoDataService } from "../services/demoData.service.js"



// game/:gameId

export function Game() {
    const [game, setGame] = useState(null)
    const [currGameStepIdx, setCurrGameStepIdx] = useState(0) // 0:before ,1:stages/activities , 2:end
    const [currStageIdx, setCurrStageIdx] = useState(0)
    const [currActivityIdx, setCurrActivityIdx] = useState(0)

    const [currStageStepIdx, setCurrStageStepIdx] = useState(0)
    const [currActivityStepIdx, setCurrActivityStepIdx] = useState(0)

    const { gameId } = useParams()

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        changeColorsVars()
    }, [game])

    useEffect(() => {
        console.log('currStageIdx:', currStageIdx)
        if (currStageIdx === game?.stages?.length) setCurrGameStepIdx(prev => prev + 1)
    }, [currStageIdx])

    useEffect(() => {
        console.log('currActivityIdx:', currActivityIdx)
        if (currActivityIdx === game?.activities?.length) setCurrGameStepIdx(prev => prev + 1)
    }, [currActivityIdx])

    useEffect(() => {
        console.log('currGameStepIdx:', currGameStepIdx)
    }, [currGameStepIdx])


    async function init() {
        try {
            // game with stages - onTime:
            const game = await demoDataService.getGame1()
            // game with activities - onProgress:
            // const game = await demoDataService.getGame2()
            // game with activities - open:
            // const game = await demoDataService.getGame3()
            console.log('game:', game)
            // const shallowGame = 
            setGame(game)
        } catch (err) {
            console.log('err:', err)
        }
    }

    function changeColorsVars() {
        const elRoot = document.querySelector(':root')
        game?.themeColors.forEach((color, i) => {
            elRoot.style.setProperty(`--clr-${i}`, color);
        })
    }

    function getClockForGame() {
        console.log('game:', game)
        const now = Date.now()
        let diff = game.gameStartTimestamp - now
        return diff

    }

    function moveToNextStage() {
        setCurrStageIdx(prev => prev + 1)
    }

    function onMoveToNextActivity() {
        setCurrActivityIdx(prev => prev + 1)
    }

    function onResetActivityIdx() {
        setCurrActivityIdx(0)
    }

    // click on the gameLine
    function onChangeStageIdx(idx) {
        if (game.activityProgressType !== 'open') return
        setCurrStageIdx(idx)
        // setCurrStageStepIdx(0)
    }

    // click on the gameLine
    function onChangeActivityIdx(activityIdx, stageIdx) {
        if (game.activityProgressType !== 'open') return
        setCurrActivityIdx(activityIdx)
        setCurrActivityStepIdx(0)

        if (stageIdx !== undefined) {
            if (currStageStepIdx === 0) return
            setCurrStageIdx(stageIdx)

        }
    }

    function onSetCurrGameStepIdx() {
        if (game.activityProgressType === 'onTime') {
            if (!isGameStart || isGameEnd()) return
        }
        setCurrGameStepIdx(prev => prev + 1)
    }

    function isGameStart() {
        return game.gameStartTimestamp < Date.now()
    }

    function isGameEnd() {
        return game.gameEndTimestamp < Date.now()
    }

    if (!game) return ''
    return (
        <section className="game-container rtl">

            {/* game color theme */}
            <div className="clr1">First</div>
            <div className="clr2">Second</div>
            <div className="clr3">Third</div>

            {/* start game */}
            {currGameStepIdx === 0 && <> <h1>ברוך הבא למשחק</h1>
                <h2>שם המשחק:{game.name}</h2>

                {game.activityProgressType === 'onTime' && <section>
                    {game.gameStartTimestamp && game.gameEndTimestamp && <>

                        {!isGameStart() > 0 && <> <h4>המשחק יתחיל בתאריך:  {game.dateStart}</h4>
                            <h4>בשעה: {game.timeStart}</h4>
                            <h4>בעוד: {getClockForGame() + 'ms'}</h4>
                            <h4>ויסתיים בתאריך:  {game.dateEnd}</h4>
                            <h4>בשעה: {game.timeEnd}</h4>
                        </>}
                        {
                            isGameEnd() && <h2>המשחק הסתיים</h2>
                        }
                        {
                            isGameStart() && !isGameEnd() && <> <h2>המשחק התחיל</h2>
                                {game.activityProgressType === 'onProgress' && <section>
                                    המשחק לפי התקדמות, כל שלב יפתח אחרי שתסיימו את השלב הקודם
                                </section>}
                                {game.activityProgressType === 'open' && <section>
                                    המשחק פתוח ואפשר לעבור בין השלבים והשאלות איך שרוצים
                                </section>}
                                {game.textBefore && <h4>הודעה לפני המשחק: {game.textBefore}</h4>}
                                <button onClick={onSetCurrGameStepIdx}>התחל לשחק</button>
                            </>
                        }

                    </>}
                </section>}
            </>}

            {/* gameline  */}
            {currGameStepIdx === 1 && <GameLine stages={game.stages} activities={game.activities} onChangeStageIdx={onChangeStageIdx} onChangeActivityIdx={onChangeActivityIdx} />}
            {/* game stages / activities */}
            {currGameStepIdx === 1 && <>
                {game.gameType === 'stages' && <StagePreview stage={game.stages[currStageIdx]} moveToNextStage={moveToNextStage} onResetActivityIdx={onResetActivityIdx} currActivityIdx={currActivityIdx} onMoveToNextActivity={onMoveToNextActivity} currActivityStepIdx={currActivityStepIdx} setCurrActivityStepIdx={setCurrActivityStepIdx} currStageStepIdx={currStageStepIdx} setCurrStageStepIdx={setCurrStageStepIdx} />}
                {game.gameType === 'activities' && <ActivityPreview activity={game.activities[currActivityIdx]} moveToNextActivity={onMoveToNextActivity} currActivityStepIdx={currActivityStepIdx} setCurrActivityStepIdx={setCurrActivityStepIdx} />}
            </>}

            {/* end game */}
            {currGameStepIdx === 2 && <>
                <h2> המשחק הסתיים</h2>
                {game.textAfter && <h4>הודעה אחרי המשחק:{game.textAfter}</h4>}
            </>}

        </section>
    )
}