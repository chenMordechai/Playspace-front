import { useState, useEffect } from 'react'

import { ActivityPreview } from './ActivityPreview'

export function StagePreview({ stage, moveToNextStage }) {
    console.log('stage:', stage)
    const [activityIdx, setActivityIdx] = useState(0)
    const [isStageOn, setIsStageOn] = useState(false)

    useEffect(() => {
        console.log('activityIdx:', activityIdx)
        if (activityIdx === stage?.activities?.length) {
            moveToNextStage()
            setIsStageOn(false)
        }
    }, [activityIdx])

    useEffect(() => {
        setActivityIdx(0)
    }, [stage])

    function onMoveToNextActivity() {
        setActivityIdx(prev => prev + 1)
    }
    if (!stage) return ''
    return (
        <section className="stage-preview">
            {!isStageOn && <><h2> StagePreview</h2>
                <h3>שם השלב:{stage.name}</h3>
                <p>ההודעה לפני:{stage.TextBefore}</p>

                <button onClick={() => setIsStageOn(prev => !prev)}>התחל שלב</button>
            </>}

            {isStageOn && <ActivityPreview activity={stage?.activities[activityIdx]} moveToNextActivity={onMoveToNextActivity} />}
        </section>
    )
}