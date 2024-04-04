import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { getGames } from "../store/actions/game.action.js"
import { httpService } from "../services/http.service.js"



export function Home() {

    const [games, setGames] = useState(null)

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    const navigate = useNavigate()


    useEffect(() => {
        if (!loggedinUser) navigate('/')

        init()
    }, [])

    async function init() {
        try {
            const games = await getGames(loggedinUser)
            console.log('games:', games)
            setGames(games)
        } catch (err) {
            console.log('err:', err)
        }
    }



    return (
        <section className="home">
            <h1>Home Page</h1>

            <h2>Games:</h2>
            {games && <section className="games-container">
                <ul>
                    {games.map(game => <li key={game.id}>
                        {game.name}
                        <button>Edit</button>
                        <button>Delete</button>
                        <button>Play</button>
                    </li>)}
                </ul>
            </section>}
        </section>
    )
}