
export function GameStep0({ game, getClockForGame, isGameEnd, isGameStart, onSetCurrGameStepIdx }) {
    return (
        <div className="game-step-0">
            <h1>ברוך הבא למשחק</h1>
            <h2>שם המשחק:{game.name}</h2>

            <section>
                {/* {game.gameStartTimestamp && game.gameEndTimestamp && <> */}
                {game.activityProgressType === 'onTime' && <>
                    {!isGameStart() > 0 && <>
                        <h4>המשחק יתחיל בתאריך:  {game.dateStart}</h4>
                        <h4>בשעה: {game.timeStart}</h4>
                        <h4>בעוד: {getClockForGame() + 'ms'}</h4>
                        <h4>ויסתיים בתאריך:  {game.dateEnd}</h4>
                        <h4>בשעה: {game.timeEnd}</h4>
                    </>}
                    {isGameEnd() && <h2>המשחק הסתיים</h2>}
                    {isGameStart() && !isGameEnd() && <h2>המשחק התחיל</h2>}
                </>}

                <>
                    {game.activityProgressType === 'onProgress' && <section>
                        המשחק לפי התקדמות, כל שלב יפתח אחרי שתסיימו את השלב הקודם
                    </section>}
                    {game.activityProgressType === 'open' && <section>
                        המשחק פתוח ואפשר לעבור בין השלבים והשאלות איך שרוצים
                    </section>}
                    {game.textBefore && <h4>הודעה לפני המשחק: {game.textBefore}</h4>}
                    <button onClick={onSetCurrGameStepIdx}>Continue</button>
                </>
            </section>
            {/* } */}


        </div>
    )
}