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
            const game = await getGameById(game)
            console.log('game:', game)
            setGame(game)
        } catch (err) {
            console.log('err:', err)
        }
    }
    return (
        <section>
            <h1>Game Page</h1>
        </section>
    )
}