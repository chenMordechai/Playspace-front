import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { getGameById } from "../store/actions/game.action.js"

export function Game() {
    const [game, setGame] = useState(null)

    const { gameId } = useParams()

    useEffect(() => {
        console.log('gameId', gameId)
        init()
    }, [])

    async function init() {
        try {
            const game = await getGameById(gameId)
            console.log('game:', game)
            setGame(game)
        } catch (err) {
            console.log('err:', err)
        }
    }

function getClockForGame(){
    
}


    return (
        <section className="rtl">
            <h1>ברוך הבא למשחק</h1>

            <h2>שם המשחק:{game.name}</h2>

            <span>המשחק יתחיל בעוד:</span>

            <span>{getClockForGame()}</span>

        </section>
    )
}