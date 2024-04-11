import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { prominent } from 'color.js'

import { gameService } from '../services/game.service.js'
import { utilService } from '../services/util.service.js'
import { getAdmins } from '../store/actions/auth.action.js'
import { addGame } from '../store/actions/game.action.js'

import { Colors } from '../cmps/Colors'
import { ActivityFormList } from '../cmps/ActivityFormList'
import { StagesFormList } from '../cmps/StagesFormList.jsx'

// game/add
export function GameAdd() {

    const [game, setGame] = useState(gameService.getEmptyGame())
    const [openActivities, setOpenActivities] = useState(false)

    const [colorIdx, setColorIdx] = useState(0)
    const [iconColors, setLogoColors] = useState(null)
    const [openColorPicker, setOpenColorPicker] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [admins, setAdmins] = useState(null)

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    const navigate = useNavigate()

    useEffect(() => {
        // if (!loggedinUser?.isAdmin && !loggedinUser?.checkAdmin) navigate('/')
        //! Chen - after admin login push the admin id to game.admins (default in the form)
        // if (loggedinUser) game.admins.push(loggedinUser) 
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
        // game.groups?.forEach(group => {
        //     group.id += game.name.substring(0, 3)
        // })

        // time changes
        const gameStartTimestamp = new Date(game.dateStart + ' ' + game.timeStart).getTime()
        const gameEndTimestamp = new Date(game.dateEnd + ' ' + game.timeEnd).getTime()
        game.gameStartTimestamp = gameStartTimestamp
        game.gameEndTimestamp = gameEndTimestamp

        if (game.activityProgressType === 'onTime') {
            if (game.gameType === 'activities') {
                game.activities.forEach(activity => {
                    const activityStartTimestamp = new Date(activity.dateStart + ' ' + activity.timeStart).getTime()
                    const activityEndTimestamp = new Date(activity.dateEnd + ' ' + activity.timeEnd).getTime()
                    activity.activityStartTimestamp = activityStartTimestamp
                    activity.activityEndTimestamp = activityEndTimestamp
                })
            } else {
                game.stages.forEach(stage => {
                    const stageStartTimestamp = new Date(stage.dateStart + ' ' + stage.timeStart).getTime()
                    const stageEndTimestamp = new Date(stage.dateEnd + ' ' + stage.timeEnd).getTime()
                    stage.stageStartTimestamp = stageStartTimestamp
                    stage.stageEndTimestamp = stageEndTimestamp
                    stage.activities.forEach(activity => {
                        const activityStartTimestamp = new Date(activity.dateStart + ' ' + activity.timeStart).getTime()
                        const activityEndTimestamp = new Date(activity.dateEnd + ' ' + activity.timeEnd).getTime()
                        activity.activity.StartTimestamp = activityStartTimestamp
                        activity.activity.EndTimestamp = activityEndTimestamp
                    })
                })
            }
        }

        console.log('game:', game)

        //! Avishai add game
        const newGame = await addGame(game)
        console.log('newGame:', newGame)
    }

    function onOpenActivities() {
        setOpenActivities(prev => !prev)
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
                <select multiple name="admins" id="admins" value={game.admins} onChange={onHandleChange} >
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

                <Colors onChangeImg={onChangeImg} gameLogo={game.icon} gameColors={game.themeColors} iconColors={iconColors} onHandleChangeColor={onHandleChangeColor} onHandleColorPick={onHandleColorPick} openColorPicker={openColorPicker} setOpenColorPicker={setOpenColorPicker} isLoading={isLoading} />

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

                <button type="button" onClick={() => setGame(prev => ({ ...prev, gameType: 'stages', activities: null }))}>משחק עם שלבים</button>
                <button type="button" onClick={() => setGame(prev => ({ ...prev, gameType: 'activities', stages: null }))}>משחק בלי שלבים</button>

                {game.gameType === "stages" && <>
                    <label htmlFor="stages">מספר שלבי המשחק</label>
                    <input type="number" min="0" name="stages" id="stages" value={game.stages?.length || 0} onChange={onHandleChange} />
                </>}

                {game.gameType === "stages" && game.stages?.length && <section className="stages-container">
                    <StagesFormList stages={game.stages} activityProgressType={game.activityProgressType} onHandleStageChange={onHandleStageChange} onOpenActivities={onOpenActivities} openActivities={openActivities} onHandleActivityChange={onHandleActivityChange} />
                </section>}

                {game.gameType === "activities" && <section className="game-type-activities">

                    <label htmlFor="activities">מספר השאלות</label>
                    <input type="number" min="0" name="activities" id="activities" value={game.activities?.length || 0} onChange={onHandleChange} />

                    {game.activities && <ActivityFormList activities={game.activities} onHandleActivityChange={onHandleActivityChange} activityProgressType={game.activityProgressType} />}

                </section>}

                <button type="submit" className="btn-sumbit">Create Game</button>
            </form>
        </section >
    )
}


// {
//     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6", // back
//     "name": "string", // front v
//     "createdDate": 0, // back
//     "updatedDate": 0, // back
//     "isDeleted": true, // back
//     "activities": [ // game without stages
//       {
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6", // back
//         "name": "string", // front
//         "isDeleted": true, // back
//         "activityType": 0, // front
//         "timeToRespond": 0, // front
//         "activityStartTimestamp": 0, // front
//         "activityEndTimestamp": 0, // front
//         "pointsValue": 2147483647, // front
//         "maxError": 0, // front
//         "correctAnswerId": 0, // front
//         "activityAswers": "string",  // front
//         "mediaBefore": "string", // front
//         "mediaIdAfter": "string", // front
//         "testBefore": "string", // front
//         "testAfter": "string" // front
//       }
//     ],
//     "stages": null,
//     "gameStartTimestamp": 0, // front
//     "gameEndTimestamp": 0, // front
//     "groups": [ // front
//         {
//           "id": 0, // front
//           "name": "string", // front
//           "additionalScore": 0 // front
//         }
//       ],
//     "themeColors": ['#','#','#'] // front
//     "iconId": "string", // ? iconUrl?
//     "description": "string", // front
//     "gameType": 0, // front
//     "activityProgressType": 0, // front
//     "admins": [ // front + back
//       {
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "adminId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "gameId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "isDeleted": true
//       }
//     ],
//     "textBefore": "string", // front
//     "textAfter": "string", // front
//   }



// {
//
//     "activities":null,
//     "stages": [ // game with stages
//       {
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6", // back
//         "name": "string", // front
//         "activities": [
//           "string" // front + back - object!
//         ],
//         "textBefore": "string", // front
//         "textAfter": "string", // front
//         "stageStartDate": 0, // front
//         "stageEndDate": 0, // front
//         "maxError": 0 // front
//       }
//     ],
// }