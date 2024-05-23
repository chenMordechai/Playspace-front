import { useState, useEffect } from 'react'
import { useParams, NavLink, Outlet } from "react-router-dom"

export function AdminPlayersScores() {

    const { gameId } = useParams()


    return (
        <section className="admin-scores">
            <nav>
                <NavLink to={`/game/${gameId}/scores/edit/groups`} >
                    <span>Groups</span>
                </NavLink>
                <span> | </span>
                <NavLink to={`/game/${gameId}/scores/edit/players`}>
                    <span>Players</span>
                </NavLink>
            </nav>
            <Outlet />

        </section>
    )
}