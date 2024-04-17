import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate, Link } from "react-router-dom"


import { getGames } from "../store/actions/game.action.js"
import { httpService } from "../services/http.service.js"



export function Admin() {

    const [games, setGames] = useState(null)

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    const navigate = useNavigate()


    useEffect(() => {
        // if (!loggedinUser.admin) navigate('/')

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

    return (
        <section className="admin">
            <h1>Admin Page</h1>
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
                        <Link to={`/game/group/${game.id}`} title="groups" >
                            <span>Groups</span>
                        </Link>
                    </li>)}
                </ul>
            </section>}
        </section>
    )
}