import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { getGameById } from "../store/actions/game.action.js"
import { StagePreview } from "../cmps/StagePreview"
import { ActivityPreview } from "../cmps/ActivityPreview"

// game/:gameId

export function Game() {
    const [game, setGame] = useState(null)
    const [stageIdx, setStageIdx] = useState(0)
    const [isGameOn, setIsGameOn] = useState(false)
    const [currStageIdx, setCurrStageIdx] = useState(0) // 0:before ,1:stages/activities , 2:end


    const { gameId } = useParams()

    useEffect(() => {
        console.log('gameId', gameId)
        init()
    }, [])

    useEffect(() => {
        console.log('stageIdx', stageIdx)
        if (stageIdx === game?.stages.length) setCurrStageIdx(prev => prev + 1)
    }, [stageIdx])

    useEffect(() => {
        console.log('currPageIdx', currStageIdx)
    }, [currStageIdx])

    async function init() {
        try {
            const game = await getGameById(gameId)
            console.log('game:', game)

            // const {}
            // const shallowGame = 
            setGame(game)
            changeColorsVars()
        } catch (err) {
            console.log('err:', err)
        }
    }

    function changeColorsVars() {
        const elRoot = document.querySelector(':root')
        // console.log(' game.themeColors:', game.themeColors)
        game.themeColors.forEach((color, i) => {
            elRoot.style.setProperty(`--clr-${i}`, color);
        })
    }

    function getClockForGame() {
        const now = Date.now()
        const diff = game.gameStartTimestamp - now
        console.log('diff:', diff)
        return diff + 'ms'

    }

    function moveToNextStage() {
        setStageIdx(prev => prev + 1)
    }

    if (!game) return ''
    return (
        <section className="game-container rtl">
            {/* game color theme */}
            <div className="clr1">First</div>
            <div className="clr2">Second</div>
            <div className="clr3">Third</div>

            {/* start game */}
            {currStageIdx === 0 && <> <h1>ברוך הבא למשחק</h1>
                <h2>שם המשחק:{game.name}</h2>
                <h4>המשחק יתחיל בתאריך:  {game.dateStart}</h4>
                <h4>בשעה: {game.timeStart}</h4>
                <h4>בעוד: {getClockForGame()}</h4>
                <h4>ויסתיים בתאריך:  {game.dateEnd}</h4>
                <h4>בשעה: {game.timeEnd}</h4>
                <h4>הודעה לפני המשחק: {game.textBefore}</h4>
                <button onClick={() => setCurrStageIdx(prev => prev + 1)}>התחל לשחק</button>
            </>}

            {/* game stages / activities */}
            {currStageIdx === 1 && <>
                {game.gameType === 'stages' && <StagePreview stage={game.stages[stageIdx]} moveToNextStage={moveToNextStage} />}
                {game.gameType === 'activities' && <ActivityPreview />}
            </>}

            {/* end game */}
            {currStageIdx === 2 && <>
                <h2> המשחק הסתיים</h2>
                <h4>{game.textAfter}</h4>
            </>}

        </section>
    )
}