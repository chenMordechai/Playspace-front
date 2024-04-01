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
        console.log('game.teams.length:', game.teams?.length)

    }, [game])

    function onHandleChange(ev) {
        const { name, value } = ev.target
        if (name === 'numOfTeams') {
            setGame(prevGame => {
                const diff = value - (prevGame.teams?.length || 0)
                if (diff > 0) return { ...prevGame, teams: (prevGame.teams?.length) ? [...prevGame.teams, { name: '' }] : [{ name: '' }] }
                else return { ...prevGame, teams: prevGame.teams.filter((t, i) => i < value) }
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

                <label htmlFor="numOfTeams">מספר הקבוצות</label>
                <input type="number" name="numOfTeams" id="numOfTeams" value={game.teams?.length || 0} onChange={onHandleChange} />

                {game.teams && <ul className="teams">
                    {game.teams.map((team, i) => <li key={i}>
                        <label htmlFor="teamName">שם קבוצה  {i + 1}</label>
                        <input type="text" name="teamName" id="teamName" value={game.teams[i].name} onChange={() => onHandleTeamNameChange(event, i)} />
                    </li>)}
                </ul>}

            </form>
        </section>
    )
}