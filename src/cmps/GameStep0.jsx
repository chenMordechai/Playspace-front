import dimond from '../assets/img/dimond.png'
import goblet from '../assets/img/goblet.png'
import arrow from '../assets/img/arrow-down.png'
import play from '../assets/img/play.png'
import { useState } from 'react'

export function GameStep0({ game, getClockForGame, isGameEnd, isGameStart, stats, onSetCurrGameStepIdx }) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    return (
        <section className="game-step-0">
            <section className="game-info">
                <h4>ברוך הבא למשחק</h4>
                <h4>{game.name}</h4>
                {/* {game.gameStartTimestamp && game.gameEndTimestamp && <> */}
                {game.activityProgressType === 'onTime' && <>
                    {!isGameStart() > 0 && <>
                        <span>המשחק יתחיל בתאריך:  {game.dateStart}</span>
                        <span>בשעה: {game.timeStart}</span>
                        <span>בעוד: {getClockForGame() + 'ms'}</span>
                        <span>ויסתיים בתאריך:  {game.dateEnd}</span>
                        <span>בשעה: {game.timeEnd}</span>
                    </>}
                    {isGameEnd() && <span>המשחק הסתיים</span>}
                    {isGameStart() && !isGameEnd() && <span>המשחק התחיל</span>}
                </>}

                <>
                    {game.activityProgressType === 'onProgress' && <p>
                        המשחק לפי התקדמות, כל שלב יפתח אחרי שתסיימו את השלב הקודם
                    </p>}
                    {game.activityProgressType === 'open' && <p>
                        המשחק פתוח ואפשר לעבור בין השלבים והשאלות איך שרוצים
                    </p>}
                    {game.textBefore && <h4>{game.textBefore}</h4>}
                </>
            </section>

            <section className="game-stat">
                <h5>סטטיסטיקות</h5>

                <div className="stat-info-container">
                    <div>
                        <div className="txt points">
                            <img src={dimond} />
                            <span>נקודות</span>
                        </div>
                        <span>{stats.score}</span>
                    </div>

                    <div >
                        <div className="txt place">
                            <img src={goblet} />
                            <span>מקום</span>
                        </div>
                        <span>{stats.position.position}/{stats.position.totalPlayers}</span>
                    </div>
                </div>


                <button className="details"
                    onClick={() => setIsDetailsOpen(prev => !prev)}>עוד פרטים
                    <img src={arrow} />
                </button>


                {!isDetailsOpen && <section className='placeholder'></section>}
                {isDetailsOpen && <section className="more-details-container">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit velit architecto, incidunt deserunt perferendis laboriosam eum nulla corporis reprehenderit sunt impedit ad illo obcaecati animi inventore, porro nesciunt saepe laborum!
                </section>}
            </section>

            <section className="game-play">
                <div className="btn-container">
                    <button>
                        <img onClick={onSetCurrGameStepIdx} src={play} />
                    </button>
                    {/* <button onClick={onSetCurrGameStepIdx}>Play</button> */}
                </div>
            </section>
            {/* } */}


        </section>
    )
}