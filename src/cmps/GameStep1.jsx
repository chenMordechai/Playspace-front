import { ActivityPreview } from "./ActivityPreview"
import { StagePreview } from "./StagePreview"


export function GameStep1({ game, currStageIdx, moveToNextStage, onResetActivityIdx, currActivityIdx, onMoveToNextActivity, currActivityStepIdx, setCurrActivityStepIdx, currStageStepIdx, setCurrStageStepIdx }) {
    console.log('game:', game)
    return (
        <div className="game-step-1">
            {game.gameType === 'stages' && <StagePreview stage={game.stages[currStageIdx]} moveToNextStage={moveToNextStage} onResetActivityIdx={onResetActivityIdx} currActivityIdx={currActivityIdx} onMoveToNextActivity={onMoveToNextActivity} currActivityStepIdx={currActivityStepIdx} setCurrActivityStepIdx={setCurrActivityStepIdx} currStageStepIdx={currStageStepIdx} setCurrStageStepIdx={setCurrStageStepIdx} gameId={game.id} gameType={'stages'} />}
            {game.gameType === 'activities' && <ActivityPreview activityProgressType={game.activityProgressType} activity={game.activities[currActivityIdx]} moveToNextActivity={onMoveToNextActivity} currActivityStepIdx={currActivityStepIdx} setCurrActivityStepIdx={setCurrActivityStepIdx} gameId={game.id} stageId={null} gameType={'activities'} />}
        </div>
    )
}