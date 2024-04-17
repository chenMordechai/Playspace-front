import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from 'react-redux'

import { authService } from '../services/auth.service'
import { signup, registerPlayerToGroup } from "../store/actions/auth.action"
import {Carousel} from '../cmps/Carousel'
import avatar1 from '../assets/img/avatar.jpg'
import avatar2 from '../assets/img/avatar2.png'

export function Signup() {
    const [credentials, setCredentials] = useState(authService.getEmptySignupCred())
    
    const [shallowGame, setShallowGame] = useState(null)
    const loggedinPlayer = useSelector(storeState => storeState.authModule.loggedinPlayer)

    const [groups, setGroups] = useState(null)

    const [step, setStep] = useState(0)

    const [groupIdToEdit, setGroupIdToEdit] = useState('')
    const [avatarToEdit, setAvatarToEdit] = useState('')

    const imgs = [avatar1,avatar2,avatar1,avatar2,avatar1,avatar2,avatar1,avatar2]
    // const { gameId, groupId } = useParams()
    const { gameId } = useParams()
    // let query = useQuery();

    useEffect(() => {
        // console.log('gameId:', gameId)
        setCredentials(prev => ({ ...prev, gameId }))
        // setCredentials(prev => ({ ...prev, gameId, groupId }))

        // Avishai get shallow game - colors,name
        getShallowGame() 
        // Avishai get groups by game id
        getGameGroups()

    }, [])

    function handleChange(ev) {
        let { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    async function onSubmitSignupForm(ev) {
        ev.preventDefault()
        try {
            // Avishai signup
            const player = await signup(credentials)

            console.log('success signup', player)
            if(player) setStep(prev=>prev+1)
            // if (!user.isAdmin) navigate('/home')
        } catch (error) {
            console.error('Error:', error);
        }

        // httpService.post('auth/Signup', credentials)
    }

    function getShallowGame(){

        const game = {
            name:'אלעל'
        }

        setShallowGame(game)

    }

    function getGameGroups() {
        const groups = [
            {
                id: "iw5k9",
                name: "קבוצה א",
                adminAdditionalScore: 0,
            },
            {
                id: "iw5k8",
                name: "קבוצה ב",
                adminAdditionalScore: 0,
            },
            {
                id: "iw5k6",
                name: "קבוצה ג",
                adminAdditionalScore: 0,
            },
        ]

        setGroups(groups)
    }

    function onSetPlayerGroup() {
        // console.log('groupId:', groupId)
        if (loggedinPlayer.groupId) return
        // Avishai register a player for the group
        registerPlayerToGroup(loggedinPlayer.id, groupIdToEdit)

        setStep(prev=>prev+1)
    }


    return (
        <section className="signup">

            {step ===0 && !loggedinPlayer && <section className="step-0">
            
            <h2 className="header">Welcome to spacegame</h2>

            <form onSubmit={onSubmitSignupForm} className="name-form">

                {/* <label htmlFor="name">Name:</label> */}
                <input placeholder="Tape your name" type="text" id="name" name="name" value={credentials.name} onChange={handleChange} required />

                {/* <label htmlFor="email">Email:</label> */}
                <input placeholder="Tape your email" type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />
                
                <button type="submit">Next</button>

            </form>
            </section>}

            {step === 1 && loggedinPlayer && shallowGame && groups && 
            <section className="step-1">
                {/* <h2>Welcome {loggedinPlayer.name}</h2> */}
                <h2>שם המשחק: {shallowGame.name}</h2>
                <div className="header">
                    <span>Choose a group</span>
                 </div>
                <ul className="groups-container">
                    {groups.map((group,i) => <li key={group.id}
                    className={`color-${i+1}`}
                        style={{ backgroundColor: (groupIdToEdit === group.id) ? 'red' : '' }}
                        onClick={() => setGroupIdToEdit(group.id)}>
                            {/* onclick=>update state */ }
                        {group.name}
                    </li>)}
                </ul>
{/* onclick=> save the group and move to next step */}
                <button onClick={onSetPlayerGroup}>Next</button>

                {/* {loggedinPlayer.groupId &&
                    <Link to={`/game/${credentials.gameId}`}>כניסה למשחק</Link>} */}
            </section>}

            {step === 2 && groupIdToEdit && <section className="step-2">
                <div className="header">
                    <span>Choose an avater</span>
                    <label htmlFor="avatar">+</label>
                    <input type="file" id="avatar" hidden/>
                 </div>

                 <div className="avatar-container">

                    <span> Classic</span>
                    <div className="carousel">
                        <Carousel items={imgs} setAvatarToEdit={setAvatarToEdit}/>
                    </div>
                    <span>Toon</span>
                    <div className="carousel">
                        <Carousel items={imgs} setAvatarToEdit={setAvatarToEdit}/>
                    </div>
                    <span>Animal</span>
                    <div className="carousel">
                        <Carousel items={imgs} setAvatarToEdit={setAvatarToEdit}/>
                    </div>

                    <button className={`next-btn ${avatarToEdit? 'purple-btn' : ''}`} onClick={onSetPlayerGroup}>Next</button>
                 </div>
                </section>}
        </section>
    )
}