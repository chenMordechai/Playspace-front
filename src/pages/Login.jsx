import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { login, adminLogin } from "../store/actions/auth.action"
import { authService } from '../services/auth.service'
import { LoginSignup } from '../cmps/LoginSignup'
import { AdminLogin } from '../cmps/AdminLogin'

import Axios from 'axios'

export function Login() {

    // const fetchData = async () => {
    //     const response = await Axios.get('https://localhost:5173/api/Test/GetHelloWorld');
    //     console.log(response.data);
    // };
    // fetchData()
    const [credentials, setCredentials] = useState(authService.getEmptyCredentials())

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)

    const navigate = useNavigate()

    useEffect(() => {
        if (loggedinUser) {
            if (!loggedinUser.isAdmin) navigate('/user')
            else navigate('/admin')
        }
    }, [])

    function handleChange(ev) {
        let { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    // user login
    async function handleSubmitLoginForm(ev) {
        ev.preventDefault();
        try {
            const user = await login({ name: credentials.name, email: credentials.email })
            console.log('success login', user)
            if (!user.isAdmin) navigate('/user')

        } catch (error) {
            console.error('Error:', error);
        }
    }

    // admin login
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
        {loggedinUser?.isAdmin &&
            <AdminLogin loggedinUser={loggedinUser} handleSubmitAdminForm={handleSubmitAdminForm} credentials={credentials} handleChange={handleChange} />}

    </section>

    )
}