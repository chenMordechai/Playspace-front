import { useEffect, useRef, useState } from 'react'
import { Media } from './Media'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ActivityType } from './ActivityType'
import { LifeSaver } from './LifeSaver'
import { TextBeforeAfterActivity } from './TextBeforeAfterActivity'
import { gameService } from '../services/game.service'
import { utilService } from '../services/util.service.js'
import { checkGameAnswer } from '../store/actions/game.action.js'


export function ActivityPreview({ activityProgressType, activity, moveToNextActivity, currActivityStepIdx, setCurrActivityStepIdx, gameId, stageId, gameType, stageMaxError, stageActivitiesIds }) {
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)

    const [inputOpenValue, setInputOpenValue] = useState('')
    const [inputTypingValues, setInputTypingValues] = useState(null)
    const [answersIdxToOff, setAnswersIdxToOff] = useState([])

    const firstRender = useRef(true)

    async function checkAnswer(answer) {
        // console.log('answer:', answer)
        if (activity.activityType === 'multiple') {
            // ?answer or answer idx?
        } else if (activity.activityType === 'open') {
            // !Avishai- How to check?
            answer = ''
        } else if (activity.activityType === 'yesno') {

        } else if (activity.activityType === 'typing') {

            answer = inputTypingValues.join('')
        }

        const answerData = {
            answer,
            activityId: activity.id,
            gameId,
            stageId,
            timeTaken: 0,
            isActivitySkipped: false,
            isStageSkipped: false
        }
        var res = await checkGameAnswer(answerData)
        // console.log('res:', res)
        console.log('activity:', activity)
        if (res.lastAnswerState) {
            showSuccessMsg({ txt: `+תשובה נכונה ${activity.pointsValue}`, func: () => setCurrActivityStepIdx(prev => prev + 1) })

        } else {
            if (res.submittedActivitiesIds.includes(activity.id)) {
                console.log('includes')
                showErrorMsg({ txt: `תשובה לא נכונה`, func: () => setCurrActivityStepIdx(prev => prev + 1) })

            } else {
                if (gameType === 'activities') {
                    const activityError = res.activityErrors.find(a => a.activityId === activity.id)
                    const maxError = activity.maxError - activityError.errorCount
                    showErrorMsg({ txt: `תשובה לא נכונה יש לך ${maxError} ניסיונות לתקן`, func: () => setCurrActivityStepIdx(prev => prev + 1) })

                } else if (gameType === 'stages') {

                    let activitiesErrorCount = 0
                    stageActivitiesIds.forEach(id => {
                        const activity = res.activityErrors.find(a => a.activityId === id)
                        if (activity) activitiesErrorCount += activity.errorCount
                    })
                    console.log('activitiesErrorCount:', activitiesErrorCount)
                    console.log('stageMaxError:', stageMaxError)
                    const maxError = stageMaxError - activitiesErrorCount
                    showErrorMsg({ txt: `תשובה לא נכונה יש לך ${maxError} ניסיונות לתקן`, func: () => setCurrActivityStepIdx(prev => prev + 1) })
                }

            }
        }
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