import { ActivityFormList } from "./ActivityFormList"
import { DateForm } from "./DateForm"


export function StagesFormList({ stages, activityProgressType, onHandleStageChange, onOpenActivities, openActivities, onHandleActivityChange, onRemoveStage, onRemoveActivity, onAddActivityToStage, isEdit }) {
    return (
        <>
            <ul className="stage-list">
                {stages.map((stage, i) => <li key={i}>
                    <span className="stages">שלב  {i + 1}</span>

                    {stages.length > 1 && !isEdit && <button type="button" onClick={() => onRemoveStage(i)}>הסר שלב</button>}
                    {(!(stages.length > 1) || isEdit) && <span></span>}

                    <label htmlFor="name">שם השלב</label>
                    <input required type="text" name="name" id="name" value={stage.name} onChange={() => onHandleStageChange(event, i)} />

                    {activityProgressType === 'onTime' && <>

                        <DateForm obj={stage} onHandleChange={() => onHandleStageChange(event, i)} />
                    </>}

                    <label htmlFor="maxError">כמה טעויות מותר</label>
                    <input type="number" min="0" max={stage.activities?.length} name="maxError" id="maxError" value={stage.maxError} onChange={() => onHandleStageChange(event, i)} />

                    <label htmlFor="isRequired">האם השלב חובה?</label>
                    <input type="checkbox" name="isRequired" id="isRequired" value={stage.isRequired} onChange={() => onHandleStageChange(event, i)} />

                    <label htmlFor="textBefore">הודעה לפני השלב</label>
                    <textarea name="textBefore" id="textBefore" value={stage.textBefore} onChange={() => onHandleStageChange(event, i)} cols="30" rows="3"></textarea>

                    <label htmlFor="textAfter">הודעה אחרי השלב</label>
                    <textarea name="textAfter" id="textAfter" value={stage.textAfter} onChange={() => onHandleStageChange(event, i)} cols="30" rows="3"></textarea>

                    <span>הזנת השאלות</span>
                    <button type="button" onClick={onOpenActivities}>{openActivities ? 'סגירה' : 'פתיחה'}</button>

                    {openActivities && <>
                        <ActivityFormList activities={stage.activities} i={i} activityProgressType={activityProgressType} onHandleActivityChange={onHandleActivityChange} onRemoveActivity={onRemoveActivity} isEdit={isEdit} />
                        <button type="button" className="add-activity" onClick={() => onAddActivityToStage(i)}>הוסף שאלה</button>
                    </>}
                </li>)}
            </ul>
        </>
    )
}