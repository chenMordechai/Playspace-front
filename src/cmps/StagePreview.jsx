import { useState, useEffect } from 'react'

import { ActivityPreview } from './ActivityPreview'

export function StagePreview({ openLiveSaversModal, onToggleOpenLiveSaversModal, stage, moveToNextStage, onResetActivityIdx, onMoveToNextActivity, currActivityIdx, currActivityStepIdx, setCurrActivityStepIdx, currStageStepIdx, setCurrStageStepIdx, gameId, gameType }) {

    function isStageStart() {
        if (!stage.stageStartTimestamp) return true
        return stage.stageStartTimestamp < Date.now()
    }

    function isStageEnd() {
        if (!stage.stageEndTimestamp) return false
        return stage.stageEndTimestamp < Date.now()
    }

    function getStageActivitiesIds() {
        return stage.activities.map(a => a.id)
    }

    if (!stage) return ''
    return (
        <section className="stage-preview">
            {/* start stage */}
            {currStageStepIdx === 0 && <>
                <h3>שם השלב:{stage.name}</h3>

                {!isStageStart() > 0 && <> <h4>השלב יתחיל בתאריך:  {stage.dateStart}</h4>
                    <h4>בשעה: {stage.timeStart}</h4>
                    <h4>ויסתיים בתאריך:  {stage.dateEnd}</h4>
                    <h4>בשעה: {stage.timeEnd}</h4>
                </>}

                {isStageEnd() && <h2>
                    השלב הסתיים
                </h2>}

                {isStageStart() && !isStageEnd() && <> <h2>השלב התחיל</h2>
                    {stage.textBefore && <p>ההודעה לפני:{stage.textBefore}</p>}
                    <button onClick={() => setCurrStageStepIdx(prev => prev + 1)}>התחל שלב</button>
                </>}


            </>}

            {/* stage activities */}
            {/* short for tast */}
            {/* {currStageStepIdx === 1 && <> <h2>stage activitie...</h2>
                <button onClick={() => setCurrStageStepIdx(prev => prev + 1)}>סיום שלב</button>
            </>} */}
            {/* real */}
            {currStageStepIdx === 1 && <ActivityPreview openLiveSaversModal={openLiveSaversModal} onToggleOpenLiveSaversModal={onToggleOpenLiveSaversModal} activity={stage?.activities[currActivityIdx]} moveToNextActivity={onMoveToNextActivity} currActivityStepIdx={currActivityStepIdx} setCurrActivityStepIdx={setCurrActivityStepIdx} gameId={gameId} stageId={stage.id} gameType={gameType} stageMaxError={stage.maxError} stageActivitiesIds={getStageActivitiesIds()} />}

            {/* end stage*/}
            {currStageStepIdx === 2 && <>
                {stage.textAfter && <p>ההודעה אחרי:{stage.textAfter}</p>}
                <button onClick={moveToNextStage}>מעבר לשלב הבא</button>
            </>}
        </section>
    )
}