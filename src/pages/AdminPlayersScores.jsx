import { useState, useEffect } from 'react'
import { useParams, NavLink, Outlet } from "react-router-dom"

export function AdminPlayersScores() {

    return (
        <section className="admin-scores">
            <nav>
                <NavLink to={`/game/scores/edit/groups`} >
                    <span>Groups</span>
                </NavLink>
                <span> | </span>
                <NavLink to={`/game/scores/edit/players`}>
                    <span>Players</span>
                </NavLink>
            </nav>
            <Outlet />

        </section>
    )
}