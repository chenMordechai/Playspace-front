
export function ActivityFormList({ activities, i, onHandleActivityChange, activityProgressType }) {
    return (
        <ul className="activity-list">
            {activities?.map((activity, j) => <li key={j}>
                <span className="activity">שאלה {j + 1}</span>

                <label htmlFor="name">הטקסט</label>
                <input type="text" name="name" id="name" value={activity.name} onChange={() => onHandleActivityChange(event, i, j)} />

                {activityProgressType === 'onTime' && <>
                    <label htmlFor="dateStart">תאריך התחלה</label>
                    <input type="date" name="dateStart" id="dateStart" value={activity.dateStart} onChange={() => onHandleActivityChange(event, i, j)} />

                    <label htmlFor="timeStart">שעת התחלה</label>
                    <input type="time" name="timeStart" id="timeStart" value={activity.timeStart} onChange={() => onHandleActivityChange(event, i, j)} />

                    <label htmlFor="dateEnd">תאריך סיום</label>
                    <input type="date" name="dateEnd" id="dateEnd" value={activity.dateEnd} onChange={() => onHandleActivityChange(event, i, j)} />

                    <label htmlFor="timeEnd">שעת סיום</label>
                    <input type="time" name="timeEnd" id="timeEnd" value={activity.timeEnd} onChange={() => onHandleActivityChange(event, i, j)} />
                </>}

                <label htmlFor="activityType">סוג השאלה</label>
                <select name="activityType" id="activityType" value={activity.activityType} onChange={() => onHandleActivityChange(event, i, j)} >
                    <option value="open">פתוחה</option>
                    <option value="multiple">רב ברירה</option>
                    <option value="yesno">נכון/לא נכון</option>
                    <option value="typing">הקלדה</option>
                </select>

                {activity.activityType === "multiple" && <>
                    <label htmlFor="activityAswers">האופציות לתשובה (א,ב,ג)</label>
                    <input type="text" name="activityAswers" id="activityAswers" value={activity.activityAswers || ''} onChange={() => onHandleActivityChange(event, i, j)} />
                </>}

                <label htmlFor="correctAnswer">התשובה</label>
                <input type="text" name="correctAnswer" id="correctAnswer" value={activity.correctAnswer} onChange={() => onHandleActivityChange(event, i, j)} />

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