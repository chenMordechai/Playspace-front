
export function Media({ media }) {
    console.log('media:', media)

    function getMediaType() {
        if (media.type.includes('image')) return 'img'
        else if (media.type.includes('video')) return 'video'
    }

    if (!media) return ''
    return (
        <section className="media">
            {getMediaType() === 'img' && <img src={media.url} />}
            {getMediaType() === 'video' && <video width="320" height="240" controls>
                <source src={media.url} type={media.type} />
            </video>}
        </section>
    )
}