import { useState } from "react"

export function ScoreEdit({ id, onUpdateScore }) {
    const [diff, setDiff] = useState(0)

    function onSubmitForm(ev) {
        ev.preventDefault()
        onUpdateScore(id, diff)
    }
    return (
        <form onSubmit={onSubmitForm} className="input-container">
            <input type="number" value={diff} onChange={(ev) => setDiff(ev.target.value)} />
            <button >update</button>
        </form>
    )
}