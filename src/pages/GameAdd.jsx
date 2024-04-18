import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { prominent } from 'color.js'

import { gameService } from '../services/game.service.js'
import { utilService } from '../services/util.service.js'
import { getAdmins } from '../store/actions/auth.action.js'
import { addGame } from '../store/actions/game.action.js'

import { Colors } from '../cmps/Colors'
import { DateForm } from '../cmps/DateForm'
import { ActivityFormList } from '../cmps/ActivityFormList'
import { StagesFormList } from '../cmps/StagesFormList.jsx'
import loader from '../assets/img/loader.gif'

// game/add
export function GameAdd() {

    const [game, setGame] = useState(gameService.getEmptyGame())
    const [openActivities, setOpenActivities] = useState(false)
    const [colorIdx, setColorIdx] = useState(0)
    const [iconColors, setLogoColors] = useState(null)
    const [openColorPicker, setOpenColorPicker] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isImgLoading, setIsImgLoading] = useState(false)
    const [msgAfterGameAdd, setMsgAfterGameAdd] = useState('')
    const [admins, setAdmins] = useState(null)
    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)

    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedinUser?.isAdmin && !loggedinUser?.checkAdmin) navigate('/')
        // after admin login push the admin id to game.admins (default in the form)
        game.admins.push(loggedinUser.userId)
        loadAdmins()
    }, [])

    async function loadAdmins() {
        //! Avishai get admins
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
        } else if (name === 'groups') {
            const object = gameService.getEmptyGroup()
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
            setIsImgLoading(true)
            const media = await utilService.uploadImgToCloudinary(ev)
            setGame(prevGame => ({ ...prevGame, icon: media }))
            getColorsFromImg(media.url)
        } catch (err) {
            console.log('err:', err)
        } finally {
            setIsImgLoading(false)
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
        else if (name === 'activityAnswers') {
            value = value.split(',')
            if (value.length > 4) return
        }
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
        // game.groups?.forEach(group => {
        //     group.id += game.name.substring(0, 3)
        // })

        // time changes
        setTimesChanges(game)

        // work
        game.admins = game.admins.map(adminId => ({ adminId }))

        console.log('game:', game)

        try {
            setIsLoading(true)
            const newGame = await addGame(game)
            console.log('newGame:', newGame)
            setMsgAfterGameAdd('המשחק הוסף בהצלחה')
            setGame(gameService.getEmptyGame())
        } catch (err) {
            setMsgAfterGameAdd('שגיאה')
            console.log('err:', err)
        } finally {
            setIsLoading(false)

        }
    }

    function onOpenActivities() {
        setOpenActivities(prev => !prev)
    }

    function setTimesChanges(game) {
        const gameStartTimestamp = new Date(game.dateStart + ' ' + game.timeStart).getTime()
        const gameEndTimestamp = new Date(game.dateEnd + ' ' + game.timeEnd).getTime()
        game.gameStartTimestamp = gameStartTimestamp || 0
        game.gameEndTimestamp = gameEndTimestamp || 0
        delete game.dateStart
        delete game.timeStart
        delete game.dateEnd
        delete game.timeEnd

        if (game.activityProgressType === 'onTime') {
            if (game.gameType === 'activities') {
                game.activities.forEach((activity, i) => {
                    const activityStartTimestamp = new Date(activity.dateStart + ' ' + activity.timeStart).getTime()
                    const activityEndTimestamp = new Date(activity.dateEnd + ' ' + activity.timeEnd).getTime()
                    activity.activityStartTimestamp = activityStartTimestamp || 0
                    activity.activityEndTimestamp = activityEndTimestamp || 0
                    delete activity.dateStart
                    delete activity.timeStart
                    delete activity.dateEnd
                    delete activity.timeEnd
                })
            } else {
                game.stages.forEach(stage => {
                    const stageStartTimestamp = new Date(stage.dateStart + ' ' + stage.timeStart).getTime()
                    const stageEndTimestamp = new Date(stage.dateEnd + ' ' + stage.timeEnd).getTime()
                    stage.stageStartTimestamp = stageStartTimestamp || 0
                    stage.stageEndTimestamp = stageEndTimestamp || 0
                    delete stage.dateStart
                    delete stage.timeStart
                    delete stage.dateEnd
                    delete stage.timeEnd
                    stage.activities.forEach(activity => {
                        const activityStartTimestamp = new Date(activity.dateStart + ' ' + activity.timeStart).getTime()
                        const activityEndTimestamp = new Date(activity.dateEnd + ' ' + activity.timeEnd).getTime()
                        activity.activityStartTimestamp = activityStartTimestamp || 0
                        activity.activityEndTimestamp = activityEndTimestamp || 0
                        delete activity.dateStart
                        delete activity.timeStart
                        delete activity.dateEnd
                        delete activity.timeEnd
                    })
                })
            }
        }
    }

    function setGameTypeToStage() {
        setGame(prev => ({ ...prev, gameType: 'stages', activities: null, stages: [gameService.getEmptyStage()] }))
    }

    function setGameTypeToActivity() {
        setGame(prev => ({ ...prev, gameType: 'activities', stages: null, activities: [gameService.getEmptyActivity()] }))
    }

    function onAddActivity() {
        setGame(prev => ({ ...prev, activities: [...prev.activities, gameService.getEmptyActivity()] }))
    }

    function onAddStage() {
        setGame(prev => ({ ...prev, stages: [...prev.stages, gameService.getEmptyStage()] }))
    }

    function onRemoveActivity(activityIdx, stageIdx) {
        if (stageIdx !== undefined) {
            setGame(prev => ({
                ...prev, stages: [...prev.stages.map((s, idx) => {
                    if (idx === stageIdx) {
                        s.activities = s.activities.filter((a, idx) => idx !== activityIdx)
                    }
                    return s
                })]
            }))
        } else {
            if (game.activities.length === 1) return
            setGame(prev => ({ ...prev, activities: [...prev.activities.filter((a, idx) => idx !== activityIdx)] }))
        }
    }

    function onRemoveStage(i) {
        if (game.stages.length === 1) return
        setGame(prev => ({ ...prev, stages: [...prev.stages.filter((s, idx) => idx !== i)] }))
    }

    function onAddActivityToStage(i) {
        setGame(prev => ({
            ...prev, stages: [...prev.stages.map((s, idx) => {
                if (idx === i) {
                    s.activities.push(gameService.getEmptyActivity())
                }
                return s
            })]
        }))

    }

    return (
        <section className="game-add rtl">
            <h2>יצירת משחק</h2>

            <div className="clr1">First</div>
            <div className="clr2">Second</div>
            <div className="clr3">Third</div>

            <form onSubmit={onSubmitForm} className="create-game">
                <label htmlFor="name">שם המשחק</label>
                <input required type="text" name="name" id="name" value={game.name} onChange={onHandleChange} />

                <label htmlFor="admins">אדמינים</label>
                <select required multiple name="admins" id="admins" value={game.admins} onChange={onHandleChange} >
                    {admins?.map(admin => <option key={admin.userId} value={admin.userId}>
                        {admin.name}
                    </option>)}
                </select>

                <DateForm obj={game} onHandleChange={onHandleChange} />
                <Colors onChangeImg={onChangeImg} gameLogo={game.icon} gameColors={game.themeColors} iconColors={iconColors} onHandleChangeColor={onHandleChangeColor} onHandleColorPick={onHandleColorPick} openColorPicker={openColorPicker} setOpenColorPicker={setOpenColorPicker} isImgLoading={isImgLoading} />

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

                <label htmlFor="textBefore">הודעה לפני המשחק</label>
                <textarea name="textBefore" id="textBefore" value={game.textBefore} onChange={onHandleChange} cols="30" rows="3"></textarea>

                <label htmlFor="textAfter">הודעה אחרי המשחק</label>
                <textarea name="textAfter" id="textAfter" value={game.textAfter} onChange={onHandleChange} cols="30" rows="3"></textarea>

                <label htmlFor="activityProgressType">אופי המשחק</label>
                <select name="activityProgressType" id="activityProgressType" value={game.activityProgressType} onChange={onHandleChange} >
                    <option value="open">פתוח</option>
                    <option value="onTime">לפי זמנים</option>
                    <option value="onProgress">לפי התקדמות</option>
                </select>

                <button type="button" className={game.gameType === 'stages' ? 'purple-btn' : ''} onClick={setGameTypeToStage}>משחק עם שלבים</button>
                <button type="button" className={game.gameType === 'activities' ? 'purple-btn' : ''} onClick={setGameTypeToActivity}>משחק בלי שלבים</button>


                {game.gameType === "stages" &&
                    <section className="stages-container">
                        <StagesFormList stages={game.stages} activityProgressType={game.activityProgressType} onHandleStageChange={onHandleStageChange} onOpenActivities={onOpenActivities} openActivities={openActivities} onHandleActivityChange={onHandleActivityChange} onRemoveStage={onRemoveStage} onRemoveActivity={onRemoveActivity} onAddActivityToStage={onAddActivityToStage} />
                        <button type="button" className="add-stage" onClick={onAddStage}>הוסף שלב</button>
                    </section>}

                {game.gameType === "activities" &&
                    <section className="activities-container">
                        {game.activities && <ActivityFormList activities={game.activities} onHandleActivityChange={onHandleActivityChange} activityProgressType={game.activityProgressType} onRemoveActivity={onRemoveActivity} />}
                        <button type="button" className="add-activity" onClick={onAddActivity}>הוסף שאלה</button>
                    </section>}

                {!isLoading && <button type="submit" className="btn-sumbit">Create Game</button>}
                {isLoading && !msgAfterGameAdd && <img className="game-add-loader" src={loader} />}
                {!isLoading && msgAfterGameAdd && <span className="msg-after-game-add">{msgAfterGameAdd}</span>}

            </form>
        </section >
    )
}

