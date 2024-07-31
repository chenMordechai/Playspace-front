import { useEffect, useRef, useState } from 'react'
import { Media } from './Media'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ActivityType } from './ActivityType'
import { LifeSavers } from './LifeSavers'
import { TextBeforeAfterActivity } from './TextBeforeAfterActivity'
import { gameService } from '../services/game.service'
import { utilService } from '../services/util.service.js'
import { checkGameAnswer, usingLifeSaver } from '../store/actions/game.action.js'
import wheel from '../assets/img/wheel.png'
import { store } from '../store/store.js'


export function ActivityPreview({ setIsClickOnContinue, activityProgressType, activity, moveToNextActivity, currActivityStepIdx, setCurrActivityStepIdx, gameId, stageId, gameType, stageMaxError, stageActivitiesIds }) {
    setIsClickOnContinue(false)
    console.log('activity:', activity)
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)

    const [inputOpenValue, setInputOpenValue] = useState('')
    const [inputTypingValues, setInputTypingValues] = useState(null)
    const [answersIdxToOff, setAnswersIdxToOff] = useState([])

    const firstRender = useRef(true)
    const continueBtn = useRef()
    const elapsedTimeRef = useRef(0);

    useEffect(() => {
        elapsedTimeRef.current = 0
        const timer = setInterval(() => {
            elapsedTimeRef.current += 100;
        }, 100);

        return () => clearInterval(timer); // Clean up the interval on component unmount
    }, []);

    useEffect(() => {
        if (activity?.activityType === 'typing') {
            const answerArray = activity.correctAnswer.split('').map(l => '')
            setInputTypingValues(answerArray)
        }
    }, [activity])

    useEffect(() => {
    }, [inputTypingValues])


    async function checkAnswer(answer) {
        if (activity.activityType === 'multiple') {
            // answer
        } else if (activity.activityType === 'open') {
            console.log('checkAnswer')
            continueBtn.current.style.display = 'none'
            answer = inputOpenValue
            // txt
        } else if (activity.activityType === 'yesno') {
            // yes / no
        }
        // else if (activity.activityType === 'typing') {
        //     answer = inputTypingValues.join('')
        // }

        const answerData = {
            answer,
            activityId: activity.id,
            gameId,
            stageId,
            timeTaken: elapsedTimeRef.current,
            isActivitySkipped: false,
            isStageSkipped: false
        }
        // showSuccessMsg({ txt: `יאללה קדימה`, func: () => setCurrActivityStepIdx(prev => prev + 1) })
        var res = await checkGameAnswer(answerData)
        if (res.lastAnswerState) {
            showSuccessMsg({ txt: `+תשובה נכונה ${res.lastAnswerScore}`, func: () => onSetCurrActivityStepIdx(res) })

        } else {
            // if (isUserAdmin) {
            //     showErrorMsg({ txt: `תשובה לא נכונה`, func: () => setCurrActivityStepIdx(prev => prev + 1) })
            //     return
            // }
            if (res.submittedActivitiesIds.includes(activity.id)) {
                console.log('includes')
                showErrorMsg({ txt: `תשובה לא נכונה`, func: () => onSetCurrActivityStepIdx(res) })

            } else {
                if (gameType === 'activities') {
                    const activityError = res.activityErrors.find(a => a.activityId === activity.id)
                    const maxError = activity.maxError - activityError.errorCount
                    showErrorMsg({ txt: `תשובה לא נכונה יש לך ${maxError} ניסיונות לתקן`, func: () => onSetCurrActivityStepIdx(res) })

                } else if (gameType === 'stages') {

                    let activitiesErrorCount = 0
                    stageActivitiesIds.forEach(id => {
                        const activity = res.activityErrors.find(a => a.activityId === id)
                        if (activity) activitiesErrorCount += activity.errorCount
                    })
                    console.log('activitiesErrorCount:', activitiesErrorCount)
                    console.log('stageMaxError:', stageMaxError)
                    const maxError = stageMaxError - activitiesErrorCount
                    showErrorMsg({ txt: `תשובה לא נכונה יש לך ${maxError} ניסיונות לתקן`, func: () => onSetCurrActivityStepIdx(res) })
                }

            }
        }
        elapsedTimeRef.current = 0
    }

    function onSetCurrActivityStepIdx(player) {
        setCurrActivityStepIdx(prev => prev + 1)
        store.dispatch({ type: 'SET_LOGGEDIN_PLAYER', player })
    }

    function onMoveToNextActivity() {
        // console.log('onMoveToNextActivity:')
        moveToNextActivity()
        // setIsAnswerCorrect(false)
        // updatePlayerInStore(answerData, activity.correctAnswer)
        setIsClickOnContinue(true)

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
        if (activity.activityType === 'open') {
            continueBtn.current.style.display = 'none'
        }
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

            const data = {
                lifeSaver: 'fifty',
                activityId: activity.id,
                gameId
            }
            await usingLifeSaver(data)

        } else if (lifeSaver === 'skip') {
            const data = {
                lifeSaver: 'skip',
                activityId: activity.id,
                gameId
            }
            await usingLifeSaver(data)
            showSuccessMsg({ txt: `דילגת על השאלה`, func: () => setCurrActivityStepIdx(prev => prev + 1) })
        }
    }

    async function onSkipQuestion() {
        if (activity.activityType === 'open') {
            continueBtn.current.style.display = 'none'
        }
        const answerData = {
            answer: '',
            activityId: activity.id,
            gameId,
            stageId,
            timeTaken: 0,
            isActivitySkipped: true,
            isStageSkipped: false
        }
        var res = await checkGameAnswer(answerData)
        console.log('res:', res)
        if (res.lastAnswerSkipped) {
            showSuccessMsg({ txt: `דילגת על השאלה`, func: () => setCurrActivityStepIdx(prev => prev + 1) })
        } else {
            showErrorMsg({ txt: `אי אפשר לדלג על השאלה`, func: () => setCurrActivityStepIdx(prev => prev + 1) })

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

            {!activity.isRequired && <button className='skip-btn' onClick={onSkipQuestion}>דלג</button>}


            {/* activity */}
            {currActivityStepIdx === 1 && <section className='activity-step-1'>
                <div className="text-container">
                    <p>שאלה </p>
                    <p> {activity.text}</p>
                    <span className="wheel"><img src={wheel} /></span>
                </div>
                <section className="answer-container">
                    <ActivityType continueBtn={continueBtn} activity={activity} checkAnswer={checkAnswer} textAreaValue={inputOpenValue} handlaChange={handlaChange} inputTypingValues={inputTypingValues} answersIdxToOff={answersIdxToOff} />
                    <LifeSavers lifeSavers={activity?.lifeSavers} handleLifeSaver={handleLifeSaver} />



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