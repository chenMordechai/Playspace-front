import { useState, useEffect, useContext, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from 'react-redux'

import { authService } from '../services/auth.service'
import { utilService } from '../services/util.service'
import { signup, registerPlayerToGroup } from "../store/actions/auth.action"
import { getShallowGameById } from "../store/actions/game.action"
import { Carousel } from '../cmps/Carousel'
import { UserImgAddModal } from "../cmps/UserImgAddModal"

import avatar1 from '../assets/img/avatar.jpg'
import avatar2 from '../assets/img/avatar2.png'
import vectorLeft from '../assets/img/vector-left.png'
import vectorRight from '../assets/img/vector-right.png'
import spacegameLogo from '../assets/img/spacegame-logo.png'
import x from '../assets/img/x.png'
import companyLogo from '../assets/img/company-logo.png'


import { ScreenOpenContext } from "../contexts/ScreenOpenConext.js";
import { useToggle } from '../customHooks/useToggle'
import { useEffectToggleModal } from '../customHooks/useEffectToggleModal'
import { useEffectCloseModal } from '../customHooks/useEffectCloseModal'


export function Signup() {
    const [credentials, setCredentials] = useState(authService.getEmptySignupCred())
console.log('credentials:', credentials)
    const [shallowGame, setShallowGame] = useState(null)

    const loggedinPlayer = useSelector(storeState => storeState.authModule.loggedinPlayer)

    // const [groups, setGroups] = useState(null)

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
            // sectionRef.current.classList.add('fade')
        }, 2000)
        setCredentials(prev => ({ ...prev, gameId }))
        // setCredentials(prev => ({ ...prev, gameId, groupId }))

        getShallowGame()

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
        const shallowGame = await getShallowGameById('d01d24a2-6497-46d3-a80f-08dc617c0ee7')
        console.log('shallowGame:', shallowGame)
        setShallowGame(shallowGame)
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
            console.log('credentials:', credentials)
            // Avishai signup
            const player = await signup(credentials)

            console.log('success signup', player)
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

            <section className="loading-screen">
                <img className="vector vector1" src={vectorLeft}/>
                <div className="content">
                    <img className="spacegame-logo" src={spacegameLogo} />
                    <img className="x" src={x} />
                    <img className="company-logo" src={companyLogo} />
                    <h3>ELAL</h3>
                </div>
                <img className="vector vector2" src={vectorRight}/>
            </section>

            {stepIdx === 0 && !loggedinPlayer &&
                <section className="step-0">

                    <h2>Welcome to</h2>
                    {/* <h2 className="spacegame">spacegame</h2> */}

                    <form className="name-form">

                        <input placeholder="Tape your name" type="text" id="name" name="name" value={credentials.name} onChange={handleChange} required />

                        <input placeholder="Tape your email" type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />

                        <button type="button" className={`next-btn ${credentials.name && credentials.email ? 'purple-btn' : ''}`} onClick={()=> setStepIdx(prev => prev + 1)}>Next</button>

                    </form>
                </section>}

            {stepIdx === 1 && shallowGame &&
                <section className="step-1">
                    {/* <h2>Welcome {loggedinPlayer.name}</h2> */}
                    <h2>שם המשחק: {shallowGame.name}</h2>
                    <div className="header">
                        <span>Choose a group</span>
                    </div>
                    <ul className="groups-container">
                        {shallowGame.groups?.map((group, i) => <li key={group.Id}
                            className={`color-${i + 1}`}
                            style={{ backgroundColor: (credentials.groupId === group.Id) ? 'red' : '' }}
                            onClick={() => setCredentials(prev => ({...prev,groupId:group.Id}))}>
                            {/* onclick=>update state */}
                            {group.name}
                        </li>)}
                    </ul>
                    {/* onclick=> save the group and move to next step */}
                    <button className={`next-btn ${credentials.groupId ? 'purple-btn' : ''}`} onClick={()=> setStepIdx(prev => prev + 1)}>Next</button>

                    {/* {loggedinPlayer.groupId &&
                    <Link to={`/game/${credentials.gameId}`}>כניסה למשחק</Link>} */}
                </section>}

            {stepIdx === 2 &&
                <section className="step-2">
                    <div className="header">
                        <span>Choose an avater</span>
                        <button className="plus" onClick={onToggleOpenUserImgAddModal}>+</button>
                        {openUserImgAddModal && <UserImgAddModal isLoading={isLoading} media={{url:credentials.imgUrl,type:"image"}} onChangeFileInput={onChangeFileInput} onToggleOpenUserImgAddModal={onToggleOpenUserImgAddModal} />}
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

                        <button className={`next-btn ${credentials.imgUrl ? 'purple-btn' : ''}`} onClick={onSubmitSignupForm}>סיום</button>
                    </div>
                </section>}
        </section>
    )
}