
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"
import { prominent } from 'color.js'

import { gameService } from '../services/game.service.js'
import { utilService } from '../services/util.service.js'
import { getAdmins } from '../store/actions/auth.action.js'
import { addGame, getGameById } from '../store/actions/game.action.js'

import { Colors } from '../cmps/Colors'
import { DateForm } from '../cmps/DateForm'
import { ActivityFormList } from '../cmps/ActivityFormList'
import { StagesFormList } from '../cmps/StagesFormList.jsx'
import loader from '../assets/img/loader.gif'

// game/add
export function GameEdit() {

    const [game, setGame] = useState(null)
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
    const { gameId } = useParams()
    const firstLoad = useRef(true)

    useEffect(() => {
        if (!loggedinUser?.isAdmin && !loggedinUser?.checkAdmin) navigate('/')
        init()
        loadAdmins()
    }, [])

    useEffect(() => {
        // when the game colors changes => change the css vars
        const elRoot = document.querySelector(':root')
        game?.themeColors.forEach((color, i) => {
            elRoot.style.setProperty(`--clr-${i}`, color);
        })
    }, [game?.themeColors])

    useEffect(() => {
        console.log('game:', game)
    }, [game])
    // adit
    async function init() {
        try {
            const game = await getGameById(gameId)
            setGameFormChanges(game)

        } catch (err) {
            console.log('err:', err)
        }
    }

    async function loadAdmins() {
        //! Avishai get admins
        const admins = await getAdmins()
        setAdmins(admins)
    }

    // adit
    function setGameFormChanges(game) {
        if (!firstLoad.current) return
        // admins
        game.admins = game.admins.map(admin => admin.adminId)

        // times
        setTimesFormChanges(game)

        // icon colors
        getColorsFromImg(game.icon.url)

        // activity answers
        setActivityAnswersForForm(game)

        firstLoad.current = false
        setGame(game)

    }

    // adit
    function setActivityAnswersForForm(game) {
        if (game.gameType === 'activities') {
            game.activities.forEach(activity => {
                if (activity.activityType === 'multiple') {
                    activity.activityAnswers = activity.activityAnswers.join(',')
                }
            })
        } else {
            game.stages.forEach(stage => {
                stage.activities.forEach(activity => {
                    if (activity.activityType === 'multiple') {
                        activity.activityAnswers = activity.activityAnswers.join(',')
                    }
                })
            })
        }
    }

    // adit
    function setTimesFormChanges(game) {

        changeTimestampToTime(game, game.gameStartTimestamp, game.gameEndTimestamp)

        if (game.activityProgressType === 'onTime') {
            if (game.gameType === 'activities') {
                game.activities.forEach((activity, i) => {
                    changeTimestampToTime(activity, activity.activityStartTimestamp, activity.activityEndTimestamp)
                })
            } else {
                game.stages.forEach(stage => {
                    changeTimestampToTime(stage, stage.stageStartTimestamp, stage.stageEndTimestamp)

                    stage.activities.forEach(activity => {
                        changeTimestampToTime(activity, activity.activityStartTimestamp, activity.activityEndTimestamp)
                    })
                })
            }
        }
    }

    // adit
    function changeTimestampToTime(object, startTimestamp, endTimestamp) {
        const dStart = new Date(startTimestamp)
        const dEnd = new Date(endTimestamp)
        object.dateStart = dStart.getFullYear() + '-' + pad(dStart.getMonth() + 1) + '-' + pad(dStart.getDate())
        object.timeStart = pad(dStart.getHours()) + ':' + pad(dStart.getMinutes())
        object.dateEnd = dEnd.getFullYear() + '-' + pad(dEnd.getMonth() + 1) + '-' + pad(dEnd.getDate())
        object.timeEnd = pad(dEnd.getHours()) + ':' + pad(dEnd.getMinutes())

    }

    // adit
    function pad(num) {
        return num < 10 ? '0' + num : num
    }

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
            setIsLoading(true)
            const media = await utilService.uploadImgToCloudinary(ev)
            setGame(prevGame => ({ ...prevGame, icon: media }))
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

        // times to timestamp:
        setTimesChanges(game)

        // adminsId to objects
        game.admins = game.admins.map(adminId => ({ adminId }))

        console.log('game:', game)

        try {
            setIsLoading(true)
            const newGame = await addGame(game)
            console.log('newGame:', newGame)
            setMsgAfterGameAdd('המשחק נערך בהצלחה')
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

    // function setGameTypeToStage() {
    //     setGame(prev => ({ ...prev, gameType: 'stages', activities: null, stages: [gameService.getEmptyStage()] }))
    // }

    function setGameTypeToActivity() {
        setGame(prev => ({ ...prev, gameType: 'activities', stages: null, activities: [gameService.getEmptyActivity()] }))
    }


    if (!game) return
    return (
        <section className="game-add rtl">
            <h2>עריכת משחק</h2>

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
                <span>{game.groups?.length}</span>

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

                {game.gameType === 'stages' && <h3>משחק עם שלבים</h3>}
                {game.gameType === 'activities' && <h3>משחק בלי שלבים</h3>}


                {game.gameType === "stages" &&
                    <section className="stages-container">
                        <StagesFormList stages={game.stages} activityProgressType={game.activityProgressType} onHandleStageChange={onHandleStageChange} onOpenActivities={onOpenActivities} openActivities={openActivities} onHandleActivityChange={onHandleActivityChange} isEdit={true} />
                    </section>}

                {game.gameType === "activities" &&
                    <section className="activities-container">
                        {game.activities && <ActivityFormList activities={game.activities} onHandleActivityChange={onHandleActivityChange} activityProgressType={game.activityProgressType} isEdit={true} />}
                    </section>}

                {!isLoading && <button type="submit" className="btn-sumbit">Edit Game</button>}
                {isLoading && !msgAfterGameAdd && <img className="game-add-loader" src={loader} />}
                {!isLoading && msgAfterGameAdd && <span className="msg-after-game-add">{msgAfterGameAdd}</span>}

            </form>
        </section >
    )
}

