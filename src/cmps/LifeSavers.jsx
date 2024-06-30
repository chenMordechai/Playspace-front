
export function LifeSavers({ lifeSavers, handleLifeSaver }) {
    console.log('lifeSavers:', lifeSavers)

    if (!lifeSavers || !lifeSavers.length) return ''
    return (
        <section className="life-saver">
            <h3>Life Savers:</h3>
            <ul>{lifeSavers.map(l => <li key={l}
                onClick={() => handleLifeSaver(l)} >{l}
            </li>)}</ul>
        </section>
    )
}