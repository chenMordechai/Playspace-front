import dimond from '../assets/img/dimond.png'
import goblet from '../assets/img/goblet.png'



export function GameScore({ players, loggedinPlayerId }) {
    return (
        <section className="game-score">
            <img src={goblet} />
            <img src={dimond} />

            <div className="players-container">
                <ul>{players.map((player, idx) => <li >
                    <section className={(loggedinPlayerId === player.id) ? 'you' : ''}>
                        <span className="img-container">
                            <span>{idx + 1}</span>
                            <img src={player.media.url} alt="" />
                        </span>
                        <span className="name">{player.name}</span>
                        <span>{player.score}</span>
                    </section>

                </li>)}</ul>
            </div>

        </section>
    )
}