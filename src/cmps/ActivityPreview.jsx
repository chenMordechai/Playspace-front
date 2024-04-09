import { useState } from 'react'

export function ActivityPreview({ activity, moveToNextActivity }) {
    console.log('activity:', activity)
    const [closeTextBefore, setCloseTextBefore] = useState(false)
    const [closeTextAfter, setCloseTextAfter] = useState(false)
    const [openModal, setOpenModal] = useState(false)
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
    }

    function handlaChange(ev) {
        const { value } = ev.target
        setTextAreaValue(value)
    }

    if (!activity) return ''
    return (
        <section className="activity-preview">
            <h2>ActivityPreview</h2>
            {activity.textBefore && !closeTextBefore && <>
                <h3>ההודעה לפני:{activity.textBefore}</h3>
                <button onClick={() => setCloseTextBefore(prev => !prev)}>התקדם לשאלה</button>
            </>}


            {closeTextBefore && <section>
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
                    <button onClick={onMoveToNextActivity}>מעבר לשאלה הבאה</button>
                </section>}
            </section>}


            {activity.textAfter && !closeTextAfter && <>
                <h3>ההודעה לפני:{activity.textAfter}</h3>
                <button onClick={() => setCloseTextAfter(prev => !prev)}>התקדם לשאלה</button>
            </>}

        </section>
    )
}