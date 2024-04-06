import { useState, useEffect } from "react"
import { useParams,Link } from "react-router-dom"
import { useSelector } from 'react-redux'

import { authService } from '../services/auth.service'
import { signup } from "../store/actions/auth.action"

export function Signup() {
    const [credentials, setCredentials] = useState(authService.getEmptySignupCred())

    const loggedinPlayer = useSelector(storeState => storeState.authModule.loggedinPlayer)

    const { gameId, groupId } = useParams()
    // let query = useQuery();

    useEffect(() => {
        console.log('gameId, groupId:', gameId, groupId)
        setCredentials(prev => ({ ...prev, gameId, groupId }))

    }, [])
    // function callAPI() {
    //   

    //     httpService.post('auth/Signup', postData)
    // }

    function handleChange(ev) {
        let { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))

    }
    async function onSubmitSignupForm(ev) {
        ev.preventDefault()
        console.log('credentials:', credentials)
        try {
            const player = await signup(credentials)
            console.log('success signup', player)
            // if (!user.isAdmin) navigate('/home')


        } catch (error) {
            console.error('Error:', error);
        }

        // httpService.post('auth/Signup', credentials)
    }


    return (
        <section>
            <h1>Signup</h1>
            <h1>שחקן נכנס למשחק</h1>

            {!loggedinPlayer && <form onSubmit={onSubmitSignupForm}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />

                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={credentials.name} onChange={handleChange} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required />

                <button type="submit">Signup</button>

            </form>}

            {loggedinPlayer && <section>
                <h2>Welcome {loggedinPlayer.name}</h2>
                <Link to={`/game/${credentials.gameId}`}>כניסה למשחק</Link>
            </section>}
        </section>
    )
}