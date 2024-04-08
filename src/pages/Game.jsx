import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { getGameById } from "../store/actions/game.action.js"
import {StagePreview} from "../cmps/StagePreview"
import {ActivityPreview} from "../cmps/ActivityPreview"

export function Game() {
    const [game, setGame] = useState(null)
    const [stageIdx, setStageIdx] = useState(0)
    const [isGameOn, setIsGameOn] = useState(false)
    const [isGameEnd, setIsGameEnd] = useState(false)
    const [currPageIdx, setCurrPageIdx] = useState(0)
    
    const { gameId } = useParams()

    useEffect(() => {
        console.log('gameId', gameId)
        init()
    }, [])

    useEffect(() => {
        console.log('stageIdx', stageIdx)
        if(stageIdx === game?.stages.length) setIsGameEnd(true)
    }, [stageIdx])

    useEffect(() => {
        console.log('currPageIdx', currPageIdx)
    }, [currPageIdx])

    async function init() {
        try {
            const game = await getGameById(gameId)
            console.log('game:', game)

            // const {}
            // const shallowGame = 
            setGame(game)
        } catch (err) {
            console.log('err:', err)
        }
    }

function getClockForGame(){
    const now = Date.now()
    const diff = game.gameStartTime - now
    console.log('diff:', diff)
    return diff + 'ms'

}

function moveToNextStage(){
    setStageIdx(prev=>prev+1)
}

if(!game) return ''
    return (
        <section className="game-container rtl">
           {currPageIdx === 0 && <> <h1>ברוך הבא למשחק</h1>
            <h2>שם המשחק:{game.name}</h2>
           <span>המשחק יתחיל בעוד:</span>
            <span>{getClockForGame()}</span>
            <button onClick={()=>setCurrPageIdx(prev=>prev+1)}>התחל לשחק</button>
</>}
          {currPageIdx === 1 && <>  {game.gameType ==='stages' && <StagePreview stage={game.stages[stageIdx]} moveToNextStage={moveToNextStage}/> }
            { game.gameType ==='activities' && <ActivityPreview/> }
      </> }
          {isGameEnd && <h2> המשחק הסתיים</h2>}

        </section>
    )
}