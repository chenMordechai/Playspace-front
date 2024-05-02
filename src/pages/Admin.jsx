import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate, Link } from "react-router-dom"


import { getGames } from "../store/actions/game.action.js"
import { httpService } from "../services/http.service.js"

import gameImgDefault from '../assets/img/game-default.jpg'


export function Admin() {

    const [games, setGames] = useState(null)

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    const navigate = useNavigate()


    useEffect(() => {
        if (!loggedinUser || !loggedinUser.isAdmin) navigate('/')

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
                        <div className="game-img-container">
                            <div className="img-border-container">
                                <img src={gameImgDefault} />
                            </div>
                        </div>
                        <div className="content-container">
                            <h4> {game.name}</h4>
                        </div>
                        <div className="actions-container">
                            <Link to={`/game/edit/${game.id}`} title="Edit" >
                                <span>E</span>
                            </Link>
                            <Link to={`/game/${game.id}`} title="Play" >
                                <span>P</span>
                            </Link>
                            {/* <button>Details</button> */}
                            <a> <span>D</span></a>

                            <Link to={`/game/group/${game.id}`} title="groups" >
                                <span>G</span>
                            </Link>
                        </div>
                    </li>)}
                </ul>
            </section>}
        </section>
    )
}