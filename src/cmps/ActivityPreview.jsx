import { useState } from 'react'
import { Media } from './Media'

import { ActivityType } from './ActivityType'
import { TextBeforeAfterActivity } from './TextBeforeAfterActivity'

export function ActivityPreview({ activityProgressType, activity, moveToNextActivity, currActivityStepIdx, setCurrActivityStepIdx }) {
    console.log('activity:', activity)
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)

    const [inputOpenValue, setInputOpenValue] = useState('')
    const [inputTypingValue, setInputTypingValue] = useState('')

    // maybe one func for checking
    function checkMultipleAnswer(i) {
        if (i === activity.correctAnswerId) setIsAnswerCorrect(true)
        else {
            // check max error
        }
    }

    function checkOpenAnswer() {
        console.log('checkOpenAnswer')
        if (!inputOpenValue) setIsAnswerCorrect(false)
        else {
            setIsAnswerCorrect(true)
            setCurrActivityStepIdx(prev => prev + 1)
        }
    }

    function checkTypingAnswer() {
        if (!inputTypingValue) setIsAnswerCorrect(false)
        else if (inputTypingValue === activity.correctAnswer) setIsAnswerCorrect(true)

    }

    function checkYesNoAnswer(answer) {
        if (answer === activity.correctAnswer) setIsAnswerCorrect(true)
        setCurrActivityStepIdx(prev => prev + 1)
    }

    function onMoveToNextActivity() {
        moveToNextActivity()
        setIsAnswerCorrect(false)
    }

    function handlaChange(ev) {
        const { value, name } = ev.target
        if (name === 'open') setInputOpenValue(value)
        else if (name === 'typing') setInputTypingValue(value)
    }

    function isActivityStart() {
        if (!activity.activityStartTimestamp) return true
        return activity.activityStartTimestamp < Date.now()
    }

    function isActivityEnd() {
        if (!activity.activityEndTimestamp) return false
        return activity.activityEndTimestamp < Date.now()
    }


    if (!activity) return ''
    return (
        <section className="activity-preview">

            {/* start activity */}
            {currActivityStepIdx === 0 && <>

                {activityProgressType === 'onTime' && <>
                    {!isActivityStart() > 0 && <> <h4>השאלה תתחיל בתאריך:  {activity.dateStart}</h4>
                        <h4>בשעה: {activity.timeStart}</h4>
                        <h4>ותסתיים בתאריך:  {activity.dateEnd}</h4>
                        <h4>בשעה: {activity.timeEnd}</h4>
                    </>}

                    {isActivityEnd() && <h2>
                        השאלה הסתיימה
                    </h2>}

                    {isActivityStart() && !isActivityEnd() && <>
                        {/* <h2>השאלה התחילה</h2> */}
                        <TextBeforeAfterActivity activity={activity} buttonFunc={() => setCurrActivityStepIdx(prev => prev + 1)} before={true} />
                    </>}
                </>}

                {activityProgressType !== 'onTine' && <>
                    <TextBeforeAfterActivity activity={activity} buttonFunc={() => setCurrActivityStepIdx(prev => prev + 1)} before={true} />
                </>}

            </>}

            {/* activity */}
            {currActivityStepIdx === 1 && <section className='activity-step-1'>
                <div className="text-container">
                    <p>Question </p>
                    <p> {activity.text}</p>

                </div>
                <section className="answer-container">
                    <ActivityType activity={activity} checkMultipleAnswer={checkMultipleAnswer} textAreaValue={inputOpenValue} handlaChange={handlaChange} checkOpenAnswer={checkOpenAnswer} checkYesNoAnswer={checkYesNoAnswer} inputTypingValue={inputTypingValue} checkTypingAnswer={checkTypingAnswer} />
                </section>

                {/*{isAnswerCorrect && <section>
                    {/* תגובה נכונה לכל זוג של שאלה */}
                {/* <h3>יופי !!  תשובה נכונה</h3>
                    <button onClick={() => setCurrActivityStepIdx(prev => prev + 1)}>סיימתי</button>
                </section>} */}

            </section>}

            {/* end activity */}
            {currActivityStepIdx === 2 && <>
                <TextBeforeAfterActivity activity={activity} buttonFunc={onMoveToNextActivity} before={false} />
                {/* {activity.textAfter && <h3>ההודעה אחרי:{activity.textAfter}</h3>}
                <Media media={activity.mediaAfter} />
                <button onClick={onMoveToNextActivity}>התקדם לשאלה הבאה</button> */}
            </>}

        </section>
    )
}