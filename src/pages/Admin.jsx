import { useEffect, useState } from 'react'
import { prominent } from 'color.js'
import { ImageColorPicker } from 'react-image-color-picker';

import { gameService } from '../services/game.service.js'
import { utilService } from '../services/util.service.js'

export function Admin() {

    const [game, setGame] = useState(gameService.getEmptyGame())

    useEffect(() => {
        // const date = new Date("2024-04-02 11:00")
        // console.log('date:', date.getTime())
        console.log('game:', game)

    }, [game])

    function onHandleChange(ev) {
        const { name, value, type } = ev.target
        if (type === 'number') value = +value
        if (name === 'teams' || name === 'stages') {
            const object = name === 'teams' ? gameService.getEmptyTeam() : gameService.getEmptyStage()
            setGame(prevGame => {
                const diff = value - (prevGame[name]?.length || 0)
                if (diff > 0) return { ...prevGame, [name]: (prevGame[name]?.length) ? [...prevGame[name], object] : [object] }
                else return { ...prevGame, [name]: prevGame[name].filter((t, i) => i < value) }
            })
        } else {
            setGame(prevGame => ({ ...prevGame, [name]: value }))
        }
    }

    async function onChangeImg(ev) {
        try {
            // setIsLoading(true)
            const media = await utilService.uploadImgToCloudinary(ev)
            setGame(prevGame => ({ ...prevGame, logo: media }))
            getColorsFromImg(media.url)
        } catch (err) {
            console.log('err:', err)
        } finally {
            // setIsLoading(false)
        }
    }

    async function getColorsFromImg(imgUrl) {
        const colors = await prominent(imgUrl, { format: 'hex', amount: 5, group: 100 })
        console.log(colors) // [241, 221, 63]
        setGame(prevGame => ({ ...prevGame, colors }))
    }

    function onHandleTeamNameChange(ev, i) {
        const { value } = ev.target
        setGame(prevGame => {
            prevGame.teams[i].name = value
            return { ...prevGame }
        })
    }

    function onHandleStageChange(ev, i) {
        let { value, name, type } = ev.target
        if (type === 'checkbox') value = ev.target.checked
        if (type === 'number') value = +value

        if (name === 'questions') {
            const object = gameService.getEmptyQuestion()
            setGame(prevGame => {
                const diff = value - (prevGame.stages[i][name]?.length || 0)
                if (diff > 0) {
                    prevGame.stages[i][name] = (prevGame.stages[i][name]?.length) ? [...prevGame.stages[i][name], object] : [object]
                } else {
                    prevGame.stages[i][name] = prevGame.stages[i][name].filter((t, i) => i < value)
                }
                return { ...prevGame }
            })
        } else {
            setGame(prevGame => {
                prevGame.stages[i][name] = value
                return { ...prevGame }
            })
        }

    }

    function onSubmitForm(ev) {
        ev.preventDefault()
    }

    function onHandleColorPick(color) {
        console.log('Selected color:', color); // Selected color: rgb(101, 42, 65)
    };

    return (
        <section className="admin rtl">
            <h2>יצירת משחק</h2>
            <form onSubmit={onSubmitForm} className="create-game">
                <label htmlFor="name">שם המשחק</label>
                <input type="text" name="name" id="name" value={game.name} onChange={onHandleChange} />

                <label htmlFor="dateStart">תאריך התחלה</label>
                <input type="date" name="dateStart" id="dateStart" value={game.dateStart} onChange={onHandleChange} />

                <label htmlFor="timeStart">שעת התחלה</label>
                <input type="time" name="timeStart" id="timeStart" value={game.timeStart} onChange={onHandleChange} />

                <label htmlFor="dateEnd">תאריך סיום</label>
                <input type="date" name="dateEnd" id="dateEnd" value={game.dateEnd} onChange={onHandleChange} />

                <label htmlFor="timeEnd">שעת סיום</label>
                <input type="time" name="tiemEnd" id="timeEnd" value={game.timeEnd} onChange={onHandleChange} />

                <label htmlFor="logo">לוגו</label>
                <input type="file" name="logo" id="logo" onChange={onChangeImg} />
                {game.logo && <img className="logo-img" src={game.logo.url} />}

                {game.colors && <ul className="colors">
                    {game.colors.map((color, i) => <li key={color}>
                        <input type="color" name="color1" id={`color${i + 1}`} value={color} />
                    </li>)}
                </ul>}

                {/* color picker on the logo image */}
                {/* {game.logo && <div className="img-color-picker-container">
                    <ImageColorPicker
                    onColorPick={onHandleColorPick}
                    imgSrc={game.logo.url}
                    zoom={1}
                    />
                </div>} */}

                <label htmlFor="teams">מספר הקבוצות</label>
                <input type="number" min="0" name="teams" id="teams" value={game.teams?.length || 0} onChange={onHandleChange} />

                {game.teams && <>
                    <label >שמות הקבוצות</label>
                    <ul className="teams">
                        {game.teams.map((team, i) => <li key={i}>
                            <label htmlFor="teamName">שם קבוצה  {i + 1}</label>
                            <input type="text" name="teamName" id="teamName" value={game.teams[i].name} onChange={() => onHandleTeamNameChange(event, i)} />
                        </li>)}
                    </ul>
                </>}

                <label htmlFor="guidelines">הנחיה לשחקנים לפני תחילת המשחק</label>
                <textarea name="guidelines" id="guidelines" value={game.guidelines} onChange={onHandleChange} cols="30" rows="5"></textarea>

                <label htmlFor="type">אופי המשחק</label>
                <select name="type" id="type" value={game.type} onChange={onHandleChange} >
                    <option value="open">פתוח</option>
                    <option value="onTime">לפי זמנים</option>
                    <option value="onProgress">לפי התקדמות</option>
                </select>

                <label htmlFor="stages">מספר שלבי המשחק</label>
                <input type="number" min="0" name="stages" id="stages" value={game.stages?.length || 0} onChange={onHandleChange} />

                {game.stages && <>
                    <span className="stages" >שלבי המשחק</span>
                    <ul className="stages">
                        {game.stages.map((stage, i) => <li key={i}>
                            <span className="stages">שלב  {i + 1}</span>

                            {game.type === 'onTime' && <>
                                <label htmlFor="time">כמה זמן מוגדר לשלב (בשעות)</label>
                                <input type="number" name="time" id="time" value={game.stages[i].time} onChange={() => onHandleStageChange(event, i)} />
                            </>}

                            <label htmlFor="questions">כמה שאלות יש בשלב</label>
                            <input type="number" min="0" name="questions" id="questions" value={game.stages.questions?.length} onChange={() => onHandleStageChange(event, i)} />

                            <label htmlFor="numOfMistakes">כמה טעויות מותר</label>
                            <input type="number" min="0" max={game.stages[i].questions?.length} name="numOfMistakes" id="numOfMistakes" value={game.stages[i].numOfMistakes} onChange={() => onHandleStageChange(event, i)} />

                            <label htmlFor="isRequired">האם השלב חובה?</label>
                            <input type="checkbox" name="isRequired" id="isRequired" value={game.stages[i].isRequired} onChange={() => onHandleStageChange(event, i)} />

                            <span className="" >הזנת השאלות</span>
                            <button>פתיחה</button>

                            {/* <label htmlFor=""></label> */}
                        </li>)}
                    </ul>
                </>}

            </form>
        </section>
    )
}