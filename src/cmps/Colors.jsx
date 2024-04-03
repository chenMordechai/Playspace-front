import { ImageColorPicker } from 'react-image-color-picker';

export function Colors ({onChangeImg, gameLogo , gameColors , colors, onHandleChangeColor,onHandleColorPick , openColorPicker,setOpenColorPicker}){
   
    return (
        <>
        <label htmlFor="logo">לוגו</label>
        <input type="file" name="logo" id="logo" onChange={onChangeImg} />
        {gameLogo && <img className="logo-img" src={gameLogo.url} />}

        {gameColors && <ul className="colors">
            {gameColors.map((color, i) => <li key={color}>
                {/* <input type="color" name="color1" id={`color${i + 1}`} value={color} onChange={onHandleChangeColor} /> */}
                <div className="color-container" style={{ backgroundColor: color }} onClick={()=>onHandleColorPick(color)}>
                </div>
            </li>)}
                <button onClick={()=>setOpenColorPicker(prev=>!prev)}>בחר מהתמונה</button>
        </ul>}

        <span>צבעים</span>
        <ul className="colors">
            {colors.map((color, i) => <li key={color}>
                <input type="color" name="color1" id={`color${i + 1}`} value={color} onChange={onHandleChangeColor} />
            </li>)}
            
        </ul>
        {/* color picker on the logo image */}

        {gameLogo && openColorPicker && <div className="img-color-picker-container">
            <button className="close-btn" onClick={()=>setOpenColorPicker(prev=>!prev)}>X</button>
            <ImageColorPicker
            onColorPick={onHandleColorPick}
            imgSrc={gameLogo.url}
            zoom={1}
            />
        </div>}
        </>
    )
}