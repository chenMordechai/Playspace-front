
export function LifeSaversModal({ lifeSavers, handleLifeSaver }) {
    console.log('lifeSavers:', lifeSavers)

    if (!lifeSavers || !lifeSavers.length) return ''
    return (
        <section className="life-savers-modal">
            {/* <h3>Life Savers:</h3> */}
            {/* <ul>
                <li key={0}
                    onClick={() => handleLifeSaver(l)} >option1
                </li>
                <li key={1}
                    onClick={() => handleLifeSaver(l)} >option2
                </li>
                <li key={2}
                    onClick={() => handleLifeSaver(l)} >option3
                </li>
                <li key={3}
                    onClick={() => handleLifeSaver(l)} >option4
                </li>
            </ul> */}
            <ul>{lifeSavers.map(l => <li key={l}
                onClick={() => handleLifeSaver(l)} >{l}
            </li>)}
            </ul>
        </section>
    )
}