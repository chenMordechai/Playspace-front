import { Link } from 'react-router-dom'
import leave from '../assets/img/leave.png'

export function GameOptionModal() {
    return (
        <section className="game-option-modal">
            <Link to="/user">
                <span>Leave the game</span>
                <img src={leave} />
            </Link>
        </section>
    )
}