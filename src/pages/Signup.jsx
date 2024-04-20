import { useState, useEffect, useContext, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from 'react-redux'

import { authService } from '../services/auth.service'
import { utilService } from '../services/util.service'
import { signup, registerPlayerToGroup } from "../store/actions/auth.action"
import { getShallowGameById } from "../store/actions/game.action"
import { Carousel } from '../cmps/Carousel'
import avatar1 from '../assets/img/avatar.jpg'
import avatar2 from '../assets/img/avatar2.png'
import { UserImgAddModal } from "../cmps/UserImgAddModal"

import { ScreenOpenContext } from "../contexts/ScreenOpenConext.js";
import { useToggle } from '../customHooks/useToggle'
import { useEffectToggleModal } from '../customHooks/useEffectToggleModal'
import { useEffectCloseModal } from '../customHooks/useEffectCloseModal'


export function Signup() {
    const [credentials, setCredentials] = useState(authService.getEmptySignupCred())

    const [shallowGame, setShallowGame] = useState(null)
    const loggedinPlayer = useSelector(storeState => storeState.authModule.loggedinPlayer)

    const [groups, setGroups] = useState(null)

    const [stepIdx, setStepIdx] = useState(utilService.loadFromStorage('signupStepIdx') || 0)

    // const [groupIdToEdit, setGroupIdToEdit] = useState('')

    // const [avatarToEdit, setAvatarToEdit] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    const [openUserImgAddModal, onToggleOpenUserImgAddModal] = useToggle(false)

    const imgs = [avatar1, avatar2, avatar1, avatar2, avatar1, avatar2, avatar1, avatar2]

    const { isScreenOpen, onOpenScreen, onCloseScreen, } = useContext(ScreenOpenContext)

    useEffectToggleModal(onOpenScreen, onCloseScreen, [openUserImgAddModal])

    useEffectCloseModal(isScreenOpen, [onToggleOpenUserImgAddModal])

    // const { gameId, groupId } = useParams()
    const { gameId } = useParams()
    // let query = useQuery();
    const sectionRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            sectionRef.current.classList.add('fade')
        }, 2000)
        setCredentials(prev => ({ ...prev, gameId }))
        // setCredentials(prev => ({ ...prev, gameId, groupId }))

        // Avishai get shallow game - colors,name
        getShallowGame()
        // Avishai get groups by game id
        getGameGroups()

    }, [])

    useEffect(() => {
        utilService.saveToStorage('signupStepIdx', stepIdx)
    }, [stepIdx])

    function handleChange(ev) {
        let { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

 async function getShallowGame() {
        // const shallowGame = await getShallowGameById(gameId)
        const shallowGame = await getShallowGameById('5cfdce36-e83f-4281-a80e-08dc617c0ee7')
        console.log('shallowGame:', shallowGame)
        setShallowGame(shallowGame)
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


    async function onChangeFileInput(ev) {
        try {
            setIsLoading(true)
            const media = await utilService.uploadImgToCloudinary(ev)
            setCredentials(prev=>({...prev,imgUrl:media.url}))
        } catch (err) {
            console.log('err:', err)
        } finally {
            setIsLoading(false)
        }
    }

    async function onSubmitSignupForm(ev) {
        ev.preventDefault()
        try {
            console.log('credential:', credential)
            // Avishai signup
            // const player = await signup(credentials)

            // console.log('success signup', player)
            // if (player) setStepIdx(prev => prev + 1)
            // if (!user.isAdmin) navigate('/home')
        } catch (error) {
            console.error('Error:', error);
        }

        // httpService.post('auth/Signup', credentials)
    }

    // if (isLoading) return

    return (
        <section ref={sectionRef} className="signup">

            {/* <section className="loading-screen">
                <div className="content">
                    <span>X</span>
                    <h3>ELAL</h3>
                </div>
            </section> */}

            {stepIdx === 0 && !loggedinPlayer &&
                <section className="step-0">

                    <h2>Welcome to</h2>
                    <h2 className="spacegame">spacegame</h2>

                    <form className="name-form">

                        <input placeholder="Tape your name" type="text" id="name" name="name" value={credentials.name} onChange={handleChange} required />

                        <input placeholder="Tape your email" type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />

                        <button type="button" className={`next-btn ${credentials.name && credentials.email ? 'purple-btn' : ''}`} onClick={()=> setStepIdx(prev => prev + 1)}>Next</button>

                    </form>
                </section>}

            {stepIdx === 1 && loggedinPlayer && shallowGame && groups &&
                <section className="step-1">
                    {/* <h2>Welcome {loggedinPlayer.name}</h2> */}
                    <h2>שם המשחק: {shallowGame.name}</h2>
                    <div className="header">
                        <span>Choose a group</span>
                    </div>
                    <ul className="groups-container">
                        {groups.map((group, i) => <li key={group.id}
                            className={`color-${i + 1}`}
                            style={{ backgroundColor: (groupIdToEdit === group.id) ? 'red' : '' }}
                            onClick={() => setCredentials(prev => ({...prev,groupId:group.id}))}>
                            {/* onclick=>update state */}
                            {group.name}
                        </li>)}
                    </ul>
                    {/* onclick=> save the group and move to next step */}
                    <button className={`next-btn ${groupIdToEdit ? 'purple-btn' : ''}`} onClick={()=> setStepIdx(prev => prev + 1)}>Next</button>

                    {/* {loggedinPlayer.groupId &&
                    <Link to={`/game/${credentials.gameId}`}>כניסה למשחק</Link>} */}
                </section>}

            {stepIdx === 2 &&
                <section className="step-2">
                    <div className="header">
                        <span>Choose an avater</span>
                        <button className="plus" onClick={onToggleOpenUserImgAddModal}>+</button>
                        {openUserImgAddModal && <UserImgAddModal isLoading={isLoading} media={avatarToEdit} onChangeFileInput={onChangeFileInput} onSetAvatarImg={onSetAvatarImg} onToggleOpenUserImgAddModal={onToggleOpenUserImgAddModal} />}
                    </div>

                    <div className="avatar-container">

                        <span> Classic</span>
                        <div className="carousel">
                            <Carousel items={imgs} setCredentials={setCredentials} userImg={credentials.imgUrl} />
                        </div>
                        <span>Toon</span>
                        <div className="carousel">
                            <Carousel items={imgs} setCredentials={setCredentials} userImg={credentials.imgUrl} />
                        </div>
                        <span>Animal</span>
                        <div className="carousel">
                            <Carousel items={imgs} setCredentials={setCredentials} userImg={credentials.imgUrl} />
                        </div>

                        <button className={`next-btn ${avatarToEdit ? 'purple-btn' : ''}`} onClick={onSubmitSignupForm}>סיום</button>
                    </div>
                </section>}
        </section>
    )
}