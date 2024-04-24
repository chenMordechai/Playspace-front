import v from '../assets/img/green-v.png'

export function SelectedImg({ imgUrl }) {
    return (
        <section className="selected-img">
            <img className="green-v" src={v} />
            <img className="media-url" src={imgUrl} />
        </section>
    )
}