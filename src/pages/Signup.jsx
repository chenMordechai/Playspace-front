import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from 'react-redux'

import { authService } from '../services/auth.service'
import { signup, registerPlayerToGroup } from "../store/actions/auth.action"

export function Signup() {
    const [credentials, setCredentials] = useState(authService.getEmptySignupCred())

    const loggedinPlayer = useSelector(storeState => storeState.authModule.loggedinPlayer)
    console.log('loggedinPlayer:', loggedinPlayer)
    const [groups, setGroups] = useState(null)
    // const { gameId, groupId } = useParams()
    const { gameId } = useParams()
    // let query = useQuery();

    useEffect(() => {
        console.log('gameId:', gameId)
        setCredentials(prev => ({ ...prev, gameId }))
        // setCredentials(prev => ({ ...prev, gameId, groupId }))

        // Avishai get groups by game id
        getGameGroups()

    }, [])

    function handleChange(ev) {
        let { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    async function onSubmitSignupForm(ev) {
        ev.preventDefault()
        try {
            // Avishai signup
            const player = await signup(credentials)

            console.log('success signup', player)
            // if (!user.isAdmin) navigate('/home')
        } catch (error) {
            console.error('Error:', error);
        }

        // httpService.post('auth/Signup', credentials)
    }

    function getGameGroups() {
        const groups = [
            {
                id: "iw5k9",
                name: "קבוצה א",
                adminAdditionalScore: 0,
            },
            {
                id: "iw5k8",
                name: "קבוצה ב",
                adminAdditionalScore: 0,
            },
        ]

        setGroups(groups)
    }

    function onSetPlayerGroup(groupId) {
        console.log('groupId:', groupId)
        if (loggedinPlayer.groupId) return
        // Avishai register a player for the group
        registerPlayerToGroup(loggedinPlayer.id, groupId)


    }


    return (
        <section className="signup">
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

            {loggedinPlayer && groups && <section>
                <h2>Welcome {loggedinPlayer.name}</h2>

                <h3>בחירת קבוצה</h3>

                <ul className="groups-container">
                    {groups.map(group => <li key={group.id}
                        style={{ backgroundColor: (loggedinPlayer.groupId === group.id) ? 'red' : '' }}
                        onClick={() => onSetPlayerGroup(group.id)}>
                        {group.name}
                    </li>)}
                </ul>

                {loggedinPlayer.groupId &&
                    <Link to={`/game/${credentials.gameId}`}>כניסה למשחק</Link>}
            </section>}
        </section>
    )
}