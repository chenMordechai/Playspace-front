import { useEffect, useRef, useState } from 'react'
import { Media } from './Media'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ActivityType } from './ActivityType'
import { LifeSaver } from './LifeSaver'
import { TextBeforeAfterActivity } from './TextBeforeAfterActivity'
import { gameService } from '../services/game.service'

export function ActivityPreview({ activityProgressType, activity, moveToNextActivity, currActivityStepIdx, setCurrActivityStepIdx }) {
    console.log('activity:', activity)
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)

    const [inputOpenValue, setInputOpenValue] = useState('')
    const [inputTypingValues, setInputTypingValues] = useState(null)

    const firstRender = useRef(true)

    async function checkAnswer(x) {
        if (activity.activityType === 'multiple') {
            console.log('idx', x)
        } else if (activity.activityType === 'open') {
            console.log('inputOpenValue:', inputOpenValue)
        } else if (activity.activityType === 'yesno') {
            console.log('res:', x)
        } else if (activity.activityType === 'typing') {
            const res = inputTypingValues.join('')
            console.log('res:', res)
        }

        // todo : check answer from back
        var res = await gameService.checkAnswer()
        console.log('res:', res)
        res = true
        setIsAnswerCorrect(res)

        if (res) {
            showSuccessMsg(`תשובה נכונה`)
            setTimeout(() => {
                setCurrActivityStepIdx(prev => prev + 1)
            }, 1000);
        } else {
            // todo: check max error from stage or activity
            // todo: gameService.getMaxError()
            var maxError = 3
            if (!maxError) {
                showErrorMsg('תשובה לא נכונה')
                setTimeout(() => {
                    setCurrActivityStepIdx(prev => prev + 1)
                }, 1000);
            } else {
                showErrorMsg(`תשובה לא נכונה יש לך ${maxError} ניסיונות לתקן`)
                // todo: maxError--
            }
        }

    }

    useEffect(() => {
        // console.log('hi1')
        console.log('activity.activityType:', activity.activityType)
        if (activity.activityType === 'typing') {
            console.log('hi2')
            const answerArray = activity.correctAnswer.split('').map(l => '')
            console.log('answerArray:', answerArray)
            setInputTypingValues(answerArray)
        }
    }, [activity])

    useEffect(() => {
        // console.log('inputTypingValue', inputTypingValues)
    }, [inputTypingValues])

    function onMoveToNextActivity() {
        moveToNextActivity()
        setIsAnswerCorrect(false)
    }

    function handlaChange(ev, idx) {
        const { value, name } = ev.target
        if (name === 'open') setInputOpenValue(value)

        else if (name === 'typing') {
            if (value.length > 1) return
            inputTypingValues.forEach((l, i) => {
                if (i === idx) inputTypingValues[i] = value
            })
            console.log('inputTypingValues:', inputTypingValues)
            setInputTypingValues([...inputTypingValues])
        }
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
                    <ActivityType activity={activity} checkAnswer={checkAnswer} textAreaValue={inputOpenValue} handlaChange={handlaChange} inputTypingValues={inputTypingValues} />
                    <LifeSaver />

                </section>
            </section>}

            {/* end activity */}
            {
                currActivityStepIdx === 2 && <>
                    <TextBeforeAfterActivity activity={activity} buttonFunc={onMoveToNextActivity} before={false} />
                </>
            }

        </section >
    )
}