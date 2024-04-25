import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { login, adminLogin } from "../store/actions/auth.action"
import { authService } from '../services/auth.service'
import { LoginSignup } from '../cmps/LoginSignup'

export function Login() {
    const [credentials, setCredentials] = useState(authService.getEmptyCredentials())

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    console.log('loggedinUser:', loggedinUser)

    const navigate = useNavigate()

    useEffect(() => {
        if (loggedinUser) {
            if (!loggedinUser.isAdmin) navigate('/home')
        }
    }, [])

    function handleChange(ev) {
        let { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    async function handleSubmitLoginForm(ev) {
        ev.preventDefault();
        try {
            const user = await login(credentials)
            console.log('success login', user)
            if (!user.isAdmin) navigate('/home')
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function handleSubmitAdminForm(ev) {
        ev.preventDefault();
        try {
            const userAdmin = await adminLogin(credentials)
            console.log('success AdminLogin', userAdmin)
            navigate('/admin')
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (<section className="login">

        {!loggedinUser &&
            <LoginSignup credentials={credentials} handleChange={handleChange} onBtnClick={handleSubmitLoginForm} btnType="submit" text="Log in" />
        }
        {loggedinUser?.isAdmin && <section>
            <h2>Hello {loggedinUser.name}</h2>

            <form onSubmit={handleSubmitAdminForm}>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required />

                <button type="submit">Login</button>
            </form>
        </section>}
    </section>

    )
}