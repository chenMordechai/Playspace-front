import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { FilterByName } from "./FilterByName"
import { ScoreEdit } from "./ScoreEdit"
import { getPlayers } from "../store/actions/game.action"
import { gameService } from "../services/game.service"
import { utilService } from "../services/util.service"

export function AdminPlayers() {
    const [players, setPlayers] = useState(null)
    const [filterBy, setFilterBy] = useState({ name: '' })
    const { gameId } = useParams();

    const loadPlayers = useCallback(async () => {
        try {
            const groups = await gameService.getGamePlayers(gameId, filterBy)
            setPlayers(groups)
        }
        catch (err) {
            console.log('err:', err)
        }
    }, [gameId, filterBy])

    const loadPlayersDebounced = useCallback(utilService.debounce(loadPlayers, 300), [loadPlayers])

    useEffect(() => {
        loadPlayersDebounced()
    }, [filterBy, loadPlayersDebounced])

    function onFilterPlayers(ev) {
        ev.preventDefault()
        loadPlayersDebounced()
    }

    function handleChange(ev) {
        const { value, name } = ev.target
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    async function onUpdateScore(playerId, newScore) {
        const player = players.find(player => player.id === playerId)
        const isUpdated = await gameService.updatePlayerScore(playerId, gameId, newScore)
        player.score = (isUpdated) ? newScore : player.score
        setPlayers(players => players.map(p => p.id === playerId ? player : p))
    }

    if (!players) return (<p>There are no players to show.</p>)

    return (
        <section className="admin-players">
            <h1>Players</h1>

            <FilterByName onSubmitFilter={onFilterPlayers} filterBy={filterBy} handleChange={handleChange} />

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