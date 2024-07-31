import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { getGameById } from "../store/actions/game.action.js"

import { GameLine } from "../cmps/GameLine"
import { demoDataService } from "../services/demoData.service.js"
import { utilService } from "../services/util.service.js"
import logoBig from '../assets/img/logo-big.png'
import arrow from '../assets/img/arrow-left.png'
import points from '../assets/img/3points.png'
import { GameScore } from "../cmps/GameScore.jsx"
import { useSelector } from "react-redux"
import { GameStep0 } from "../cmps/GameStep0.jsx"
import { GameStep1 } from "../cmps/GameStep1.jsx"
import { GameStep2 } from "../cmps/GameStep2.jsx"
import { GameOptionModal } from "../cmps/GameOptionModal.jsx"

import { ScreenOpenContext } from "../contexts/ScreenOpenConext.js";
import { useToggle } from '../customHooks/useToggle'
import { useEffectToggleModal } from '../customHooks/useEffectToggleModal'
import { useEffectCloseModal } from '../customHooks/useEffectCloseModal'
import { getPlayer, getPlayerByCookie, getUser, getPlayerLocal } from "../store/actions/auth.action.js"
import { AnswerModal } from "../cmps/AnswerModal.jsx"

// game/:gameId

export function Game() {
    const [game, setGame] = useState(null)
    const [currGameStepIdx, setCurrGameStepIdx] = useState(0) // 0:before ,1:stages/activities , 2:end
    const [currStageStepIdx, setCurrStageStepIdx] = useState(0)
    const [currActivityStepIdx, setCurrActivityStepIdx] = useState(0)

    const [currStageIdx, setCurrStageIdx] = useState(0)
    const [currActivityIdx, setCurrActivityIdx] = useState(0)

    const [isBackToStep0, setIsBackToStep0] = useState(false)

    // const [currGameStepIdx, setCurrGameStepIdx] = useState(utilService.loadFromStorage('currGameStepIdx') || 0) // 0:before ,1:stages/activities , 2:end
    // const [currStageStepIdx, setCurrStageStepIdx] = useState(utilService.loadFromStorage('currStageStepIdx') || 0)
    // const [currActivityStepIdx, setCurrActivityStepIdx] = useState(utilService.loadFromStorage('currActivityStepIdx') || 0)

    // const [currStageIdx, setCurrStageIdx] = useState(utilService.loadFromStorage('currStageIdx') || 0)
    // const [currActivityIdx, setCurrActivityIdx] = useState(utilService.loadFromStorage('currActivityIdx') || 0)

    const [isGameScoreOpen, setIsGameScoreOpen] = useState(false)
    const [players, setPlayers] = useState([])

    const loggedinPlayer = useSelector(storeState => storeState.authModule.loggedinPlayer)
    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)

    const [openGameOptionModal, onToggleOpenGameOptionModal] = useToggle(false)
    const { isScreenOpen, onOpenScreen, onCloseScreen, } = useContext(ScreenOpenContext)
    useEffectToggleModal(onOpenScreen, onCloseScreen, [openGameOptionModal])
    useEffectCloseModal(isScreenOpen, [onToggleOpenGameOptionModal])

    const [isClickOnContinue, setIsClickOnContinue] = useState(false)
    const navigate = useNavigate()

    const { gameId } = useParams()

    useEffect(() => {
        if (loggedinPlayer) {
            init()
        } else {
            getUserFromBack()
        }
    }, []) // loggedinPlayer

    useEffect(() => {
        if (isClickOnContinue) return
        console.log('loggedinPlayer:', loggedinPlayer)
        if (!isBackToStep0 && !loggedinPlayer || !game) return
        if (!loggedinPlayer.submittedActivitiesIds.length) {
            // game start now
            setCurrGameStepIdx(0)
        } else if (loggedinPlayer.submittedActivitiesIds.length === game.activities.length) {
            // game end
            setCurrGameStepIdx(2)
        } else {
            // console.log('else')
            setCurrGameStepIdx(1)
            setCurrActivityStepIdx(0)

            if (game.gameType === 'activities') {
                // game alredy start
                // const activities
                setCurrActivityIdx(loggedinPlayer.submittedActivitiesIds.length)

            } else {
                // ! ? 
                setCurrStageIdx()
                setCurrActivityIdx()

            }

        }

    }, [loggedinPlayer, game])
    // }, [])

    useEffect(() => {
        console.log('game:', game)
        changeColorsVars()
    }, [game])

    useEffect(() => {
        utilService.saveToStorage('currStageIdx', currStageIdx)
        if (currStageIdx === game?.stages?.length) onSetCurrGameStepIdx()
    }, [currStageIdx])

    useEffect(() => {
        utilService.saveToStorage('currActivityIdx', currActivityIdx)
        if (game?.gameType === 'stages') {
            if (currActivityIdx === game?.stages[currStageIdx]?.activities?.length) {
                setCurrStageStepIdx(prev => prev + 1)
            }
        } else {
            if (currActivityIdx === game?.activities?.length) {
                // setCurrGameStepIdx(prev => prev + 1)
                onSetCurrGameStepIdx()
            }
        }
    }, [currActivityIdx])

    useEffect(() => {
        utilService.saveToStorage('currGameStepIdx', currGameStepIdx)
    }, [currGameStepIdx])
    useEffect(() => {
        utilService.saveToStorage('currStageStepIdx', currStageStepIdx)
    }, [currStageStepIdx])
    useEffect(() => {
        utilService.saveToStorage('currActivityStepIdx', currActivityStepIdx)
    }, [currActivityStepIdx])


    async function getUserFromBack() {
        try {
            const user = await getUser()
            if (user.isAdmin) {
                console.log('user is admin')
                getPlayerLocal(gameId, user.id, user.name)
                init()
            } else {
                await getPlayerByCookie(gameId) // player
                init()
            }
        } catch (error) {
            // console.error('Error:', error);
            navigate(`/signup/${gameId}`)
        }
    }

    async function init() {
        try {
            const game = await getGameById(gameId)

            // demo data
            // game with stages - onTime:
            // const game = await demoDataService.getGame1()
            // utilService.setTimesFormChanges(game)
            // game with activities - onProgress:
            // const game = await demoDataService.getGame2()
            // game with activities - open:
            // const game = await demoDataService.getGame3()
            // game with stages - onProgress:
            // const game = await demoDataService.getGame4()

            setGame(game)

        } catch (err) {
            console.log('err:', err)
        }
    }

    function changeColorsVars() {
        const elRoot = document.querySelector(':root')
        game?.themeColors.forEach((color, i) => {
            elRoot.style.setProperty(`--clr-${i}`, color);
        })
    }

    function getClockForGame() {
        const now = Date.now()
        let diff = game.gameStartTimestamp - now
        return diff

    }

    function moveToNextStage() {
        setCurrStageIdx(prev => prev + 1)
        onResetActivityIdx()
        setCurrStageStepIdx(0)
    }

    function onMoveToNextActivity() {
        // setIsClickOnContinue(false)
        setIsGameScoreOpen(true)
        setCurrActivityIdx(prev => prev + 1)
        setCurrActivityStepIdx(0)
    }

    function onResetActivityIdx() {
        setCurrActivityIdx(0)
    }

    // click on the gameLine
    function onChangeStageIdx(idx) {
        if (game.activityProgressType !== 'open') return
        setCurrStageIdx(idx)
        setCurrStageStepIdx(0)
    }

    // click on the gameLine
    function onChangeActivityIdx(activityIdx, stageIdx) {
        if (game.activityProgressType !== 'open') return
        setCurrActivityIdx(activityIdx)
        setCurrActivityStepIdx(0)

        if (stageIdx !== undefined) {
            if (currStageStepIdx === 0) return
            setCurrStageIdx(stageIdx)

        }
    }

    function onSetCurrGameStepIdx() {
        if (game.activityProgressType === 'onTime') {
            if (!isGameStart || isGameEnd()) return
        }
        if (currGameStepIdx === 2) return
        setCurrGameStepIdx(prev => prev + 1)
    }

    function isGameStart() {
        return game.gameStartTimestamp < Date.now()
    }

    function isGameEnd() {
        return game.gameEndTimestamp < Date.now()
    }

    function getBackToStep0() {
        if (currGameStepIdx === 0) {
            console.log('hi')
        } else {
            setIsBackToStep0(true)
            setCurrGameStepIdx(0)
        }


    }

    if (!game) return ''
    return (
        <section className="game-container rtl">
            <AnswerModal />
            <div className="game-bgi">
                <img src={logoBig} />
            </div>
            <div className="layer-1">
                <div className="game-header">
                    <button onClick={onToggleOpenGameOptionModal} className="points"><img src={points} /></button>
                    <button className="game-name">{game.name}</button>
                    <span onClick={getBackToStep0} className="arrow"> <img src={arrow} /></span>
                    {openGameOptionModal && <GameOptionModal />}

                </div>

                {!isGameScoreOpen && <div>
                    {/* game color theme */}
                    {/* <div className="clr1">First</div>
                    <div className="clr2">Second</div>
                   <div className="clr3">Third</div> */}

                    {/* start game */}
                    {currGameStepIdx === 0 && <GameStep0 game={game} getClockForGame={getClockForGame} isGameEnd={isGameEnd} isGameStart={isGameStart} onSetCurrGameStepIdx={onSetCurrGameStepIdx} stats={{ score: loggedinPlayer.score, position: loggedinPlayer.position }} doneTasks={loggedinPlayer?.submittedActivitiesIds} />}

                    {/* gameline  */}
                    {/* {currGameStepIdx === 1 && <GameLine stages={game.stages} activities={game.activities} onChangeStageIdx={onChangeStageIdx} onChangeActivityIdx={onChangeActivityIdx} />} */}
                    {/* game stages / activities */}
                    {currGameStepIdx === 1 && <GameStep1 setIsClickOnContinue={setIsClickOnContinue} game={game} currStageIdx={currStageIdx} moveToNextStage={moveToNextStage} onResetActivityIdx={onResetActivityIdx} currActivityIdx={currActivityIdx} onMoveToNextActivity={onMoveToNextActivity} currActivityStepIdx={currActivityStepIdx} setCurrActivityStepIdx={setCurrActivityStepIdx} currStageStepIdx={currStageStepIdx} setCurrStageStepIdx={setCurrStageStepIdx} />}

                    {/* end game */}
                    {currGameStepIdx === 2 && <GameStep2 textAfterGame={game.textAfter} />}

                </div>}

                {isGameScoreOpen && <>
                    <GameScore />
                    <button className="score-btn" onClick={() => setIsGameScoreOpen(false)}>continue</button>
                </>}

            </div>
        </section>
    )
}