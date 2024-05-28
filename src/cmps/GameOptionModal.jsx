import { Link } from 'react-router-dom'
import leave from '../assets/img/leave.png'

export function GameOptionModal() {
    return (
        <section className="game-option-modal">
            <span>Leave the game</span>
            <Link to="/user"><img src={leave} /></Link>

        </section>
    )
}