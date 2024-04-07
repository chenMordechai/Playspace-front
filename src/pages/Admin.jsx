import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { prominent } from 'color.js'

import { gameService } from '../services/game.service.js'
import { utilService } from '../services/util.service.js'
import {getAdmins} from '../store/actions/auth.action.js'

import { Colors } from '../cmps/Colors'

export function Admin() {

    const [game, setGame] = useState(gameService.getEmptyGame())
    const [openActivities, setOpenActivities] = useState(false)

    const [colorIdx, setColorIdx] = useState(0)
    const [logoColors, setLogoColors] = useState(null)
    const [openColorPicker, setOpenColorPicker] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [admins , setAdmins] = useState(null)
console.log('admins:', admins)
   
    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    const navigate = useNavigate()

    useEffect(()=>{
        loadAdmins()
    },[])
    
  async function loadAdmins(){
        const admins = await getAdmins()
        setAdmins(admins)
    }

    useEffect(() => {
        if (!loggedinUser?.isAdmin && !loggedinUser?.checkAdmin) navigate('/')
        // const date = new Date("2024-04-02 11:00")
        // console.log('date', date)
        // console.log('date:', date.getTime())
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
        if (type === 'checkbox')  value = ev.target.checked
        if (name === 'admins') value = Array.from(ev.target.selectedOptions, option => option.value)
    
        if(name === 'gameType'){
            value = (value)? 'stages' :'activities'
            setGame(prevGame => ({ ...prevGame, [name]: value }))
        }else if (name === 'groups' || name === 'stages') {
            const object = name === 'groups' ? gameService.getEmptyGroup() : gameService.getEmptyStage()
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

        setGame(prevGame => {
            prevGame.stages[i].activities[j][name] = value
            return { ...prevGame }
        })

    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        // change time to timestamp 
        // const strGameStartTime = gameTime.dateStart +' ' + gameTime.timeStart
        // const strGameEndTime = gameTime.dateEnd +' ' + gameTime.timeEnd
        // const gameStartTime =new Date(strGameStartTime).getTime()
        // const gameEndTime = new Date(strGameEndTime).getTime()
        // setGame(prevGame=> ({...prevGame, gameStartTime,gameEndTime}))

        // const strStageStartTime = stageTime.dateStart +' ' + stageTime.timeStart
        // const strStageEndTime = stageTime.dateEnd +' ' + stageTime.timeEnd
        // const stageStartTime =new Date(strStageStartTime).getTime()
        // const stageEndTime = new Date(strStageEndTime).getTime()
        // setGame(prevGame=> ({...prevGame, stageStartTime,stageEndTime}))



        // check that the activity's scores is 100%
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
                <input type="text" name="name" id="name" value={game.name} onChange={onHandleChange} />

                <label htmlFor="admins">אדמינים</label>
                                    <select multiple name="admins" id="admins" value={game.admins} onChange={onHandleChange} >
                                            {admins.map(admin=><option value={admin.userId}>
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
                <textarea name="messageBefore" id="messageBefore" value={game.messageBefore} onChange={onHandleChange} cols="30" rows="5"></textarea>
                            
                <label htmlFor="messageAfter">הודעה אחרי המשחק</label>
                <textarea name="messageAfter" id="messageAfter" value={game.messageAfter} onChange={onHandleChange} cols="30" rows="5"></textarea>

                <label htmlFor="gameType">האם יש שלבים?</label>
                <input type="checkbox" name="gameType" id="gameType" value={game.gameType} onChange={onHandleChange} />

               { game.gameType === "stages" &&  <> 
               <label htmlFor="stages">מספר שלבי המשחק</label>
                <input type="number" min="0" name="stages" id="stages" value={game.stages?.length || 0} onChange={onHandleChange} />
                </>}
              
                <label htmlFor="activityProgressType">אופי המשחק</label>
                <select name="activityProgressType" id="activityProgressType" value={game.activityProgressType} onChange={onHandleChange} >
                    <option value="open">פתוח</option>
                    <option value="onTime">לפי זמנים</option>
                    <option value="onProgress">לפי התקדמות</option>
                </select>


                {game.gameType === "stages" && game.stages && <section className="stages-container">
                    <span className="stages" >שלבי המשחק</span>
                    <ul className="stages">
                        {game.stages.map((stage, i) => <li key={i}>
                            <span className="stages">שלב  {i + 1}</span>

                            <label htmlFor="name">שם השלב</label>
                            <input type="text" name="name" id="name" value={stage.name}onChange={() => onHandleStageChange(event, i)} />

                            {game.activityProgressType === 'onTime' && <>
                                {/* <label htmlFor="time">כמה זמן מוגדר לשלב (בשעות)</label>
                                <input type="number" min="0" name="time" id="time" value={stage.time || 0} onChange={() => onHandleStageChange(event, i)} /> */}
                               <label htmlFor="dateStart">תאריך התחלה</label>
                               <input type="date" name="dateStart" id="dateStart" value={stage.dateStart} onChange={() => onHandleStageChange(event, i)}  />

                               <label htmlFor="timeStart">שעת התחלה</label>
                               <input type="time" name="timeStart" id="timeStart" value={stage.timeStart} onChange={() => onHandleStageChange(event, i)}  />

                               <label htmlFor="dateEnd">תאריך סיום</label>
                               <input type="date" name="dateEnd" id="dateEnd" value={stage.dateEnd} onChange={() => onHandleStageChange(event, i)}  />

                               <label htmlFor="timeEnd">שעת סיום</label>
                               <input type="time" name="timeEnd" id="timeEnd" value={stage.timeEnd} onChange={() => onHandleStageChange(event, i)}  />
                            </>}

                            <label htmlFor="activities">כמה שאלות יש בשלב</label>
                            <input type="number" min="0" name="activities" id="activities" value={stage.activities?.length || 0} onChange={() => onHandleStageChange(event, i)} />

                            <label htmlFor="maxError">כמה טעויות מותר</label>
                            <input type="number" min="0" max={stage.activities?.length} name="maxError" id="maxError" value={stage.maxError} onChange={() => onHandleStageChange(event, i)} />

                            <label htmlFor="isRequired">האם השלב חובה?</label>
                            <input type="checkbox" name="isRequired" id="isRequired" value={stage.isRequired} onChange={() => onHandleStageChange(event, i)} />
                          
                            <label htmlFor="messageBefore">הודעה לפני השלב</label>
                            <textarea name="messageBefore" id="messageBefore" value={stage.messageBefore} onChange={() => onHandleStageChange(event, i)} cols="30" rows="5"></textarea>
                            
                            <label htmlFor="messageAfter">הודעה אחרי הלב</label>
                            <textarea name="messageAfter" id="messageAfter" value={stage.messageAfter} onChange={() => onHandleStageChange(event, i)} cols="30" rows="5"></textarea>

                            <span>הזנת השאלות</span>
                            <button onClick={onOpenActivities}>{openActivities ? 'סגירה' : 'פתיחה'}</button>

                            {openActivities && <ul className="activity">
                                {stage.activities?.map((activity, j) => <li key={j}>
                                    <span className="activity">שאלה {j + 1}</span>

                                    <label htmlFor="name">הטקסט</label>
                                    <input type="text" name="name" id="name" value={activity.name} onChange={() => onHandleActivityChange(event, i, j)} />

                                    <label htmlFor="activityType">סוג השאלה</label>
                                    <select name="activityType" id="activityType" value={activity.activityType} onChange={() => onHandleActivityChange(event, i, j)} >
                                        <option value="open">פתוחה</option>
                                        <option value="multiple">רב ברירה</option>
                                        <option value="yesno">נכון/לא נכון</option>
                                        <option value="typing">הקלדה</option>
                                    </select>

                                    {activity.activityType === "multiple" && <>
                                        <label htmlFor="activityAswers">האופציות לתשובה (א,ב,ג)</label>
                                        <input type="text" name="activityAswers" id="activityAswers" value={activity.activityAswers || ''} onChange={() => onHandleActivityChange(event, i, j)} />
                                    </>}

                                    <label htmlFor="answer">התשובה</label>
                                    <input type="text" name="answer" id="answer" value={activity.answer} onChange={() => onHandleActivityChange(event, i, j)} />

                                    <label htmlFor="pointsValue">ניקוד</label>
                                    <input type="number" min="0" name="pointsValue" id="pointsValue" value={activity.pointsValue} onChange={() => onHandleActivityChange(event, i, j)} />

                                    <label htmlFor="maxError">כמה טעויות מותר</label>
                                    <input type="number" min="0" max="10" name="maxError" id="maxError" value={activity.maxError} onChange={() =>  onHandleActivityChange(event, i, j)} />

                                    <label htmlFor="media">תוספת גרפית</label>
                                    <input type="file" name="media" id="media" onChange={() => onHandleActivityChange(event, i, j)} />

                                    {activity.media && <>
                                        <span>{activity.media.type}</span>
                                        <img className="media" src={activity.media.url} />
                                    </>}

                                    <label htmlFor="moreContent">תוספת מלל</label>
                                    <textarea name="moreContent" id="moreContent" value={activity.moreContent} onChange={() => onHandleActivityChange(event, i, j)} cols="30" rows="5"></textarea>

                                    <label htmlFor="lifeSaver">גלגלי הצלה</label>
                                    <select multiple name="lifeSaver" id="lifeSaver" value={activities.lifeSaver} onChange={() => onHandleActivityChange(event, i, j)} >
                                        {activity.activityType === 'multiple' && <option value="fifty">50/50</option>}
                                        <option value="moreTime">תוספת זמן</option>
                                        <option value="skip">דלג</option>
                                    </select>

                                    <label htmlFor="moreContentAfter">תוספת מלל לאחר שאלה</label>
                                    <textarea name="moreContentAfter" id="moreContentAfter" value={activity.moreContentAfter} onChange={() => onHandleActivityChange(event, i, j)} cols="30" rows="5"></textarea>
                                </li>)}
                            </ul>}
                        </li>)}
                    </ul>
                </section>}

                { game.gameType === "activities" && <section>
                    <h2>משחק בלי שלבים</h2>

                    </section>}

                <button type="submit">send</button>
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
//         "activityStartTime": 0, // front
//         "activityEndTime": 0, // front
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
//     "gameStartTime": 0, // front
//     "gameEndTime": 0, // front   
//     "groups": [ // front
//         {
//           "id": 0, // front
//           "name": "string", // front
//           "additionalScore": 0 // front
//         }
//       ],
//     "themeColors": ['#','#','#'] // front
//     "iconId": "string", // ? logoUrl?
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
//     "messageBefore": "string", // front
//     "messageAfter": "string", // front
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
//         "messageBefore": "string", // front
//         "messageAfter": "string", // front
//         "stageStartDate": 0, // front
//         "stageEndDate": 0, // front
//         "maxError": 0 // front
//       }
//     ],
// }