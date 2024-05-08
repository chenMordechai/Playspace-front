import { Link } from "react-router-dom"


export function AdminGamePreview({ img, name, id, onDeleteGame }) {
    return (
        <li >
            <div className="game-img-container">
                <div className="img-border-container">
                    <img src={img} />
                </div>
            </div>
            <div className="content-container">
                <h4> {name}</h4>
            </div>
            <div className="actions-container">
                <Link to={`/game/edit/${id}`} title="Edit" >
                    <span>E</span>
                </Link>
                <Link to={`/game/${id}`} title="Play" >
                    <span>P</span>
                </Link>
                {/* <button>Details</button> */}
                <a onClick={() => onDeleteGame(id)} title="Delete"> <span>D</span></a>

                <Link to={`/game/group/${id}`} title="groups" >
                    <span>G</span>
                </Link>
            </div>
        </li>
    )
}