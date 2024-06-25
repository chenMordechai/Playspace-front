import { Media } from './Media'


export function TextBeforeAfterActivity({ activity, buttonFunc, before }) {

    const madia = (before) ? 'mediaBefore' : 'mediaAfter'
    const text = (before) ? 'textBefore' : 'textAfter'

    if (!activity[text] && !activity[madia]) buttonFunc()
    return (
        <section className="text-before-after-activity">
            {activity[text] && <p>{activity[text]}</p>}
            <Media media={activity[madia]} />
            <button onClick={buttonFunc}>continue</button>
        </section>
    )
}