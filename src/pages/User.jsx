import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getGames } from "../store/actions/game.action"
import { useNavigate } from "react-router-dom"

import avatar9 from '../assets/img/avatar9.png'
import plusBlue from '../assets/img/plus-blue.png'
import avatar17 from '../assets/img/avatar17.jpg'
import { getPlayer, getUser } from "../store/actions/auth.action"

import { MiniGamePreview } from "../cmps/MiniGamePreview"

// after user login
export function User() {

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    const [userGames, setUserGames] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        getUserFromBack()
    }, [])

    async function getUserFromBack() {
        try {
            const user = await getUser()
            console.log('user:', user)
            if (!user) navigate('/')
            else init()

        } catch (error) {
            // console.error('Error:', error);
            navigate('/')
        }
    }

    async function init() {
        try {
            // work
            const userGames = await getGames(false)
            console.log('userGames:', userGames)
            setUserGames(userGames)

        } catch (err) {
            console.log('err:', err)

        }
    }

    async function moveToGame(gameId) {
        const player = await getPlayer(gameId) // player
        if (player) navigate(`/game/${gameId}`)
    }

    if (!loggedinUser) return ''
    return (
        <section className="user-page rtl">
            <section className="user-info-container">
                <div className="user-info">
                    <div className="img-container">
                        <img src={avatar9} />
                    </div>
                    <div className="name-container">
                        <span className="name">{loggedinUser.name}</span>
                        {/* <span className="name">Shanna Levy</span> */}
                        {/* <span className="email">@shanouna95</span> */}
                        <span className="email">{`${loggedinUser.email}`}</span>
                    </div>
                </div>
                {/* <button>
                    <img src={plusBlue} />
                    <span>Join a group</span>
                </button> */}

            </section>

            <section className="user-games-container">
                <span>המשחקים שלי</span>

                {userGames?.map(game =>
                    <MiniGamePreview gameName={game.name} imgUrl={game.icon.url} gameId={game.id} onMoveToGame={() => moveToGame(game.id)} />
                )}

                {/* <MiniGamePreview gameName="Brain Blitz" imgUrl={avatar17} onMoveToGame={() => moveToGame("d752efce-17e0-4d2a-8627-08dc644c8fa4")} />
                <MiniGamePreview gameName="Trivia Quest" imgUrl={avatar17} onMoveToGame={() => moveToGame("d752efce-17e0-4d2a-8627-08dc644c8fa4")} />
                <MiniGamePreview gameName="Quiz Dash" imgUrl={avatar17} onMoveToGame={() => moveToGame("d752efce-17e0-4d2a-8627-08dc644c8fa4")} />
                <MiniGamePreview gameName="Brain Blitz" imgUrl={avatar17} onMoveToGame={() => moveToGame("d752efce-17e0-4d2a-8627-08dc644c8fa4")} />
                <MiniGamePreview gameName="Trivia Quest" imgUrl={avatar17} onMoveToGame={() => moveToGame("d752efce-17e0-4d2a-8627-08dc644c8fa4")} />
                <MiniGamePreview gameName="Quiz Dash" imgUrl={avatar17} onMoveToGame={() => moveToGame("d752efce-17e0-4d2a-8627-08dc644c8fa4")} /> */}
            </section>
        </section>
    )




}