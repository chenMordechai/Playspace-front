
export function GameStep2({ textAfterGame }) {
    return (
        <div className="game-step-2">
            <h2> המשחק הסתיים</h2>
            {textAfterGame && <h4>{textAfterGame}</h4>}
        </div>
    )
}