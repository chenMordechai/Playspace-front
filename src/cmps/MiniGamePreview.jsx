import { Link } from "react-router-dom"



export function MiniGamePreview({ gameName, imgUrl, onMoveToGame }) {
    return (
        <div className="mini-game-container">
            <img src={imgUrl} />
            <span>{gameName}</span>
            <button onClick={onMoveToGame} >שחק</button>
        </div>
    )
}