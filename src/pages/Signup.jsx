import { useState, useEffect, useContext, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

import { authService } from '../services/auth.service'
import { utilService } from '../services/util.service'
import { signup, getPlayer, getUser } from "../store/actions/auth.action"
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
import avatar9 from '../assets/img/avatar9.png'
import avatar10 from '../assets/img/avatar10.png'
import avatar11 from '../assets/img/avatar11.png'
import avatar12 from '../assets/img/avatar12.png'
import avatar13 from '../assets/img/avatar13.png'
import avatar14 from '../assets/img/avatar14.png'
import avatar15 from '../assets/img/avatar15.png'
import avatar16 from '../assets/img/avatar16.png'
import avatar17 from '../assets/img/avatar17.jpg'
import avatar18 from '../assets/img/avatar18.jpg'
import avatar19 from '../assets/img/avatar19.jpg'
import avatar20 from '../assets/img/avatar20.jpg'
import avatar21 from '../assets/img/avatar21.jpg'
import avatar22 from '../assets/img/avatar22.jpg'
import avatar23 from '../assets/img/avatar23.jpg'
import avatar24 from '../assets/img/avatar24.jpg'
import vectorLeft from '../assets/img/vector-left.png'
import vectorRight from '../assets/img/vector-right.png'
import playspaceLogo from '../assets/img/playspace-logo.png'
import x from '../assets/img/x.png'
import v from '../assets/img/green-v.png'
import companyLogo from '../assets/img/company-logo.png'
import eye from '../assets/img/eye.png'
import plus from '../assets/img/plus.png'
import { LoginSignup } from "../cmps/LoginSignup.jsx"


import { ScreenOpenContext } from "../contexts/ScreenOpenConext.js";
import { useToggle } from '../customHooks/useToggle'
import { useEffectToggleModal } from '../customHooks/useEffectToggleModal'
import { useEffectCloseModal } from '../customHooks/useEffectCloseModal'

// work : http://localhost:5173/signup/ee659c2a-6a6a-4186-24a0-08dc94f292d0

export function Signup() {
    console.log('Signup')
    const [credentials, setCredentials] = useState(utilService.loadFromStorage('credentials') || authService.getEmptySignupCred())
    const [shallowGame, setShallowGame] = useState(null)

    const loggedinPlayer = useSelector(storeState => storeState.authModule.loggedinPlayer)
    const [stepIdx, setStepIdx] = useState(utilService.loadFromStorage('signupStepIdx') || 0)
    const [isLoading, setIsLoading] = useState(false)

    const avatars1 = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8]
    const avatars2 = [avatar9, avatar10, avatar11, avatar12, avatar13, avatar14, avatar15, avatar16]
    const avatars3 = [avatar17, avatar18, avatar19, avatar20, avatar21, avatar22, avatar23, avatar24]

    const [openUserImgAddModal, onToggleOpenUserImgAddModal] = useToggle(false)
    const { isScreenOpen, onOpenScreen, onCloseScreen, } = useContext(ScreenOpenContext)
    useEffectToggleModal(onOpenScreen, onCloseScreen, [openUserImgAddModal])
    useEffectCloseModal(isScreenOpen, [onToggleOpenUserImgAddModal])

    const { gameId } = useParams()
    const navigate = useNavigate()
    const sectionRef = useRef(null);
    const colors = useRef(null);


    useEffect(() => {
        // getUserFromBack()
    }, [])

    async function getUserFromBack() {
        console.log('getUserFromBack')
        try {
            // work
            const user = await getUser() // user
            console.log('user:', user)
            // didn't work
            //! Avishai we need to get the player after we have playspace-player-cookie
            const player = await getPlayer(gameId) // player
            console.log('player:', player)
            // save to store = player
            // if (player) navigate(`/game/${shallowGame.id}`)
        } catch (error) {
            // console.error('Error:', error);
        }
    }

    useEffect(() => {
        // todo
        setTimeout(() => {
            // sectionRef.current.classList.add('fade')
        }, 2000)
        setCredentials(prev => ({ ...prev, gameId }))
        // setCredentials(prev => ({ ...prev, gameId, groupId }))

        // get user
        // get player
        getShallowGame()


    }, [])

    useEffect(() => {
        utilService.saveToStorage('signupStepIdx', stepIdx)
    }, [stepIdx])

    useEffect(() => {
        utilService.saveToStorage('credentials', credentials)
    }, [credentials])

    useEffect(() => {
        changeColorsVars()
    }, [shallowGame])


    function handleChange(ev) {
        let { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    async function getShallowGame() {
        const shallowGame = await getShallowGameById(gameId)
        // const shallowGame = await getShallowGameById("83a19a02-8fe0-4442-dd7e-08dc7b5a30d0")
        console.log('shallowGame:', shallowGame)

        setShallowGame(shallowGame)

        if (loggedinPlayer && shallowGame) {
            navigate(`/game/${shallowGame.id}`)
        }
        // colors.current = shallowGame.groups.map(g => utilService.getRandomColor())
    }

    function changeColorsVars() {
        if (!shallowGame || !shallowGame.themeColors) return
        const elRoot = document.querySelector(':root')
        // shallowGame?.themeColors.forEach((color, i) => {
        //     elRoot.style.setProperty(`--clr-${i}`, color);
        // })

        // elRoot.style.setProperty(`--primary`, shallowGame?.themeColors[0]);
        // elRoot.style.setProperty(`--primary-35`, shallowGame?.themeColors[1]);
        // elRoot.style.setProperty(`--gradient-clr-1`, shallowGame?.themeColors[2]);
        // elRoot.style.setProperty(`--gradient-clr-2`, shallowGame?.themeColors[0]);
    }

    async function onChangeFileInput(ev) {
        try {
            setIsLoading(true)
            const media = await utilService.uploadImgToCloudinary(ev)
            setCredentials(prev => ({ ...prev, media }))
        } catch (err) {
            console.log('err:', err)
        } finally {
            setIsLoading(false)
        }
    }

    async function onSubmitSignupForm(ev) {
        ev.preventDefault()
        try {
            // work
            const user = await signup(credentials) // user
            const player = await getPlayer(gameId) // player

            resetSignup()

            // save to store = player
            if (player) navigate(`/game/${shallowGame.id}`)
        } catch (error) {
            console.error('Error:', error);
        }

    }

    function resetSignup() {
        console.log('resetSignup')
        utilService.saveToStorage('signupStepIdx', 0)
        utilService.saveToStorage('credentials', authService.getEmptySignupCred())
    }

    function onCloseModal() {
        onToggleOpenUserImgAddModal()
        setStepIdx(prev => prev + 1)

    }

    // if (isLoading) return
    return (
        <section ref={sectionRef} className="signup">

            {/* todo */}
            {/* <section className="loading-screen">
                <img className="vector vector1" src={vectorLeft} />
                <div className="content">
                    <img className="playspace-logo" src={playspaceLogo} />
                    <img className="x" src={x} />
                    <img className="company-logo" src={companyLogo} />
                </div>
                <img className="vector vector2" src={vectorRight} />
            </section> */}

            {stepIdx === 0 && !loggedinPlayer &&
                <LoginSignup credentials={credentials} handleChange={handleChange} onBtnClick={() => setStepIdx(prev => prev + 1)} btnType="button" text="Sign up" />
            }

            {stepIdx === 1 &&
                <section className="step-1">
                    <div className="header">
                        <span className="select">Select your avatar</span>
                        <img className="plus" onClick={onToggleOpenUserImgAddModal} src={plus} />
                        {openUserImgAddModal && <UserImgAddModal isLoading={isLoading} media={credentials.media} onChangeFileInput={onChangeFileInput} onCloseModal={onCloseModal} />}
                    </div>

                    <div className="avatar-container">
                        <div className="carousel-container">
                            <span> Classic</span>
                            <Carousel items={avatars1} setCredentials={setCredentials} userImg={credentials.media?.url} />
                        </div>
                        <div className="carousel-container">
                            <span>Toon</span>
                            <Carousel items={avatars2} setCredentials={setCredentials} userImg={credentials.media?.url} />
                        </div>
                        <div className="carousel-container">
                            <span>Animal</span>
                            <Carousel items={avatars3} setCredentials={setCredentials} userImg={credentials.media?.url} />
                        </div>

                        <button disabled={!(credentials.media?.url)} onClick={() => setStepIdx(prev => prev + 1)}>Next</button>
                    </div>
                </section>}

            {stepIdx === 2 && shallowGame &&
                <section className="step-2">
                    <div className="header">
                        <span>Choose a group</span>
                    </div>
                    <ul className="groups-container">
                        {shallowGame.groups?.map((group, i) =>
                            <li key={group.id}
                                className={credentials.groupId === group.id ? 'selected' : ''}
                                onClick={() => setCredentials(prev => ({ ...prev, groupId: group.id }))}>

                                {credentials.groupId === group.id && <img className="green-v" src={v} />}
                                {group.name}
                            </li>)}
                    </ul>
                    {/* onclick=> save the group and start game */}
                    <button disabled={!(credentials.groupId)} onClick={onSubmitSignupForm}>Start</button>

                    {/* {loggedinPlayer.groupId &&
                    <Link to={`/game/${credentials.gameId}`}>כניסה למשחק</Link>} */}

                </section>}
        </section>
    )
}