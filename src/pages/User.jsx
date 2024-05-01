import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getGames } from "../store/actions/game.action"
import { useNavigate } from "react-router-dom"

import avatar9 from '../assets/img/avatar9.png'
import plusBlue from '../assets/img/plus-blue.png'
import avatar17 from '../assets/img/avatar17.jpg'

import { MiniGamePreview } from "../cmps/MiniGamePreview"

// after user login
export function User() {

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    console.log('loggedinUser:', loggedinUser)
    const [userGames, setUserGames] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedinUser) navigate('/')

        init()
    }, [])

    async function init() {
        try {
            // work
            const userGames = await getGames(loggedinUser)
            console.log('userGames:', userGames)

            setUserGames(userGames)

        } catch (err) {
            console.log('err:', err)
        }
    }

    if (!loggedinUser) return ''
    return (
        <section className="user-page">
            <section className="user-info-container">
                <div className="user-info">
                    <div className="img-container">
                        <img src={avatar9} />
                    </div>
                    <div className="name-container">
                        {/* <span className="name">{loggedinUser.name}</span> */}
                        <span className="name">Shanna Levy</span>
                        <span className="email">@shanouna95</span>
                    </div>
                </div>
                {/* <button>
                    <img src={plusBlue} />
                    <span>Join a group</span>
                </button> */}

            </section>

            <section className="user-games-container">
                <span>My games</span>

                {/* {userGames?.map(game => */}
                <MiniGamePreview gameName="Brain Blitz" imgUrl={avatar17} />
                <MiniGamePreview gameName="Trivia Quest" imgUrl={avatar17} />
                <MiniGamePreview gameName="Quiz Dash" imgUrl={avatar17} />
                <MiniGamePreview gameName="Brain Blitz" imgUrl={avatar17} />
                <MiniGamePreview gameName="Trivia Quest" imgUrl={avatar17} />
                <MiniGamePreview gameName="Quiz Dash" imgUrl={avatar17} />
                {/* )} */}
            </section>
        </section>
    )




}