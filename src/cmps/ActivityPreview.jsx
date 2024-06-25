import { useEffect, useRef, useState } from 'react'
import { Media } from './Media'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ActivityType } from './ActivityType'
import { LifeSaver } from './LifeSaver'
import { TextBeforeAfterActivity } from './TextBeforeAfterActivity'
import { gameService } from '../services/game.service'
import { utilService } from '../services/util.service.js'

export function ActivityPreview({ activityProgressType, activity, moveToNextActivity, currActivityStepIdx, setCurrActivityStepIdx, gameId, stageId }) {
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)

    const [inputOpenValue, setInputOpenValue] = useState('')
    const [inputTypingValues, setInputTypingValues] = useState(null)
    const [answersIdxToOff, setAnswersIdxToOff] = useState([])

    const firstRender = useRef(true)

    async function checkAnswer(answer) {
        console.log('answer:', answer)
        if (activity.activityType === 'multiple') {
            // ?answer or answer idx?
        } else if (activity.activityType === 'open') {
            answer = ''
            // !Avishai- How to check?
        } else if (activity.activityType === 'yesno') {

        } else if (activity.activityType === 'typing') {

            const res = inputTypingValues.join('')
        }

        // todo : check answer from back
        const answerData = {
            answer,
            activityId: activity.id,
            gameId,
            stageId,
            timeTaken: 0,
            isActivitySkipped: false,
            isStageSkipped: false
        }
        // var res = await gameService.checkAnswer(answerData)
        // console.log('res:', res)
        // setIsAnswerCorrect(res)

        // if (res) {
        //     showSuccessMsg(`תשובה נכונה`)
        //     setTimeout(() => {
        setCurrActivityStepIdx(prev => prev + 1)
        //     }, 1000);
        // } else {
        //     // todo: check max error from stage or activity
        //     // todo: gameService.getMaxError()
        //     var maxError = 3
        //     if (!maxError) {
        //         showErrorMsg('תשובה לא נכונה')
        //         setTimeout(() => {
        //             setCurrActivityStepIdx(prev => prev + 1)
        //         }, 1000);
        //     } else {
        //         showErrorMsg(`תשובה לא נכונה יש לך ${maxError} ניסיונות לתקן`)
        //         // todo: maxError--
        //     }
        // }

    }

    useEffect(() => {
        if (activity?.activityType === 'typing') {
            const answerArray = activity.correctAnswer.split('').map(l => '')
            setInputTypingValues(answerArray)
        }
    }, [activity])

    useEffect(() => {
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

    async function handleLifeSaver(lifeSaver) {
        // todo: from back player life saver

        if (lifeSaver === 'fifty' && activity.activityType === 'multiple') {
            const answers = activity.activityAnswers
            const number = (answers.length / 2)

            const answersIdxToOff = []
            while (answersIdxToOff.length < number) {
                const idx = utilService.getRandomIntInclusive(0, answers.length - 1)
                if (answers[idx] !== activity.currectAnswer) {
                    if (!answersIdxToOff.includes(idx)) answersIdxToOff.push(idx)
                }
            }

            setAnswersIdxToOff(answersIdxToOff)

        } else if (lifeSaver === 'skip') {
            // todo : check answer from back 
            // var res = await gameService.checkAnswer()
            showSuccessMsg(`דילגת על השאלה`)
            setTimeout(() => {
                setCurrActivityStepIdx(prev => prev + 1)
            }, 1000);
        }


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
                    <ActivityType activity={activity} checkAnswer={checkAnswer} textAreaValue={inputOpenValue} handlaChange={handlaChange} inputTypingValues={inputTypingValues} answersIdxToOff={answersIdxToOff} />
                    <LifeSaver lifeSaver={activity?.lifeSaver} handleLifeSaver={handleLifeSaver} />

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