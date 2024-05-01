

export function MiniGamePreview({ gameName, imgUrl }) {
    return (
        <div className="mini-game-container">
            <img src={imgUrl} />
            <span>{gameName}</span>
            <button>Play</button>
        </div>
    )
}