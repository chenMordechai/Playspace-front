import pen from '../assets/img/pen.png'


export function ActivityType({ activity, checkAnswer, textAreaValue, handlaChange, inputTypingValue }) {
    return (
        <section className="activity-type">
            {activity.activityType === "multiple" &&
                <div className="multiple-answer">
                    {activity.activityAnswers.map((a, i) =>
                        <button key={a}
                            onClick={() => checkAnswer(i)}>
                            {a}
                        </button>)}
                </div>}

            {activity.activityType === 'open' && <>

                <div className="open-answer">
                    <img className="pen" src={pen} />
                    <input name="open" value={textAreaValue} onChange={handlaChange} />
                </div>
                <button className="open" onClick={checkAnswer}>continue</button>
            </>}

            {activity.activityType === 'yesno' && <>
                <div className="yesno-answer">
                    <button onClick={() => checkAnswer('yes')}> כן</button>
                    <button onClick={() => checkAnswer('no')}> לא</button>
                </div>
                {/* <button onClick={()=>setCurrActivityStepIdx(prev => prev + 1)}>continue</button> */}
            </>}

            {activity.activityType === 'typing' && <>
                <div className="typing-answer">
                    {activity.correctAnswer?.split('').map((letter, i) =>
                        <input key={i} type="text" name="typing" value={inputTypingValue} onChange={handlaChange} />
                    )}
                </div>
                <button className="typing" onClick={checkAnswer}>continue</button>
            </>}
        </section>
    )
}