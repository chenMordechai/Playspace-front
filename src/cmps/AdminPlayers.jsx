import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { FilterByName } from "./FilterByName"
import { ScoreEdit } from "./ScoreEdit"
import { getPlayers } from "../store/actions/game.action"

export function AdminPlayers() {
    const [players, setPlayers] = useState(null)
    const [filterBy, setFilterBy] = useState({ name: '' })

    const { gameId } = useParams()

    useEffect(() => {

        //! Avishai get players by filter
        loadPlayers(filterBy)

    }, [filterBy])

    function loadPlayers() {
        const players = getPlayers(gameId, filterBy)

        // const players = [
        //     {
        //         id: "GR1rkr",
        //         name: "שחקן א",
        //         groupId: "iw5k9",
        //         score: 100
        //     },
        //     {
        //         id: "GR1rke",
        //         name: "שחקן ב",
        //         groupId: "iw5k9",
        //         score: 100
        //     },
        //     {
        //         id: "GR1rky",
        //         name: "שחקן ג",
        //         groupId: "iw5k9",
        //         score: 100
        //     },
        //     {
        //         id: "GR1rkw",
        //         name: "שחקן ד",
        //         groupId: "iw5k8",
        //         score: 100
        //     },
        //     {
        //         id: "GR1rka",
        //         name: "שחקן ה",
        //         groupId: "iw5k8",
        //         score: 100
        //     },
        //     {
        //         id: "GR1rkv",
        //         name: "שחקן ו",
        //         groupId: "iw5k8",
        //         score: 100
        //     }]

        // setPlayers(players)
    }

    function onFilterPlayers(ev) {
        ev.preventDefault()
        // getPlayers(filterBy)
    }

    function handlaChange(ev) {
        const { value, name } = ev.target
        setFilterBy({ [name]: value })
    }

    function onUpdateScore(playerId, diff) {
        //! Avishay update player score
    }

    if (!players) return

    return (
        <section className="admin-players">
            <h1>Players</h1>

            <FilterByName onSubmitFilter={onFilterPlayers} filterBy={filterBy} handlaChange={handlaChange} />

            <ul className="players-container">
                {players.map((player, i) => <li key={i}>
                    {player.name}
                    <div>
                        <span>{player.score}</span>
                    </div>

                    <ScoreEdit id={player.id} onUpdateScore={onUpdateScore} />
                </li>)}
            </ul>
        </section>
    )
}