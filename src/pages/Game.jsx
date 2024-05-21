import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { getGameById } from "../store/actions/game.action.js"

import { GameLine } from "../cmps/GameLine"
import { demoDataService } from "../services/demoData.service.js"
import { utilService } from "../services/util.service.js"
import logoBig from '../assets/img/logo-big.png'
import points from '../assets/img/3points.png'
import { GameScore } from "../cmps/GameScore.jsx"
import { useSelector } from "react-redux"
import { GameStep0 } from "../cmps/GameStep0.jsx"
import { GameStep1 } from "../cmps/GameStep1.jsx"
import { GameStep2 } from "../cmps/GameStep2.jsx"


// game/:gameId

export function Game() {
    const [game, setGame] = useState(null)
    const [currGameStepIdx, setCurrGameStepIdx] = useState(utilService.loadFromStorage('currGameStepIdx') || 0) // 0:before ,1:stages/activities , 2:end
    const [currStageStepIdx, setCurrStageStepIdx] = useState(utilService.loadFromStorage('currStageStepIdx') || 0)
    const [currActivityStepIdx, setCurrActivityStepIdx] = useState(utilService.loadFromStorage('currActivityStepIdx') || 0)

    const [currStageIdx, setCurrStageIdx] = useState(utilService.loadFromStorage('currStageIdx') || 0)
    const [currActivityIdx, setCurrActivityIdx] = useState(utilService.loadFromStorage('currActivityIdx') || 0)

    const [isGameScoreOpen, setIsGameScoreOpen] = useState(true)
    const [players, setPlayers] = useState(null)

    const loggedinPlayer = useSelector(storeState => storeState.authModule.loggedinPlayer)
    // console.log('loggedinPlayer:', loggedinPlayer)

    const { gameId } = useParams()

    useEffect(() => {
        // todo: // if !loggdinPlayer return
        init()
        // saveIdxsToStorage()

        getPlayers()
    }, [])

    useEffect(() => {
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


    async function init() {
        try {
            // work : http://localhost:5173/game/96ebb7e2-abf2-46df-1727-08dc75a038e2
            // const game = await getGameById(gameId)

            // demo data
            // game with stages - onTime:
            // const game = await demoDataService.getGame1()
            // utilService.setTimesFormChanges(game)
            // game with activities - onProgress:
            // const game = await demoDataService.getGame2()
            // game with activities - open:
            const game = await demoDataService.getGame3()
            // game with stages - onProgress:
            // const game = await demoDataService.getGame4()

            console.log('game:', game)
            setGame(game)
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function getPlayers() {
        // todo: get players from my group

        const players = [
            {
                id: '01',
                name: 'you',
                score: 1067,
                media: { url: "/src/assets/img/avatar4.png", type: "image" }
            },
            {
                id: '02',
                name: '1189',
                score: 1389,
                media: { url: "/src/assets/img/avatar3.png", type: "image" }
            },
            {
                id: '03',
                name: 'shirel',
                score: 645,
                media: { url: "/src/assets/img/avatar1.png", type: "image" }
            },
            {
                id: '04',
                name: 'yaniv',
                score: 800,
                media: { url: "/src/assets/img/avatar2.png", type: "image" }
            },
            {
                id: '05',
                name: 'moshe',
                score: 765,
                media: { url: "/src/assets/img/avatar6.png", type: "image" }
            },
            // {
            //     id: '06',
            //     name: 'moshe',
            //     score: 765,
            //     media: { url: "/src/assets/img/avatar6.png", type: "image" }
            // },
            // {
            //     id: '07',
            //     name: 'moshe',
            //     score: 765,
            //     media: { url: "/src/assets/img/avatar6.png", type: "image" }
            // },
            // {
            //     id: '08',
            //     name: 'moshe',
            //     score: 765,
            //     media: { url: "/src/assets/img/avatar6.png", type: "image" }
            // },
        ]
        // todo: move to service
        players.sort((a, b) => a.score - b.score)
        setPlayers(players)
    }

    function changeColorsVars() {
        const elRoot = document.querySelector(':root')
        game?.themeColors.forEach((color, i) => {
            elRoot.style.setProperty(`--clr-${i}`, color);
        })
    }

    function getClockForGame() {
        // console.log('game:', game)
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
        console.log('onSetCurrGameStepIdx')
        console.log('currGameStepIdx:', currGameStepIdx)
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

    if (!game) return ''
    return (
        <section className="game-container">
            <div className="game-bgi">
                <img src={logoBig} />
            </div>
            <div className="layer-1">
                <div className="game-header">
                    <span></span>
                    <button className="game-name">{game.name}</button>
                    <button className="points"><img src={points} /></button>
                </div>
                {!isGameScoreOpen && <div>
                    {/* game color theme */}
                    {/* <div className="clr1">First</div>
                    <div className="clr2">Second</div>
                   <div className="clr3">Third</div> */}

                    {/* start game */}
                    {currGameStepIdx === 0 && <GameStep0 game={game} getClockForGame={getClockForGame} isGameEnd={isGameEnd} isGameStart={isGameStart} onSetCurrGameStepIdx={onSetCurrGameStepIdx} />}

                    {/* gameline  */}
                    {/* {currGameStepIdx === 1 && <GameLine stages={game.stages} activities={game.activities} onChangeStageIdx={onChangeStageIdx} onChangeActivityIdx={onChangeActivityIdx} />} */}
                    {/* game stages / activities */}
                    {currGameStepIdx === 1 && <GameStep1 game={game} currStageIdx={currStageIdx} moveToNextStage={moveToNextStage} onResetActivityIdx={onResetActivityIdx} currActivityIdx={currActivityIdx} onMoveToNextActivity={onMoveToNextActivity} currActivityStepIdx={currActivityStepIdx} setCurrActivityStepIdx={setCurrActivityStepIdx} currStageStepIdx={currStageStepIdx} setCurrStageStepIdx={setCurrStageStepIdx} />}

                    {/* end game */}
                    {currGameStepIdx === 2 && <GameStep2 textAfterGame={game.textAfter} />}

                </div>}

                {isGameScoreOpen && <>
                    <GameScore players={players} loggedinPlayerId={loggedinPlayer?.id || '01'} />
                    <button className="score-btn">continue</button>
                </>}

            </div>
        </section>
    )
}