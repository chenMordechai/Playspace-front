import loader from '../assets/img/loader.gif'
import image from '../assets/img/img.png'


import { SelectedImg } from './SelectedImg'

export function UserImgAddModal({ isLoading, media, onChangeFileInput, onCloseModal }) {
    return (
        <section className="user-img-add-modal">
            <span>Upload your photo</span>

            <label htmlFor="user-img">
                {!media?.url && !isLoading && <img className="placeholder" src={image} />}
                {isLoading && <img className="loader" src={loader} />}
                {!isLoading && media?.url && <SelectedImg imgUrl={media.url} />}
            </label>
            <input type="file" id="user-img" onChange={onChangeFileInput} hidden />

            <button disabled={!(media?.url)} onClick={onCloseModal}>Next</button>
        </section>
    )
}