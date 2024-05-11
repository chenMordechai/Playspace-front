import { useState, useEffect } from 'react'
import { useParams, NavLink, Outlet } from "react-router-dom"

export function AdminPlayersScores() {

    return (
        <section className="admin-players-scores rtl">
            <nav>
                <NavLink to={`/game/scores/groups`} >
                    <span>Groups</span>
                </NavLink>
                <span> | </span>
                <NavLink to={`/game/scores/players`}>
                    <span>Players</span>
                </NavLink>
            </nav>
            <Outlet />

        </section>
    )
}