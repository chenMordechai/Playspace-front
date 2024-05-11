import { useState, useEffect } from "react"

import { FilterByName } from "./FilterByName"
import { ScoreEdit } from "./ScoreEdit"

export function AdminPlayers() {
    const [players, setPlayers] = useState(null)
    const [filterBy, setFilterBy] = useState({ name: '' })

    useEffect(() => {

        //! Avishai get players by filter
        getPlayers(filterBy)

    }, [filterBy])

    function getPlayers() {

        const players = [
            {
                id: "GR1rkr",
                name: "שחקן א",
                gameId: "779CF2C1-3529-4DB2-366B-08DC51029963",
                groupId: "iw5k9",
                score: 100
            },
            {
                id: "GR1rke",
                name: "שחקן ב",
                gameId: "779CF2C1-3529-4DB2-366B-08DC51029963",
                groupId: "iw5k9",
                score: 100
            },
            {
                id: "GR1rky",
                name: "שחקן ג",
                gameId: "779CF2C1-3529-4DB2-366B-08DC51029963",
                groupId: "iw5k9",
                score: 100
            },
            {
                id: "GR1rkw",
                name: "שחקן ד",
                gameId: "779CF2C1-3529-4DB2-366B-08DC51029963",
                groupId: "iw5k8",
                score: 100
            },
            {
                id: "GR1rka",
                name: "שחקן ה",
                gameId: "779CF2C1-3529-4DB2-366B-08DC51029963",
                groupId: "iw5k8",
                score: 100
            },
            {
                id: "GR1rkv",
                name: "שחקן ו",
                gameId: "779CF2C1-3529-4DB2-366B-08DC51029963",
                groupId: "iw5k8",
                score: 100
            }]

        setPlayers(players)
    }

    function onFilterPlayers(ev) {
        console.log('onFilterGroups')
        ev.preventDefault()
        // getPlayers(filterBy)
    }

    function handlaChange(ev) {
        const { value, name } = ev.target
        setFilterBy({ [name]: value })
    }

    function onUpdateScore(playerId, diff) {
        console.log('onUpdateScore')
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