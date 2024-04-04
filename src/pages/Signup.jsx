import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { authService } from '../services/auth.service'
import { signup } from "../store/actions/auth.action"

export function Signup() {
    const [credentials, setCredentials] = useState(authService.getEmptySignupCred())

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
  async  function onSubmitSignupForm(ev) {
            ev.preventDefault()
            try {
                const user = await signup(credentials)
                console.log('success signup', user)
                // if (!user.isAdmin) navigate('/home')
            } catch (error) {
                console.error('Error:', error);
            }

        // httpService.post('auth/Signup', credentials)
    }


    return (
        <section>
            <h1>Signup</h1>

            <form onSubmit={onSubmitSignupForm}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />

                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={credentials.name} onChange={handleChange} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required />

                <button type="submit">Signup</button>

            </form>
        </section>
    )
}