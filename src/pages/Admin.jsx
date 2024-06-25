import { useEffect, useState, useRef } from "react"
import { useSelector } from 'react-redux'
import { useNavigate, Link, NavLink } from "react-router-dom"

import { getGames, deleteGame } from "../store/actions/game.action.js"
import { httpService } from "../services/http.service.js"
import gameImgDefault from '../assets/img/game-default.jpg'
import { GameFilter } from "../cmps/GameFilter.jsx"
import { gameService } from "../services/game.service.js"
import { AdminGamePreview } from '../cmps/AdminGamePreview.jsx'
import { getUser } from "../store/actions/auth.action.js"

export function Admin() {

    const [games, setGames] = useState(null)
    const [filterBy, setFilterBy] = useState(gameService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(gameService.getDefaultSort())

    // pagination
    const [currPage, setCurrPage] = useState(0) // storing current page number
    // const [prevPage, setPrevPage] = useState(0); // storing prev page number
    const [wasLastList, setWasLastList] = useState(false) // setting a flag to know the last list

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    const navigate = useNavigate()

    const listInnerRef = useRef()

    useEffect(() => {
        getUserFromBack()
    }, [])

    // useEffect(() => {
    //     if (!loggedinUser || !loggedinUser.isAdmin) {
    //         navigate('/')
    //         return
    //     }
    //     init()
    // }, [])

    // useEffect(() => {
    //     init()
    // }, [filterBy, sortBy])

    // useEffect(() => {
    //     init()
    // }, [currPage, wasLastList])


    async function getUserFromBack() {
        try {
            const user = await getUser()
            console.log('user:', user)
            if (!user || !user) navigate('/')
            else init()

        } catch (error) {
            // console.error('Error:', error);
            navigate('/')
        }
    }

    // get demo data
    async function init() {
        try {
            const games = await getGames(true, filterBy, sortBy, currPage)
            if (!games.length) return;
            setGames(games)
            // setGames(prev => [...prev, ...games]);
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function onDeleteGame(gameId) {
        if (!confirm('אתה בטוח שאתה רוצה למחוק את המשחק ?')) return
        try {
            await deleteGame(gameId)
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

    function onScroll() {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (Math.floor(scrollTop + clientHeight) === scrollHeight || Math.ceil(scrollTop + clientHeight) === scrollHeight) {
                // This will be triggered after hitting the last element.
                // API call should be made here while implementing pagination.
                setCurrPage(prev => prev + 1)
            }
        }
    }


    return (
        <section className="admin rtl" >
            <h1>שלום {loggedinUser?.name}</h1>
            <Link to="/game/add" title="Admin" >
                יצירת משחק חדש
            </Link>

            <h2>משחקים</h2>
            <GameFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} sortBy={sortBy} onSetSortBy={onSetSortBy} />

            {games && <section className="games-container">
                <ul
                    // onScroll={onScroll}
                    ref={listInnerRef}>
                    {games.map((game, i) =>
                        <AdminGamePreview key={i} img={gameImgDefault} name={game.name} id={game.id} onDeleteGame={onDeleteGame} />)}
                </ul>
            </section>}
        </section>
    )
}
