import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux"

import { logout } from "../store/actions/auth.action";


export function NavLinks() {
    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)

    async function onLogout() {
        try {
            await logout()
            console.log('Success Logout')
            navigate('/')
        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
        <section className="nav-links">
            {loggedinUser && <a href="" onClick={onLogout}>Logout</a>}

            {!loggedinUser && <NavLink to="/" title="Login" >
                <span>Login</span>
            </NavLink>}
            <NavLink to="/signup" title="Signup" >
                <span>Signup</span>
            </NavLink>
            <NavLink to="/home" title="Home" >
                <span>Home</span>
            </NavLink>
            <NavLink to="/admin" title="Admin" >
                <span>Admin</span>
            </NavLink>
        </section>
    )
}