import { ActivityFormList } from "./ActivityFormList"


export function StagesFormList({ stages, activityProgressType, onHandleStageChange, onOpenActivities, openActivities, onHandleActivityChange,onRemoveStage,onRemoveActivity,onAddActivityToStage }) {
    return (
        <>
            {/* <span className="stages" >שלבי המשחק</span> */}
            <ul className="stage-list">
                {stages.map((stage, i) => <li key={i}>
                    <span className="stages">שלב  {i + 1}</span>

                 { stages.length > 1 &&  <button type="button" onClick={()=>onRemoveStage(i)}>הסר שלב</button>}
                 { !(stages.length > 1) &&  <span></span>}

                    <label htmlFor="name">שם השלב</label>
                    <input required type="text" name="name" id="name" value={stage.name} onChange={() => onHandleStageChange(event, i)} />

                    {activityProgressType === 'onTime' && <>
                        <label htmlFor="dateStart">תאריך התחלה</label>
                        <input type="date" name="dateStart" id="dateStart" value={stage.dateStart} onChange={() => onHandleStageChange(event, i)} />

                        <label htmlFor="timeStart">שעת התחלה</label>
                        <input type="time" name="timeStart" id="timeStart" value={stage.timeStart} onChange={() => onHandleStageChange(event, i)} />

                        <label htmlFor="dateEnd">תאריך סיום</label>
                        <input type="date" name="dateEnd" id="dateEnd" value={stage.dateEnd} onChange={() => onHandleStageChange(event, i)} />

                        <label htmlFor="timeEnd">שעת סיום</label>
                        <input type="time" name="timeEnd" id="timeEnd" value={stage.timeEnd} onChange={() => onHandleStageChange(event, i)} />
                    </>}

                    {/* <label htmlFor="activities">כמה שאלות יש בשלב</label>
                    <input type="number" min="0" name="activities" id="activities" value={stage.activities?.length || 0} onChange={() => onHandleStageChange(event, i)} /> */}

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
                    <ActivityFormList activities={stage.activities} i={i} activityProgressType={activityProgressType} onHandleActivityChange={onHandleActivityChange} onRemoveActivity={onRemoveActivity} />
                    <button type="button" className="add-activity" onClick={()=>onAddActivityToStage(i)}>הוסף שאלה</button>
                    </>}
                </li>)}
            </ul>
        </>
    )
}