import { useState, useEffect } from "react"
import { useParams,Link } from "react-router-dom"
import { useSelector } from 'react-redux'

import { gameService } from '../services/game.service.js'
import { getGameById } from '../store/actions/game.action.js'

import { Colors } from '../cmps/Colors'
import { ActivityList } from '../cmps/ActivityList'


export function GameEdit (){
    const [game, setGame] = useState(gameService.getEmptyGame())
    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)

    const { gameId } = useParams()

    useEffect(() => {
        if (!loggedinUser?.isAdmin && !loggedinUser?.checkAdmin) navigate('/')
        console.log('gameId:', gameId)
        init()
    }, [])

    async function init() {
        try {
            const game = await getGameById(gameId)
            console.log('game:', game)
            setGame(game)
        } catch (err) {
            console.log('err:', err)
        }
    }

    function onHandleChange(ev) {
        let { name, value, type } = ev.target
        if (type === 'number') value = +value
        if (type === 'checkbox') value = ev.target.checked
        if (name === 'admins') value = Array.from(ev.target.selectedOptions, option => option.value)

        if (name === 'gameType') {
            value = (value) ? 'stages' : 'activities'
            setGame(prevGame => ({ ...prevGame, [name]: value }))
        } else if (name === 'groups' || name === 'stages' || name === 'activities') {
            const object = name === 'groups' ? gameService.getEmptyGroup() : name === 'stages' ? gameService.getEmptyStage() : gameService.getEmptyActivity()
            setGame(prevGame => {
                const diff = value - (prevGame[name]?.length || 0)
                if (diff > 0) return { ...prevGame, [name]: (prevGame[name]?.length) ? [...prevGame[name], object] : [object] }
                else return { ...prevGame, [name]: prevGame[name].filter((t, i) => i < value) }
            })
        } else {
            setGame(prevGame => ({ ...prevGame, [name]: value }))
        }
    }

    function onSubmitForm(ev){
        ev.preventDefault()

    }
    return (
        <section className="game-add rtl">
            <h2>עריכת משחק</h2>

            <div className="first-clr">First</div>
            <div className="second-clr">Second</div>
            <div className="third-clr">Third</div>

            <form onSubmit={onSubmitForm} className="create-game">
                <label htmlFor="name">שם המשחק</label>
                <input required type="text" name="name" id="name" value={game.name} onChange={onHandleChange} />

                <label htmlFor="dateStart">תאריך התחלה</label>
                <input type="date" name="dateStart" id="dateStart" value={game.dateStart} onChange={onHandleChange} />

                <label htmlFor="timeStart">שעת התחלה</label>
                <input type="time" name="timeStart" id="timeStart" value={game.timeStart} onChange={onHandleChange} />

                <label htmlFor="dateEnd">תאריך סיום</label>
                <input type="date" name="dateEnd" id="dateEnd" value={game.dateEnd} onChange={onHandleChange} />

                <label htmlFor="timeEnd">שעת סיום</label>
                <input type="time" name="timeEnd" id="timeEnd" value={game.timeEnd} onChange={onHandleChange} />

                {/* <Colors onChangeImg={onChangeImg} gameLogo={game.logo} gameColors={game.themeColors} logoColors={logoColors} onHandleChangeColor={onHandleChangeColor} onHandleColorPick={onHandleColorPick} openColorPicker={openColorPicker} setOpenColorPicker={setOpenColorPicker} isLoading={isLoading} /> */}

                {/* <label htmlFor="groups">מספר הקבוצות</label>
                <input type="number" min="0" name="groups" id="groups" value={game.groups?.length || 0} onChange={onHandleChange} />

                {game.groups && <>
                    <label >שמות הקבוצות</label>
                    <ul className="groups">
                        {game.groups.map((group, i) => <li key={group.id}>
                            <label htmlFor="groupName">קבוצה  {i + 1}</label>
                            <input type="text" name="teamName" id="groupName" value={group.name} onChange={() => onHandleGroupNameChange(event, i)} />
                        </li>)}
                    </ul>
                </>} */}

                {/* <label htmlFor="messageBefore">הודעה לפני המשחק</label>
                <textarea name="messageBefore" id="messageBefore" value={game.messageBefore} onChange={onHandleChange} cols="30" rows="3"></textarea>

                <label htmlFor="messageAfter">הודעה אחרי המשחק</label>
                <textarea name="messageAfter" id="messageAfter" value={game.messageAfter} onChange={onHandleChange} cols="30" rows="3"></textarea>

                <label htmlFor="activityProgressType">אופי המשחק</label>
                <select name="activityProgressType" id="activityProgressType" value={game.activityProgressType} onChange={onHandleChange} >
                    <option value="open">פתוח</option>
                    <option value="onTime">לפי זמנים</option>
                    <option value="onProgress">לפי התקדמות</option>
                </select> */}
{/* 
                <button onClick={() => setGame(prev => ({ ...prev, gameType: 'stages', activities: null }))}>משחק עם שלבים</button>
                <button onClick={() => setGame(prev => ({ ...prev, gameType: 'activities', stages: null }))}>משחק בלי שלבים</button>

                {game.gameType === "stages" && <>
                    <label htmlFor="stages">מספר שלבי המשחק</label>
                    <input type="number" min="0" name="stages" id="stages" value={game.stages?.length || 0} onChange={onHandleChange} />
                </>} */}

                {/* {game.gameType === "stages" && game.stages?.length && <section className="stages-container">
                    <span className="stages" >שלבי המשחק</span>
                    <ul className="stages">
                        {game.stages.map((stage, i) => <li key={i}>
                            <span className="stages">שלב  {i + 1}</span>

                            <label htmlFor="name">שם השלב</label>
                            <input type="text" name="name" id="name" value={stage.name} onChange={() => onHandleStageChange(event, i)} />

                            {game.activityProgressType === 'onTime' && <>
                                <label htmlFor="dateStart">תאריך התחלה</label>
                                <input type="date" name="dateStart" id="dateStart" value={stage.dateStart} onChange={() => onHandleStageChange(event, i)} />

                                <label htmlFor="timeStart">שעת התחלה</label>
                                <input type="time" name="timeStart" id="timeStart" value={stage.timeStart} onChange={() => onHandleStageChange(event, i)} />

                                <label htmlFor="dateEnd">תאריך סיום</label>
                                <input type="date" name="dateEnd" id="dateEnd" value={stage.dateEnd} onChange={() => onHandleStageChange(event, i)} />

                                <label htmlFor="timeEnd">שעת סיום</label>
                                <input type="time" name="timeEnd" id="timeEnd" value={stage.timeEnd} onChange={() => onHandleStageChange(event, i)} />
                            </>}

                            <label htmlFor="activities">כמה שאלות יש בשלב</label>
                            <input type="number" min="0" name="activities" id="activities" value={stage.activities?.length || 0} onChange={() => onHandleStageChange(event, i)} />

                            <label htmlFor="maxError">כמה טעויות מותר</label>
                            <input type="number" min="0" max={stage.activities?.length} name="maxError" id="maxError" value={stage.maxError} onChange={() => onHandleStageChange(event, i)} />

                            <label htmlFor="isRequired">האם השלב חובה?</label>
                            <input type="checkbox" name="isRequired" id="isRequired" value={stage.isRequired} onChange={() => onHandleStageChange(event, i)} />

                            <label htmlFor="messageBefore">הודעה לפני השלב</label>
                            <textarea name="messageBefore" id="messageBefore" value={stage.messageBefore} onChange={() => onHandleStageChange(event, i)} cols="30" rows="3"></textarea>

                            <label htmlFor="messageAfter">הודעה אחרי השלב</label>
                            <textarea name="messageAfter" id="messageAfter" value={stage.messageAfter} onChange={() => onHandleStageChange(event, i)} cols="30" rows="3"></textarea>

                            <span>הזנת השאלות</span>
                            <button onClick={onOpenActivities}>{openActivities ? 'סגירה' : 'פתיחה'}</button>

                            {openActivities && <ActivityList activities={stage.activities} onHandleActivityChange={onHandleActivityChange} activityProgressType={game.activityProgressType} i={i} />}
                        </li>)}
                    </ul>
                </section>} */}

                {/* {game.gameType === "activities" && <section className="game-type-activities">

                    <label htmlFor="activities">מספר השאלות</label>
                    <input type="number" min="0" name="activities" id="activities" value={game.activities?.length || 0} onChange={onHandleChange} />

                    {game.activities && <ActivityList activities={game.activities} onHandleActivityChange={onHandleActivityChange} activityProgressType={game.activityProgressType} />}

                </section>} */}

                <button type="submit" className="btn-sumbit">Create Game</button>
            </form>
        </section>
    )
}