
export function ActivityType({ activity, checkMultipleAnswer, textAreaValue, handlaChange, checkOpenAnswer, checkYesNoAnswer, inputTypingValue, checkTypingAnswer }) {
    return (
        <section className="activity-type">
            {activity.activityType === 'multiple' &&
                <div className="multiple-answer">
                    {activity.activityAnswers.map((a, i) =>
                        <button key={a}
                            onClick={() => checkMultipleAnswer(i)}>
                            {a}
                        </button>)}
                </div>}

            {activity.activityType === 'open' &&
                <div className="open-answer">
                    <textarea name="open" value={textAreaValue} onChange={handlaChange} />

                    <button onClick={checkOpenAnswer}> שלח תשובה </button>
                </div>}

            {activity.activityType === 'yesno' &&
                <div className="yesno-answer">

                    <button onClick={() => checkYesNoAnswer('yes')}> כן</button>
                    <button onClick={() => checkYesNoAnswer('no')}> לא</button>
                </div>}

            {activity.activityType === 'typing' &&
                <div className="typing-answer">
                    <input type="text" name="typing" value={inputTypingValue} onChange={handlaChange} />
                    <button onClick={checkTypingAnswer}> שלח תשובה</button>
                </div>}
        </section>
    )
}