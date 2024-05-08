import { DateForm } from "./DateForm"

export function ActivityFormList({ activities, i, onHandleActivityChange, activityProgressType, onRemoveActivity, isEdit }) {
    return (
        <ul className="activity-list">
            {activities?.map((activity, j) => <li key={j}>
                <span className="activity">שאלה {j + 1}</span>

                {activities.length > 1 && !isEdit && <button type="button" onClick={() => onRemoveActivity(j, i)}>הסר שאלה</button>}
                {(!(activities.length > 1) || isEdit) && <span></span>}

                <label htmlFor="text">הטקסט</label>
                <input required type="text" name="text" id="text" value={activity.text} onChange={() => onHandleActivityChange(event, i, j)} />

                {activityProgressType === 'onTime' && <>

                    <DateForm obj={activity} onHandleChange={() => onHandleActivityChange(event, i, j)} />

                </>}

                <label htmlFor="activityType">סוג השאלה</label>
                <span>{activity.activityType}</span>
                {/* <select required name="activityType" id="activityType" value={activity.activityType} onChange={() => onHandleActivityChange(event, i, j)} >
                    <option value="open">פתוחה</option>
                    <option value="multiple">רב ברירה</option>
                    <option value="yesno">נכון/לא נכון</option>
                    <option value="typing">הקלדה</option>
                </select> */}

                {activity.activityType === "multiple" && <>
                    <label htmlFor="activityAnswers">האופציות לתשובה (א,ב,ג,ד)</label>
                    <input required type="text" name="activityAnswers" id="activityAswers" value={activity.activityAnswers || ''} onChange={() => onHandleActivityChange(event, i, j)} />
                </>}

                <label htmlFor="correctAnswer">התשובה</label>
                <input required type="text" name="correctAnswer" id="correctAnswer" value={activity.correctAnswer} onChange={() => onHandleActivityChange(event, i, j)} />

                <label htmlFor="pointsValue">ניקוד</label>
                <input type="number" min="0" name="pointsValue" id="pointsValue" value={activity.pointsValue} onChange={() => onHandleActivityChange(event, i, j)} />

                <label htmlFor="maxError">כמה טעויות מותר</label>
                <input type="number" min="0" max="10" name="maxError" id="maxError" value={activity.maxError} onChange={() => onHandleActivityChange(event, i, j)} />

                <label htmlFor="textBefore">הודעה לפני השאלה</label>
                <textarea name="textBefore" id="textBefore" value={activity.textBefore} onChange={() => onHandleActivityChange(event, i, j)} cols="30" rows="3"></textarea>

                <label htmlFor="textAfter">הודעה אחרי השאלה</label>
                <textarea name="textAfter" id="textAfter" value={activity.textAfter} onChange={() => onHandleActivityChange(event, i, j)} cols="30" rows="3"></textarea>

                <label htmlFor="mediaBefore">תוספת גרפית לפני השאלה</label>
                <input type="file" name="mediaBefore" id="mediaBefore" onChange={() => onHandleActivityChange(event, i, j)} />

                {activity.mediaBefore && <>
                    <span>{activity.mediaBefore.type}</span>
                    <img className="media" src={activity.mediaBefore.url} />
                </>}

                <label htmlFor="mediaAfter">תוספת גרפית אחרי השאלה</label>
                <input type="file" name="mediaAfter" id="mediaAfter" onChange={() => onHandleActivityChange(event, i, j)} />

                {activity.mediaAfter && <>
                    <span>{activity.mediaAfter.type}</span>
                    <img className="media" src={activity.mediaAfter.url} />
                </>}

                <label htmlFor="lifeSaver">גלגלי הצלה</label>
                <select multiple name="lifeSaver" id="lifeSaver" value={activities.lifeSaver} onChange={() => onHandleActivityChange(event, i, j)} >
                    {activity.activityType === 'multiple' && <option value="fifty">50/50</option>}
                    <option value="moreTime">תוספת זמן</option>
                    <option value="skip">דלג</option>
                </select>



            </li>)}
        </ul>
    )
}