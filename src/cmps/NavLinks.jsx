import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux"

import { logout } from "../store/actions/auth.action";
import home from '../assets/img/home.png'
import statistics from '../assets/img/statistics.png'
import settings from '../assets/img/settings.png'



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
            <NavLink to={loggedinUser.isAdmin ? '/admin' : 'user'} title="Home" >
                <img className="home" src={home} />
            </NavLink>
            <NavLink to="/statistics" title="Statistics" >
                <img className="statistics" src={statistics} />
            </NavLink>
            <NavLink to="/settings" title="Statistics" >
                <img className="settings" src={settings} />
            </NavLink>

        </section>

        // OLD
        // <section className="nav-links">
        //     {loggedinUser && <a href="" onClick={onLogout}>Logout</a>}

        //     {!loggedinUser && <NavLink to="/" title="Login" >
        //         <span>Login</span>
        //     </NavLink>}
        //     <NavLink to="/signup/779CF2C1-3529-4DB2-366B-08DC51029963" title="Signup" >
        //         <span>Signup</span>
        //     </NavLink>

        //     {loggedinUser?.checkAdmin && <>
        //         <NavLink to="/game/add" title="Admin" >
        //             Create New Game
        //         </NavLink>
        //         <NavLink to="/admin" title="Admin" >
        //             <span>Admin</span>
        //         </NavLink>
        //     </>}
        // </section>
    )
}