

export function DateForm({ obj, onHandleChange }) {
    console.log('obj:', obj)
    return (
        <>
            <label htmlFor="dateStart">תאריך התחלה</label>
            <input type="date" name="dateStart" id="dateStart" value={obj.dateStart} onChange={onHandleChange} />

            <label htmlFor="timeStart">שעת התחלה</label>
            <input type="time" name="timeStart" id="timeStart" value={obj.timeStart} onChange={onHandleChange} />

            <label htmlFor="dateEnd">תאריך סיום</label>
            <input type="date" name="dateEnd" id="dateEnd" value={obj.dateEnd} onChange={onHandleChange} />

            <label htmlFor="timeEnd">שעת סיום</label>
            <input type="time" name="timeEnd" id="timeEnd" value={obj.timeEnd} onChange={onHandleChange} />

        </>
    )
}