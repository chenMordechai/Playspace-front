import { useState, useEffect, useContext, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from 'react-redux'

import { authService } from '../services/auth.service'
import { utilService } from '../services/util.service'
import { signup, registerPlayerToGroup } from "../store/actions/auth.action"
import { getShallowGameById } from "../store/actions/game.action"
import { Carousel } from '../cmps/Carousel'
import { UserImgAddModal } from "../cmps/UserImgAddModal"

import avatar1 from '../assets/img/avatar1.png'
import avatar2 from '../assets/img/avatar2.png'
import avatar3 from '../assets/img/avatar3.png'
import avatar4 from '../assets/img/avatar4.png'
import avatar5 from '../assets/img/avatar5.png'
import avatar6 from '../assets/img/avatar6.png'
import avatar7 from '../assets/img/avatar7.png'
import avatar8 from '../assets/img/avatar8.png'
import vectorLeft from '../assets/img/vector-left.png'
import vectorRight from '../assets/img/vector-right.png'
import spacegameLogo from '../assets/img/spacegame-logo.png'
import x from '../assets/img/x.png'
import companyLogo from '../assets/img/company-logo.png'
import spacegameLogoBlue from '../assets/img/spacegame-logo-blue.png'
import user from '../assets/img/user.png'
import password from '../assets/img/password.png'
import eye from '../assets/img/eye.png'
import plus from '../assets/img/plus.png'


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

    const avatars1 = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8]
    const avatars2 = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8]
    const avatars3 = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8]

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
        // const shallowGame = await getShallowGameById('d01d24a2-6497-46d3-a80f-08dc617c0ee7')
        // console.log('shallowGame:', shallowGame)
        // setShallowGame(shallowGame)
    }

    async function onChangeFileInput(ev) {
        try {
            setIsLoading(true)
            const media = await utilService.uploadImgToCloudinary(ev)
            setCredentials(prev => ({ ...prev, imgUrl: media.url }))
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

            {/* <section className="loading-screen">
                <img className="vector vector1" src={vectorLeft} />
                <div className="content">
                    <img className="spacegame-logo" src={spacegameLogo} />
                    <img className="x" src={x} />
                    <img className="company-logo" src={companyLogo} />
                </div>
                <img className="vector vector2" src={vectorRight} />
            </section> */}

            {stepIdx === 0 && !loggedinPlayer &&
                <section className="step-0">
                    <img className="spacegame-logo-blue" src={spacegameLogoBlue} />

                    <form className="signup-form">
                        <span>Sign in</span>
                        <img className="input-img user" src={user} />
                        <input placeholder="Name" type="text" id="name" name="name" value={credentials.name} onChange={handleChange} required />

                        <img className="input-img password" src={password} />
                        <img className="input-img eye" src={eye} />
                        <input placeholder="Email" type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />

                        <span className="end-span">Forget Password?</span>
                        <button type="button" disabled={!(credentials.name && credentials.email)} onClick={() => setStepIdx(prev => prev + 1)}>Sign in</button>
                        <p>Don’t have account? <span>Sign up</span></p>
                        {/* <button type="button" className={`next-btn ${credentials.name && credentials.email ? 'purple-btn' : ''}`} onClick={() => setStepIdx(prev => prev + 1)}>Sign in</button> */}

                    </form>
                </section>}

            {stepIdx === 1 &&
                <section className="step-1">
                    <div className="header">
                        <span className="select">Select your avatar</span>
                        <img className="plus" onClick={onToggleOpenUserImgAddModal} src={plus} />
                        {openUserImgAddModal && <UserImgAddModal isLoading={isLoading} media={{ url: credentials.imgUrl, type: "image" }} onChangeFileInput={onChangeFileInput} onToggleOpenUserImgAddModal={onToggleOpenUserImgAddModal} />}
                    </div>

                    <div className="avatar-container">
                        <div className="carousel-container">
                            <span> Classic</span>
                            <Carousel items={avatars1} setCredentials={setCredentials} userImg={credentials.imgUrl} />
                        </div>
                        <div className="carousel-container">
                            <span>Toon</span>
                            <Carousel items={avatars2} setCredentials={setCredentials} userImg={credentials.imgUrl} />
                        </div>
                        <div className="carousel-container">
                            <span>Animal</span>
                            <Carousel items={avatars3} setCredentials={setCredentials} userImg={credentials.imgUrl} />
                        </div>

                        <button disabled={!(credentials.imgUrl)} onClick={() => setStepIdx(prev => prev + 1)}>Next</button>
                    </div>
                </section>}

            {stepIdx === 2 &&
                <section className="step-2">
                    {/* <h2>Welcome {loggedinPlayer.name}</h2> */}
                    <h2>שם המשחק: {shallowGame.name}</h2>
                    <div className="header">
                        <span>Choose a group</span>
                    </div>
                    <ul className="groups-container">
                        {shallowGame.groups?.map((group, i) => <li key={group.id}
                            className={`color-${i + 1}`}
                            style={{ backgroundColor: (credentials.groupId === group.id) ? 'red' : '' }}
                            onClick={() => setCredentials(prev => ({ ...prev, groupId: group.id }))}>
                            {/* onclick=>update state */}
                            {group.name}
                        </li>)}
                    </ul>
                    {/* onclick=> save the group and move to next step */}
                    <button className={`next-btn ${credentials.groupId ? 'purple-btn' : ''}`} onClick={onSubmitSignupForm}>סיום</button>

                    {/* {loggedinPlayer.groupId &&
                    <Link to={`/game/${credentials.gameId}`}>כניסה למשחק</Link>} */}

                </section>}
        </section>
    )
}