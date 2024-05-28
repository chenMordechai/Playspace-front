import { Media } from './Media'


export function TextBeforeAfterActivity({ activity, buttonFunc, before }) {

    const madia = (before) ? 'mediaBefore' : 'mediaAfter'
    const text = (before) ? 'textBefore' : 'textAfter'

    return (
        <section className="text-before-after-activity">
            {activity[text] && <p>{activity[text]}</p>}
            <Media media={activity[madia]} />
            <button onClick={buttonFunc}>continue</button>
        </section>
    )
}