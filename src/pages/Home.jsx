import { useEffect } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { getAdminGames } from "../store/actions/game.action.js"
import { httpService } from "../services/http.service.js"



export function Home() {

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    const navigate = useNavigate()


    useEffect(() => {
        if (!loggedinUser) navigate('/')
        // init()
        // callAPI()
    }, [])

    async function init() {
        try {
            const games = await getAdminGames()
            console.log('games:', games)
        } catch (err) {
            console.log('err:', err)
        }
    }

    function callAPI() {
        const postData = {
            "email": `${Math.random()}@GMAIL.COM`,
            "name": "AAAA",
            "password": "string",
            "gameId": "779CF2C1-3529-4DB2-366B-08DC51029963",
            "groupId": 0
        };

        httpService.post('auth/Signup', postData)
    }

    return (
        <section className="home">
            <h1>Home</h1>
        </section>
    )
}