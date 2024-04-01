import { useEffect, useState } from 'react'
import { prominent } from 'color.js'

import { gameService } from '../services/game.service.js'
import { utilService } from '../services/util.service.js'

export function Admin() {

    const [game, setGame] = useState(gameService.getEmptyGame())

    useEffect(() => {
        console.log('game:', game)

        // const date = new Date("2024-04-02 11:00")
        // console.log('date:', date.getTime())
        if (game.logo) {
            console.log(game.logo)
        }

    }, [game])

    function onHandleChange(ev) {
        const { name, value } = ev.target
        setGame(prevGame => ({ ...prevGame, [name]: value }))
    }

    async function onChangeImg(ev) {
        console.log('onChangeImg')
        try {
            // setIsLoading(true)
            const media = await utilService.uploadImgToCloudinary(ev)
            console.log('media:', media)
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

    function onSubmitForm(ev) {
        ev.preventDefault()
    }

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

                {game.colors.length && <ul className="colors">
                    {game.colors.map((color, i) => <li>
                        <input type="color" name="color1" id={`color${i + 1}`} value={color} />
                    </li>)}
                </ul>}


            </form>
        </section>
    )
}