import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate, Link } from "react-router-dom"


import { getGames } from "../store/actions/game.action.js"
import { httpService } from "../services/http.service.js"



export function Home() {

    const [games, setGames] = useState(null)

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    const navigate = useNavigate()


    useEffect(() => {
        // if (!loggedinUser) navigate('/')

        init()
    }, [])

    // get demo data
    async function init() {
        try {
            const games = await getGames(loggedinUser)
            console.log('games:', games)
            setGames(games)
        } catch (err) {
            console.log('err:', err)
        }
    }

    // doesn't work
    async function fetchDataAndPrint() {
        const url = "https://62.171.155.24/api/Admin/Games";

        try {
            var data = await httpService.getGames();
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <section className="home">
            <h1>Home Page</h1>
            <button onClick={fetchDataAndPrint}>GetGames</button>
            <h2>Games:</h2>
            {games && <section className="games-container">
                <ul>
                    {games.map(game => <li key={game.id}>
                        {game.name}
                        <Link to={`/game/edit/${game.id}`} title="Edit" >
                            <span>Edit</span>
                        </Link> |
                        <Link to={`/game/${game.id}`} title="Play" >
                            <span>Play</span>
                        </Link>
                        <button>Details</button>
                        <button>Delete</button>
                    </li>)}
                </ul>
            </section>}
        </section>
    )
}