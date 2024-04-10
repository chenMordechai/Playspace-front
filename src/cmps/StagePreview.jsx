import { useState, useEffect } from 'react'

import { ActivityPreview } from './ActivityPreview'

export function StagePreview({ stage, moveToNextStage, onResetActivityIdx, onMoveToNextActivity, currActivityIdx, currActivityStepIdx, setCurrActivityStepIdx }) {
    console.log('stage:', stage)
    const [currStageStepIdx, setCurrStageStepIdx] = useState(0)
    // const [currActivityIdx, setActivityIdx] = useState(0)

    useEffect(() => {
        console.log('currActivityIdx:', currActivityIdx)
        if (currActivityIdx === stage?.activities?.length) {
            moveToNextStage()
            setCurrStageStepIdx(prev => prev + 1)
        }
    }, [currActivityIdx])

    useEffect(() => {
        // setActivityIdx(0)
        onResetActivityIdx()
    }, [stage])


    // function onMoveToNextActivity() {
    //     setActivityIdx(prev => prev + 1)
    // }

    function onMoveToNextStage() {
        moveToNextStage()
        setCurrStageStepIdx(0)
    }

    if (!stage) return ''
    return (
        <section className="stage-preview">
            {/* start stage */}
            {currStageStepIdx === 0 && <>
                <h3>שם השלב:{stage.name}</h3>
                {stage.textBefore && <p>ההודעה לפני:{stage.textBefore}</p>}
                <button onClick={() => setCurrStageStepIdx(prev => prev + 1)}>התחל שלב</button>
            </>}

            {/* stage activities */}
            {/* short for tast */}
            {/* {currStageStepIdx === 1 && <> <h2>stage activitie...</h2>
                <button onClick={() => setCurrStageStepIdx(prev => prev + 1)}>סיום שלב</button>
            </>} */}
            {/* real */}
            {currStageStepIdx === 1 && <ActivityPreview activity={stage?.activities[currActivityIdx]} moveToNextActivity={onMoveToNextActivity} currActivityStepIdx={currActivityStepIdx} setCurrActivityStepIdx={setCurrActivityStepIdx} />}

            {/* end stage*/}
            {currStageStepIdx === 2 && <>
                {stage.textAfter && <p>ההודעה אחרי:{stage.textAfter}</p>}
                <button onClick={onMoveToNextStage}>מעבר לשלב הבא</button>
            </>}
        </section>
    )
}