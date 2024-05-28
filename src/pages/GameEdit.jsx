
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
            console.log('game:', game)
            setGameFormChanges(game)

        } catch (err) {
            console.log('err:', err)
        }
    }

    async function loadAdmins() {
        const admins = await getAdmins()
        console.log('admins:', admins)
        setAdmins(admins)
    }

    // adit
    function setGameFormChanges(game) {
        if (!firstLoad.current) return
        // admins
        game.admins = game.admins.map(admin => admin.adminId)

        // times
        utilService.setTimesFormChanges(game)

        // icon colors
        getColorsFromImg(game?.icon?.url)

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
        console.log('onChangeImg')
        try {
            setIsImgLoading(true)
            const media = await utilService.uploadImgToCloudinary(ev, game.id, true)
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
        if (!imgUrl) return
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
        else if (type === 'number') value = +value

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
        else if (type === 'checkbox') value = ev.target.checked
        else if (type === 'file') value = await utilService.uploadImgToCloudinary(ev, game.id, true)
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
        const gameToSend = { ...game }

        // time changes
        utilService.setTimesChangeToTimestamp(gameToSend)
        console.log('gameeee:', gameToSend)

        // adminsId to objects
        gameToSend.admins = gameToSend.admins.map(adminId => ({ adminId }))

        console.log('gameToSend:', gameToSend)

        try {
            setIsLoading(true)
            const newGame = await addGame(gameToSend)
            console.log('newGame:', newGame)
            setMsgAfterGameAdd('המשחק נערך בהצלחה')
            navigate('/admin')
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


    if (!game) return ''
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
                    {admins?.map((admin, i) => <option key={i} value={admin.id}>
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
                        {game.groups.map((group, i) => <li key={i}>
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
                <span>{game.activityProgressType}</span>
                {/* <select name="activityProgressType" id="activityProgressType" value={game.activityProgressType} onChange={onHandleChange} >
                    <option value="open">פתוח</option>
                    <option value="onTime">לפי זמנים</option>
                    <option value="onProgress">לפי התקדמות</option>
                </select> */}

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

