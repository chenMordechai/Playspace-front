import loader from '../assets/img/loader.gif'
import { Media } from "../cmps/Media.jsx";

export function UserImgAddModal({isLoading,media, onChangeFileInput,onSetAvatarImg,onToggleOpenUserImgAddModal }) {
    
    function onNext(){
        onSetAvatarImg()
        onToggleOpenUserImgAddModal()
    }
    
    return (
        <section className="user-img-add">
            <span>Upload your photo</span>
            <label htmlFor="user-img">
                {/* <img src={} alt="" /> */}
                {/* <span>img</span> */}
                {/* {!url && !isLoading && <img className="placeholder" src={image} />} */}
                {!media && !isLoading && <span>img</span>}
                {isLoading && <img className="loader" src={loader} />}
                {!isLoading && media && <Media media={media} />}
            </label>
            <input type="file" id="user-img" onChange={onChangeFileInput} hidden />

            <button className={`next-btn ${media ? 'purple-btn' : ''}`} onClick={onNext}>Next</button>
        </section>
    )
}