
export function LifeSaver({ lifeSaver, handleLifeSaver }) {

    if (!lifeSaver || !lifeSaver.length) return ''
    return (
        <section className="life-saver">
            <h3>Life Saver:</h3>
            <ul>{lifeSaver.map(l => <li key={l}
                onClick={() => handleLifeSaver(l)} >{l}
            </li>)}</ul>
        </section>
    )
}