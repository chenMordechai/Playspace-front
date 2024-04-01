import { useEffect, useState } from 'react'

import { gameService } from '../services/game.service.js'

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
                <input type="file" name="logo" id="logo" value={game.logo} onChange={onChangeImg} />

                <label htmlFor="color1">צבע 1</label>
                <input type="color" name="color1" id="color1" value={game.colors[0]} onChange={onHandleChange} />

                <label htmlFor="color2">צבע 2</label>
                <input type="color" name="color2" id="color2" value={game.colors[1]} onChange={onHandleChange} />

            </form>
        </section>
    )
}