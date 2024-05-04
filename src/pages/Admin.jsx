import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate, Link, NavLink } from "react-router-dom"


import { getGames, deleteGame } from "../store/actions/game.action.js"
import { httpService } from "../services/http.service.js"

import gameImgDefault from '../assets/img/game-default.jpg'
import { GameFilter } from "../cmps/GameFilter.jsx"
import { gameService } from "../services/game.service.js"

export function Admin() {

    const [games, setGames] = useState(null)
    const [filterBy, setFilterBy] = useState(gameService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(gameService.getDefaultSort())


    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    const navigate = useNavigate()


    useEffect(() => {
        if (!loggedinUser || !loggedinUser.isAdmin) navigate('/')
        // init()
    }, [])

    useEffect(() => {
        console.log('filterBy, sortBy:', filterBy, sortBy)
        init()
    }, [filterBy, sortBy])

    // get demo data
    async function init() {
        try {
            const games = await getGames(loggedinUser, filterBy, sortBy)
            console.log('games:', games)
            setGames(games)
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function onDeleteGame(gameId) {
        console.log('gameId:', gameId)
        if (!confirm('אתה בטוח שאתה רוצה למחוק את המשחק ?')) return
        try {
            await deleteGame(gameId)
            console.log('deleted game')
            setGames(prev => prev.filter(g => g.id !== gameId))
        } catch (err) {
            console.log('err:', err)
        }
    }

    function onSetFilterBy(ev) {
        let { name, value } = ev.target
        setFilterBy(prev => ({ ...prev, [name]: value }))
    }

    function onSetSortBy(ev) {
        let { name, value, type, checked } = ev.target
        if (type === 'checkbox') value = (checked) ? -1 : 1
        setSortBy(prev => ({ ...prev, [name]: value }))
    }

    return (
        <section className="admin">
            <h1>Hello {loggedinUser.name}</h1>
            <Link to="/game/add" title="Admin" >
                Create New Game
            </Link>

            <h2>Games:</h2>
            <GameFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} sortBy={sortBy} onSetSortBy={onSetSortBy} />

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
                            <a onClick={() => onDeleteGame(game.id)} title="Delete"> <span>D</span></a>

                            <Link to={`/game/group/${game.id}`} title="groups" >
                                <span>G</span>
                            </Link>
                        </div>
                    </li>).reverse()}
                </ul>
            </section>}
        </section>
    )
}