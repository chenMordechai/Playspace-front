import { Media } from './Media'


export function TextBeforeAfterActivity({ activity, buttonFunc, before }) {

    const madia = (before) ? 'mediaBefore' : 'mediaAfter'
    const text = (before) ? 'textBefore' : 'textAfter'

    return (
        <section className="text-before-after-activity">
            <Media media={activity[madia]} />
            {activity[text] && <p>{activity[text]}</p>}
            <button onClick={buttonFunc}>continue</button>
        </section>
    )
}