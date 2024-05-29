import pen from '../assets/img/pen.png'


export function ActivityType({ activity, checkAnswer, textAreaValue, handlaChange, inputTypingValues, answersIdxToOff }) {

    // maybe one func for checking
    // function checkMultipleAnswer(i) {
    //     if (i === activity.correctAnswerId) setIsAnswerCorrect(true)
    //     else {
    //         // check max error
    //     }
    //     setCurrActivityStepIdx(prev => prev + 1)
    // }

    // function checkOpenAnswer() {
    //     console.log('checkOpenAnswer')
    //     if (!inputOpenValue) setIsAnswerCorrect(false)
    //     else {
    //         setIsAnswerCorrect(true)
    //         setCurrActivityStepIdx(prev => prev + 1)
    //     }
    // }

    // function checkTypingAnswer() {
    //     if (!inputTypingValue) setIsAnswerCorrect(false)
    //     else if (inputTypingValue === activity.correctAnswer) setIsAnswerCorrect(true)
    //     setCurrActivityStepIdx(prev => prev + 1)
    // }

    // function checkYesNoAnswer(answer) {
    //     if (answer === activity.correctAnswer) setIsAnswerCorrect(true)
    //     setCurrActivityStepIdx(prev => prev + 1)
    // }

    return (
        <section className="activity-type">
            {activity.activityType === 'multiple' &&
                <div className="multiple-answer">
                    {activity.activityAnswers.map((a, i) =>
                        <button key={a} disabled={answersIdxToOff.includes(i)}
                            style={{ background: (answersIdxToOff.includes(i)) ? '#a9a7a7' : '' }}
                            onClick={() => checkAnswer(a)}>
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

            {activity.activityType === 'typing' && inputTypingValues && <>
                <div className="typing-answer">
                    {activity.correctAnswer?.split('').map((letter, i) =>
                        <input key={i} type="text" name="typing" value={inputTypingValues[i]} onChange={(ev) => handlaChange(ev, i)} />
                    )}
                </div>
                <button className="typing" onClick={checkAnswer}>continue</button>
            </>}
        </section>
    )
}