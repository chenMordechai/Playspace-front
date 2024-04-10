import { useState } from 'react'
import { Media } from './Media'

export function ActivityPreview({ activity, moveToNextActivity }) {
    console.log('activity:', activity)
    const [currActivityStepIdx, setCurrActivityStepIdx] = useState(0)
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)

    const [textAreaValue, setTextAreaValue] = useState('')


    function checkMultipleAnswer(i) {
        if (i === activity.correctAnswerId) setIsAnswerCorrect(true)
        else {
            // check max error
        }

    }

    function checkOpenAnswer() {
        if (!textAreaValue) setIsAnswerCorrect(false)
        else setIsAnswerCorrect(true)
    }

    function onMoveToNextActivity() {
        moveToNextActivity()
        setIsAnswerCorrect(false)
        setCurrActivityStepIdx(0)
    }

    function handlaChange(ev) {
        const { value } = ev.target
        setTextAreaValue(value)
    }



    if (!activity) return ''
    return (
        <section className="activity-preview">

            {/* start activity */}
            {currActivityStepIdx === 0 && <>
                {activity.textBefore && <h3>ההודעה לפני:{activity.textBefore}</h3>}
                <Media media={activity.mediaBefore} />
                <button onClick={() => setCurrActivityStepIdx(prev => prev + 1)}>התקדם לשאלה</button>
            </>}

            {/* activity */}
            {currActivityStepIdx === 1 && <section>
                <h3>השאלה: {activity.name}</h3>
                <section className="answer-container">
                    <h2>Answer:</h2>
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
                            <textarea value={textAreaValue} onChange={handlaChange} />

                            <button onClick={checkOpenAnswer}> שלח תשובה </button>
                        </div>}
                </section>

                {isAnswerCorrect && <section>
                    {/* תגובה נכונה לכל זוג של שאלה */}
                    <h3>יופי !!  תשובה נכונה</h3>
                    <button onClick={() => setCurrActivityStepIdx(prev => prev + 1)}>סיימתי</button>
                </section>}
            </section>}

            {/* end activity */}
            {currActivityStepIdx === 2 && <>
                {activity.textAfter && <h3>ההודעה אחרי:{activity.textAfter}</h3>}
                <Media media={activity.mediaAfter} />
                <button onClick={onMoveToNextActivity}>התקדם לשאלה הבאה</button>
            </>}

        </section>
    )
}