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
import { toastService } from '../services/toast.service.js'
import GroupListEdit from '../cmps/GroupListEdit.jsx'
import GameGroupsEdit from '../cmps/GroupListEdit.jsx'


// game/add
export function GameAdd() {

    const [game, setGame] = useState(gameService.getEmptyGame())
    const [openActivities, setOpenActivities] = useState(false)
    // const [colorIdx, setColorIdx] = useState(0)
    const [iconColors, setIconColors] = useState(null)
    const [openColorPicker, setOpenColorPicker] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isImgLoading, setIsImgLoading] = useState(false)
    const [admins, setAdmins] = useState(null)
    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)

    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedinUser && !loggedinUser?.isAdmin) {
            // if (!loggedinUser && !loggedinUser?.isAdmin && !loggedinUser?.checkAdmin) {
            navigate('/')
            return
        }
        // after admin login push the admin id to game.admins (default in the form)
        setGame(prevGame => {
            // array of strings 
            prevGame.admins = []
            prevGame.admins.push(loggedinUser.id)
            return { ...prevGame }
        })
        loadAdmins()
    }, [])

    async function loadAdmins() {
        let admins = await getAdmins()
        setAdmins(admins)
    }

    useEffect(() => {
        console.log(game)
    }, [game])

    useEffect(() => {
        // When the game colors changes => change the css vars
        const elRoot = document.querySelector(':root')
        game.themeColors.forEach((color, i) => {
            elRoot.style.setProperty(`--clr-${i}`, color);
        })
    }, [game.themeColors])



    function onHandleChange(ev) {

        let { name, value, type } = ev.target
        console.log("🚀 ~ onHandleChange ~ name, value, type:", name, value, type)
        if (type === 'number') value = +value
        if (type === 'checkbox') value = ev.target.checked
        if (name === 'admins') value = Array.from(ev.target.selectedOptions, option => (option.value))

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

    const onAddGroup = () => {
        setGame(prevGame => {
            const hasGroups = (prevGame.groups?.length);
            return {
                ...prevGame,
                groups: (hasGroups) ? [...prevGame.groups, gameService.getEmptyGroup()] : [gameService.getEmptyGroup()]
            };
        });
    };

    const onRemoveGroup = () => {
        if (game.groups.length > 0) {
            setGame(prevGame => {
                const newGroups = [...prevGame.groups];
                newGroups.splice(-1, 1); // Remove the last element
                return {
                    ...prevGame,
                    groups: newGroups
                };
            });
        }
    };

    async function onChangeImg(ev) {
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
        const colors = await prominent(imgUrl, { format: 'hex', amount: 5, group: 100 })
        setIconColors([...colors])
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
        // setColorIdx(prev => {
        //     if (prev === 0) return 0
        //     else return prev + 1
        // })
        setGame(prev => {
            prev.themeColors[0] = color
            prev.themeColors = [...prev.themeColors]
            return { ...prev }
        })
    }

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
        } else if (name === 'lifeSavers') value = Array.from(ev.target.selectedOptions, option => option.value)

        if (i === undefined) { // game.activities
            setGame(prevGame => {
                prevGame.activities[j][name] = value
                console.log('prevGame:', prevGame)
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
        const gameToSend = { ...game }
        // setGame(prevGame => {
        //     utilService.setTimesChangeToTimestamp(prevGame)
        //     return { ...prevGame }
        // })
        utilService.setTimesChangeToTimestamp(gameToSend)

        // setGame(prevGame => {
        //     prevGame.admins = prevGame.admins.map(id => ({ adminId: id }))
        //     return { ...prevGame }
        // })
        gameToSend.admins = gameToSend.admins.map(adminId => ({ adminId }))

        setGame(gameToSend)

        try {
            setIsLoading(true)
            const newGame = await addGame(gameToSend)
            console.log('newGame:', newGame)
            toastService.toast.success('המשחק נוסף בהצלחה')
            navigate('/admin')
        } catch (err) {
            toastService.toast.error('שגיאה')
            console.log('err:', err)
            setGame(prevGame => {
                prevGame.admins = prevGame.admins.map(id => (id.adminId))
                return { ...prevGame }
            })
        } finally {
            setIsLoading(false)

        }
    }

    function onOpenActivities() {
        setOpenActivities(prev => !prev)
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

            <div className="clr1">צבע ראשי</div>

            <form onSubmit={onSubmitForm} className="create-game">
                <label htmlFor="name">שם המשחק</label>
                <input required type="text" name="name" id="name" value={game.name} onChange={onHandleChange} />

                <label htmlFor="admins">אדמינים</label>
                <select multiple required name="admins" id="admins" value={game.admins} onChange={onHandleChange} >
                    {admins?.map((admin, i) => <option key={i} value={admin.id}>
                        {admin.name}
                    </option>)}
                </select>

                <DateForm obj={game} onHandleChange={onHandleChange} />
                <Colors onChangeImg={onChangeImg} gameLogo={game.icon} gameColors={game.themeColors} iconColors={iconColors} onHandleChangeColor={onHandleChangeColor} onHandleColorPick={onHandleColorPick} openColorPicker={openColorPicker} setOpenColorPicker={setOpenColorPicker} isImgLoading={isImgLoading} />

                {/* <label htmlFor="groups">מספר הקבוצות</label>
                <input type="number" min="0" name="groups" id="groups" value={game.groups?.length || 0} onChange={onHandleChange} /> */}

                <GameGroupsEdit
                    groups={game.groups}
                    onHandleGroupNameChange={onHandleGroupNameChange}
                    onAddGroup={onAddGroup}
                    onRemoveGroup={onRemoveGroup}
                />

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
                        {game.activities && <ActivityFormList gameType={game.gameType} activities={game.activities} onHandleActivityChange={onHandleActivityChange} activityProgressType={game.activityProgressType} onRemoveActivity={onRemoveActivity} />}
                        <button type="button" className="add-activity" onClick={onAddActivity}>הוסף שאלה</button>
                    </section>}

                {!isLoading && <button type="submit" className="btn-sumbit">צור משחק</button>}
                {isLoading && <img className="game-add-loader" src={loader} />}

            </form>
        </section >
    )
}

