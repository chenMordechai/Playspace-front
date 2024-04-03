import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { login } from "../store/actions/auth.action"
import { authService } from '../services/auth.service'

export function Login() {
    const [credentials, setCredentials] = useState(authService.getEmptyCredentials())

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    console.log('loggedinUser:', loggedinUser)

    const navigate = useNavigate()

    useEffect(() => {
        if (loggedinUser) navigate('/home')
    }, [])

    function handleChange(ev) {
        let { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            const user = await login(credentials)
            console.log('success login', user)
            navigate('/home')
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <section className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={credentials.name}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </section>
    )
}