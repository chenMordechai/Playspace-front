import { useState, useEffect } from "react"


export function AdminPlayers() {
    const [players, setPlayers] = useState(null)

    useEffect(() => {

        //! Avishai get players
        getPlayers()
    }, [])

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

    if (!players) return

    return (
        <section className="admin-players">
            <h1>Players</h1>

            <ul className="players-container">
                {players.map((player, i) => <li key={i}>
                    {player.name}
                    <br />
                    <button>+</button>
                    <span>{player.score}</span>
                    <button>-</button>
                </li>)}
            </ul>
        </section>
    )
}