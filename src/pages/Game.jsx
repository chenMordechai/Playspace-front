import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { getGameById } from "../store/actions/game.action.js"
import { ActivityPreview } from "../cmps/ActivityPreview"
import { StagePreview } from "../cmps/StagePreview"
import { GameLine } from "../cmps/GameLine"
import { demoDataService } from "../services/demoData.service.js"
import { utilService } from "../services/util.service.js"
import logoBig from '../assets/img/logo-big.png'
import points from '../assets/img/3points.png'
import { GameScore } from "../cmps/GameScore.jsx"


// game/:gameId

export function Game() {
    const [game, setGame] = useState(null)
    const [currGameStepIdx, setCurrGameStepIdx] = useState(utilService.loadFromStorage('currGameStepIdx') || 0) // 0:before ,1:stages/activities , 2:end
    const [currStageStepIdx, setCurrStageStepIdx] = useState(utilService.loadFromStorage('currStageStepIdx') || 0)
    const [currActivityStepIdx, setCurrActivityStepIdx] = useState(utilService.loadFromStorage('currActivityStepIdx') || 0)

    const [currStageIdx, setCurrStageIdx] = useState(utilService.loadFromStorage('currStageIdx') || 0)
    const [currActivityIdx, setCurrActivityIdx] = useState(utilService.loadFromStorage('currActivityIdx') || 0)

    const [isGameScoreOpen, setIsGameScoreOpen] = useState(true)
    const [players, setPlayers] = useState(null)

    const { gameId } = useParams()

    useEffect(() => {
        // get player from store
        // if !loggdin player return
        init()
        // saveIdxsToStorage()

        getPlayers()
    }, [])

    useEffect(() => {
        changeColorsVars()
    }, [game])

    useEffect(() => {
        utilService.saveToStorage('currStageIdx', currStageIdx)
        if (currStageIdx === game?.stages?.length) setCurrGameStepIdx(prev => prev + 1)
    }, [currStageIdx])

    useEffect(() => {
        utilService.saveToStorage('currActivityIdx', currActivityIdx)
        if (game?.gameType === 'stages') {
            if (currActivityIdx === game?.stages[currStageIdx]?.activities?.length) {
                setCurrStageStepIdx(prev => prev + 1)
            }
        } else {
            if (currActivityIdx === game?.activities?.length) {
                setCurrGameStepIdx(prev => prev + 1)
            }
        }
    }, [currActivityIdx])

    useEffect(() => {
        utilService.saveToStorage('currGameStepIdx', currGameStepIdx)
    }, [currGameStepIdx])
    useEffect(() => {
        utilService.saveToStorage('currStageStepIdx', currStageStepIdx)
    }, [currStageStepIdx])
    useEffect(() => {
        utilService.saveToStorage('currActivityStepIdx', currActivityStepIdx)
    }, [currActivityStepIdx])


    async function init() {
        try {
            // work : http://localhost:5173/game/96ebb7e2-abf2-46df-1727-08dc75a038e2
            // const game = await getGameById(gameId)

            // demo data
            // game with stages - onTime:
            // const game = await demoDataService.getGame1()
            // utilService.setTimesFormChanges(game)
            // game with activities - onProgress:
            // const game = await demoDataService.getGame2()
            // game with activities - open:
            const game = await demoDataService.getGame3()
            // game with stages - onProgress:
            // const game = await demoDataService.getGame4()

            console.log('game:', game)
            setGame(game)
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function getPlayers() {
        // todo: get players from my group

        const players = [
            {
                id: '01',
                name: 'you',
                score: 1067,
                media: { url: "/src/assets/img/avatar4.png", type: "image" }
            },
            {
                id: '02',
                name: '1189',
                score: 1389,
                media: { url: "/src/assets/img/avatar3.png", type: "image" }
            },
            {
                id: '03',
                name: 'shirel',
                score: 645,
                media: { url: "/src/assets/img/avatar1.png", type: "image" }
            },
            {
                id: '04',
                name: 'yaniv',
                score: 800,
                media: { url: "/src/assets/img/avatar2.png", type: "image" }
            },
            {
                id: '05',
                name: 'moshe',
                score: 765,
                media: { url: "/src/assets/img/avatar6.png", type: "image" }
            },
            // {
            //     id: '06',
            //     name: 'moshe',
            //     score: 765,
            //     media: { url: "/src/assets/img/avatar6.png", type: "image" }
            // },
            // {
            //     id: '07',
            //     name: 'moshe',
            //     score: 765,
            //     media: { url: "/src/assets/img/avatar6.png", type: "image" }
            // },
            // {
            //     id: '08',
            //     name: 'moshe',
            //     score: 765,
            //     media: { url: "/src/assets/img/avatar6.png", type: "image" }
            // },
        ]
        players.sort((a, b) => a.score - b.score)
        setPlayers(players)
    }

    function changeColorsVars() {
        const elRoot = document.querySelector(':root')
        game?.themeColors.forEach((color, i) => {
            elRoot.style.setProperty(`--clr-${i}`, color);
        })
    }

    function getClockForGame() {
        // console.log('game:', game)
        const now = Date.now()
        let diff = game.gameStartTimestamp - now
        return diff

    }

    function moveToNextStage() {
        setCurrStageIdx(prev => prev + 1)
        onResetActivityIdx()
        setCurrStageStepIdx(0)
    }

    function onMoveToNextActivity() {
        setCurrActivityIdx(prev => prev + 1)
        setCurrActivityStepIdx(0)
    }

    function onResetActivityIdx() {
        setCurrActivityIdx(0)
    }

    // click on the gameLine
    function onChangeStageIdx(idx) {
        if (game.activityProgressType !== 'open') return
        setCurrStageIdx(idx)
        setCurrStageStepIdx(0)
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
        console.log('onSetCurrGameStepIdx')
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
        <section className="game-container">
            <div className="game-bgi">
                <img src={logoBig} />
            </div>
            <div className="layer-1">
                <div className="game-header">
                    <span></span>
                    <button className="game-name">{game.name}</button>
                    <button className="points"><img src={points} /></button>
                </div>
                {!isGameScoreOpen && <div>
                    {/* game color theme */}
                    {/* <div className="clr1">First</div>
                    <div className="clr2">Second</div>
                   <div className="clr3">Third</div> */}

                    {/* start game */}
                    {currGameStepIdx === 0 && <div className="game-step-1">
                        <h1>ברוך הבא למשחק</h1>
                        <h2>שם המשחק:{game.name}</h2>

                        <section>
                            {/* {game.gameStartTimestamp && game.gameEndTimestamp && <> */}
                            {game.activityProgressType === 'onTime' && <>
                                {!isGameStart() > 0 && <>
                                    <h4>המשחק יתחיל בתאריך:  {game.dateStart}</h4>
                                    <h4>בשעה: {game.timeStart}</h4>
                                    <h4>בעוד: {getClockForGame() + 'ms'}</h4>
                                    <h4>ויסתיים בתאריך:  {game.dateEnd}</h4>
                                    <h4>בשעה: {game.timeEnd}</h4>
                                </>}
                                {isGameEnd() && <h2>המשחק הסתיים</h2>}
                                {isGameStart() && !isGameEnd() && <h2>המשחק התחיל</h2>}
                            </>}

                            <>
                                {game.activityProgressType === 'onProgress' && <section>
                                    המשחק לפי התקדמות, כל שלב יפתח אחרי שתסיימו את השלב הקודם
                                </section>}
                                {game.activityProgressType === 'open' && <section>
                                    המשחק פתוח ואפשר לעבור בין השלבים והשאלות איך שרוצים
                                </section>}
                                {game.textBefore && <h4>הודעה לפני המשחק: {game.textBefore}</h4>}
                                <button onClick={onSetCurrGameStepIdx}>Continue</button>
                            </>
                        </section>
                        {/* } */}


                    </div>}

                    {/* gameline  */}
                    {/* {currGameStepIdx === 1 && <GameLine stages={game.stages} activities={game.activities} onChangeStageIdx={onChangeStageIdx} onChangeActivityIdx={onChangeActivityIdx} />} */}
                    {/* game stages / activities */}
                    {currGameStepIdx === 1 && <>
                        {game.gameType === 'stages' && <StagePreview stage={game.stages[currStageIdx]} moveToNextStage={moveToNextStage} onResetActivityIdx={onResetActivityIdx} currActivityIdx={currActivityIdx} onMoveToNextActivity={onMoveToNextActivity} currActivityStepIdx={currActivityStepIdx} setCurrActivityStepIdx={setCurrActivityStepIdx} currStageStepIdx={currStageStepIdx} setCurrStageStepIdx={setCurrStageStepIdx} />}
                        {game.gameType === 'activities' && <ActivityPreview activityProgressType={game.activityProgressType} activity={game.activities[currActivityIdx]} moveToNextActivity={onMoveToNextActivity} currActivityStepIdx={currActivityStepIdx} setCurrActivityStepIdx={setCurrActivityStepIdx} />}
                    </>}

                    {/* end game */}
                    {currGameStepIdx === 2 && <>
                        <h2> המשחק הסתיים</h2>
                        {game.textAfter && <h4>{game.textAfter}</h4>}
                    </>}

                </div>}

                {isGameScoreOpen && <>
                    <GameScore players={players} loggedinPlayerId="01" />
                    <button className="score-btn">continue</button>
                </>}

            </div>
        </section>
    )
}