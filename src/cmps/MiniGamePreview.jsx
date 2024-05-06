import { Link } from "react-router-dom"



export function MiniGamePreview({ gameName, imgUrl, gameId }) {
    return (
        <div className="mini-game-container">
            <img src={imgUrl} />
            <span>{gameName}</span>
            <Link to={`/game/${gameId}`}>Play</Link>
        </div>
    )
}