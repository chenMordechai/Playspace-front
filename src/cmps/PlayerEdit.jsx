import { useState, useEffect } from 'react'

export function PlayerEdit({ player, handleChange }) {
    // todo
    const [isEditScore, setIsEditScore] = useState(false)
    const [scoreToEdit, setScoreToEdit] = useState(false)
    return (
        <li key={player.id}>
            <span>{player.name} </span>
            <span>Score:{player.score}</span>
            <button onClick={() => setIsEditScore(prev => !prev)}>Edit Score</button>

            {isEditScore && <input type="txt" value={player.score} onChange={handleChange} />}
        </li>
    )
}