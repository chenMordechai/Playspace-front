import { useState, useEffect } from 'react'
import dimond from '../assets/img/dimond.png'
import goblet from '../assets/img/goblet.png'
import { gameService } from '../services/game.service'



export function GameScore() {

    const SCORE_OF_PLAYERS = 1;
    const SCORE_OF_GROUPS = 0;

    const [gameScores, setGameScores] = useState(null)
    const [scoreOfType, setScoreOfType] = useState(SCORE_OF_PLAYERS)

    useEffect(() => {
        loadGameScores()
    }, [])

    async function loadGameScores() {
        const gameScores = await gameService.GetGameScores();
        setGameScores(gameScores)
    }

    function getSortedPlayers() {
        const top4 = gameScores.top4Players;
        const currPlayer = {
            name: "Me",
            score: gameScores.playerScore,
            image: gameScores?.playerMedia
        }
        

        const allPlayers = [...top4, currPlayer]
        allPlayers.sort((p1, p2) => p1.score - p2.score)
        return allPlayers
    }

    function getSortedGroups() {
        const top4 = gameScores.top4Groups;
        const currPlayerGroup = {
            score: gameScores.playerGroupScore,
            name: `My Group - ${gameScores.playerGroupName}`
        }
        

        const allGroups = [...top4, currPlayerGroup]
        allGroups.sort((g1, g2) => g1.score - g2.score)
        return allGroups
    }

    if (!gameScores) return <p></p>

    return (
        <section className="game-score">
            <img src={goblet} />
            <img src={dimond} />

            <ul>
                <li onClick={() => setScoreOfType(SCORE_OF_PLAYERS)}>Players</li>
                <li onClick={() => setScoreOfType(SCORE_OF_GROUPS)}>Groups</li>
            </ul>

            <div className="players-container">
                {(scoreOfType === SCORE_OF_PLAYERS) && 
                    <ul>
                        {getSortedPlayers().map((player, idx) => 
                            <li >
                                <section className={(player.name === "Me") ? 'you' : ''}>
                                    <span className="img-container">
                                        <span>{idx + 1}</span>
                                        {(player?.image?.url) && <img src={player.image.url} alt="" />}
                                    </span>
                                    <span className="name">{player.name}</span>
                                    <span>{player.score}</span>
                                </section>
            
                            </li>)
                        }
                    </ul>
                }
                {(scoreOfType === SCORE_OF_GROUPS) && 
                    <ul>
                        {getSortedGroups().map((group, idx) => 
                            <li >
                                <section className={(group.name.startsWith("My Group")) ? 'you' : ''}>
                                    <span className="img-container">
                                        <span>{idx + 1}</span>
                                    </span>
                                    <span className="name">{group.name}</span>
                                    <span>{group.score}</span>
                                </section>
                            </li>)
                        }
                    </ul>
                }

            </div>

        </section>
    )
}