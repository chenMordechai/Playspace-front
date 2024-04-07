import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { prominent } from 'color.js'

import { gameService } from '../services/game.service.js'
import { utilService } from '../services/util.service.js'
import { getAdmins } from '../store/actions/auth.action.js'
import { addGame } from '../store/actions/game.action.js'

import { Colors } from '../cmps/Colors'
import { ActivityList } from '../cmps/ActivityList'

export function GameAdd() {

    const [game, setGame] = useState(gameService.getEmptyGame())
    const [openActivities, setOpenActivities] = useState(false)

    const [colorIdx, setColorIdx] = useState(0)
    const [logoColors, setLogoColors] = useState(null)
    const [openColorPicker, setOpenColorPicker] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [admins, setAdmins] = useState(null)

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedinUser?.isAdmin && !loggedinUser?.checkAdmin) navigate('/')
        loadAdmins()
    }, [])

    async function loadAdmins() {
        const admins = await getAdmins()
        setAdmins(admins)
    }

    useEffect(() => {
        console.log('game:', game)
    }, [game])

    useEffect(() => {
        // when the game colors changes => change the css vars
        const elRoot = document.querySelector(':root')
        game.themeColors.forEach((color, i) => {
            elRoot.style.setProperty(`--clr-${i}`, color);
        })
    }, [game.themeColors])

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

    async function onChangeImg(ev) {
        try {
            setIsLoading(true)
            const media = await utilService.uploadImgToCloudinary(ev)
            setGame(prevGame => ({ ...prevGame, logo: media }))
            getColorsFromImg(media.url)
        } catch (err) {
            console.log('err:', err)
        } finally {
            setIsLoading(false)
        }
    }

    // colors from image for the divs 
    async function getColorsFromImg(imgUrl) {
        const colors = await prominent(imgUrl, { format: 'hex', amount: 5, group: 100 })
        console.log(colors)
        setLogoColors([...colors])
    }

    // change game colors from color inputs 
    function onHandleChangeColor(ev) {
        const { value, name: idx } = ev.target

        setGame(prev => {
            prev.themeColors[idx] = value
            prev.themeColors = [...prev.themeColors]
            return { ...prev }
        })
    }

    // color from click on image or click on div
    function onHandleColorPick(color) {
        if (color.startsWith('rgb')) {
            const parts = color.substring(4, color.length - 1).split(', ')
            color = utilService.rgbToHex(...parts)
        }
        setColorIdx(prev => {
            if (prev === 2) return 0
            else return prev + 1
        })
        setGame(prev => {
            prev.themeColors[colorIdx] = color
            prev.themeColors = [...prev.themeColors]
            return { ...prev }
        })
    };

    function onHandleGroupNameChange(ev, i) {
        const { value } = ev.target
        setGame(prevGame => {
            prevGame.groups[i].name = value
            return { ...prevGame }
        })
    }

    function onHandleStageChange(ev, i) {
        let { value, name, type } = ev.target
        if (type === 'checkbox') value = ev.target.checked
        if (type === 'number') value = +value

        if (name === 'activities') {
            console.log('activities')
            const object = gameService.getEmptyActivity()
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

    async function onHandleActivityChange(ev, i, j) {
        let { value, name, type } = ev.target
        if (type === 'number') value = +value
        else if (type === 'file') value = await utilService.uploadImgToCloudinary(ev)
        else if (name === 'activityAswers') value = value.split(',')
        else if (name === 'lifeSaver') value = Array.from(ev.target.selectedOptions, option => option.value)

        if (i === undefined) { // game.activities
            setGame(prevGame => {
                prevGame.activities[j][name] = value
                return { ...prevGame }
            })
        } else { // game.stage.activities
            setGame(prevGame => {
                prevGame.stages[i].activities[j][name] = value
                return { ...prevGame }
            })
        }
    }

  async function onSubmitForm(ev) {
        ev.preventDefault()

        // groups id changes
        game.groups.forEach(group=>{
            group.id += game.name.substring(0,3)
        })
      
        // time changes
        const gameStartTime = new Date(game.dateStart +' '+game.timeStart).getTime()
        const gameEndTime = new Date(game.dateEnd +' '+game.timeEnd).getTime()
        game.gameStartTime = gameStartTime
        game.gameEndTime = gameEndTime

        if(game.activityProgressType === 'onTime'){
            if(game.gameType === 'activities'){
                game.activities.forEach(activity=>{
                const gameStartTime = new Date(activity.dateStart +' '+activity.timeStart).getTime()
                const gameEndTime = new Date( activity.dateEnd +' '+activity.timeEnd).getTime()
                activity.gameStartTime = gameStartTime
                activity.gameEndTime = gameEndTime
            })
            }else{
                game.stages.forEach(stage=>{
                    const gameStartTime = new Date(stage.dateStart +' '+stage.timeStart).getTime()
                    const gameEndTime = new Date(stage.dateEnd +' '+stage.timeEnd).getTime()
                    stage.gameStartTime = gameStartTime
                    stage.gameEndTime = gameEndTime
                    stage.activities.forEach(activity=>{
                        const gameStartTime = new Date( activity.dateStart +' '+activity.timeStart).getTime()
                        const gameEndTime = new Date(activity.dateEnd +' '+activity.timeEnd).getTime()
                        activity.gameStartTime = gameStartTime
                        activity.gameEndTime = gameEndTime
                    })
                })
        }
    }

    console.log('game:', game)

        const newGame = await addGame(game)
        // console.log('newGame:', newGame)
    }

    function onOpenActivities() {
        setOpenActivities(prev => !prev)
    }

    return (
        <section className="admin rtl">
            <h2>יצירת משחק</h2>

            <div className="first-clr">First</div>
            <div className="second-clr">Second</div>
            <div className="third-clr">Third</div>

            <form onSubmit={onSubmitForm} className="create-game">
                <label htmlFor="name">שם המשחק</label>
                <input required type="text" name="name" id="name" value={game.name} onChange={onHandleChange} />

                <label htmlFor="admins">אדמינים</label>
                <select required multiple name="admins" id="admins" value={game.admins} onChange={onHandleChange} >
                    {admins?.map(admin => <option key={admin.userId} value={admin.userId}>
                        {admin.name}
                    </option>)}
                </select>

                <label htmlFor="dateStart">תאריך התחלה</label>
                <input type="date" name="dateStart" id="dateStart" value={game.dateStart} onChange={onHandleChange} />

                <label htmlFor="timeStart">שעת התחלה</label>
                <input type="time" name="timeStart" id="timeStart" value={game.timeStart} onChange={onHandleChange} />

                <label htmlFor="dateEnd">תאריך סיום</label>
                <input type="date" name="dateEnd" id="dateEnd" value={game.dateEnd} onChange={onHandleChange} />

                <label htmlFor="timeEnd">שעת סיום</label>
                <input type="time" name="timeEnd" id="timeEnd" value={game.timeEnd} onChange={onHandleChange} />

                <Colors onChangeImg={onChangeImg} gameLogo={game.logo} gameColors={game.themeColors} logoColors={logoColors} onHandleChangeColor={onHandleChangeColor} onHandleColorPick={onHandleColorPick} openColorPicker={openColorPicker} setOpenColorPicker={setOpenColorPicker} isLoading={isLoading} />

                <label htmlFor="groups">מספר הקבוצות</label>
                <input type="number" min="0" name="groups" id="groups" value={game.groups?.length || 0} onChange={onHandleChange} />

                {game.groups && <>
                    <label >שמות הקבוצות</label>
                    <ul className="groups">
                        {game.groups.map((group, i) => <li key={group.id}>
                            <label htmlFor="groupName">קבוצה  {i + 1}</label>
                            <input type="text" name="teamName" id="groupName" value={group.name} onChange={() => onHandleGroupNameChange(event, i)} />
                        </li>)}
                    </ul>
                </>}

                <label htmlFor="messageBefore">הודעה לפני המשחק</label>
                <textarea name="messageBefore" id="messageBefore" value={game.messageBefore} onChange={onHandleChange} cols="30" rows="3"></textarea>

                <label htmlFor="messageAfter">הודעה אחרי המשחק</label>
                <textarea name="messageAfter" id="messageAfter" value={game.messageAfter} onChange={onHandleChange} cols="30" rows="3"></textarea>

                <label htmlFor="activityProgressType">אופי המשחק</label>
                <select name="activityProgressType" id="activityProgressType" value={game.activityProgressType} onChange={onHandleChange} >
                    <option value="open">פתוח</option>
                    <option value="onTime">לפי זמנים</option>
                    <option value="onProgress">לפי התקדמות</option>
                </select>

                <button onClick={() => setGame(prev => ({ ...prev, gameType: 'stages', activities: null }))}>משחק עם שלבים</button>
                <button onClick={() => setGame(prev => ({ ...prev, gameType: 'activities', stages: null }))}>משחק בלי שלבים</button>

                {game.gameType === "stages" && <>
                    <label htmlFor="stages">מספר שלבי המשחק</label>
                    <input type="number" min="0" name="stages" id="stages" value={game.stages?.length || 0} onChange={onHandleChange} />
                </>}

                {game.gameType === "stages" && game.stages?.length && <section className="stages-container">
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
                </section>}

                {game.gameType === "activities" && <section className="game-type-activities">

                    <label htmlFor="activities">מספר השאלות</label>
                    <input type="number" min="0" name="activities" id="activities" value={game.activities?.length || 0} onChange={onHandleChange} />

                    {game.activities && <ActivityList activities={game.activities} onHandleActivityChange={onHandleActivityChange} activityProgressType={game.activityProgressType} />}

                </section>}

                <button type="submit" className="btn-sumbit">Create Game</button>
            </form>
        </section >
    )
}

