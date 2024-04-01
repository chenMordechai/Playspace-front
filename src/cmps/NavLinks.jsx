import { NavLink, Link } from "react-router-dom";

export function NavLinks() {
    return (
        <section className="nav-links">
            <NavLink to="/" title="Login" >
                <span>Login</span>
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