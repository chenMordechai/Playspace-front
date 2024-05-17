import { Media } from './Media'


export function TextBeforeAfterActivity({ activity, buttonFunc }) {
    return (
        <>
            <Media media={activity.mediaBefore} />
            {activity.textBefore && <p>{activity.textBefore}</p>}
            <button onClick={buttonFunc}>continue</button>
        </>
    )
}