import { ActivityPreview } from "./ActivityPreview"
import { StagePreview } from "./StagePreview"


export function GameStep1({ setIsUserMsgOpen, game, currStageIdx, moveToNextStage, onResetActivityIdx, currActivityIdx, onMoveToNextActivity, currActivityStepIdx, setCurrActivityStepIdx, currStageStepIdx, setCurrStageStepIdx }) {
    return (
        <div className="game-step-1">
            {game.gameType === 'stages' && <StagePreview setIsUserMsgOpen={setIsUserMsgOpen} stage={game.stages[currStageIdx]} moveToNextStage={moveToNextStage} onResetActivityIdx={onResetActivityIdx} currActivityIdx={currActivityIdx} onMoveToNextActivity={onMoveToNextActivity} currActivityStepIdx={currActivityStepIdx} setCurrActivityStepIdx={setCurrActivityStepIdx} currStageStepIdx={currStageStepIdx} setCurrStageStepIdx={setCurrStageStepIdx} />}
            {game.gameType === 'activities' && <ActivityPreview setIsUserMsgOpen={setIsUserMsgOpen} activityProgressType={game.activityProgressType} activity={game.activities[currActivityIdx]} moveToNextActivity={onMoveToNextActivity} currActivityStepIdx={currActivityStepIdx} setCurrActivityStepIdx={setCurrActivityStepIdx} />}
        </div>
    )
}