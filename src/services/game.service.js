import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { demoDataService } from './demoData.service.js'
import { authService } from './auth.service.js'

const BASE_URL = 'Game/'

export const gameService = {
    getGames,
    getPlayers,
    getGroups,
    getGameById,
    getShallowGameById,
    save,
    remove,
    getEmptyGame,
    getEmptyGroup,
    getEmptyStage,
    getEmptyActivity,
    getDefaultFilter,
    getDefaultSort,
    checkAnswer,
    adminCheckAnswer,
    usingLifeSaver,
    adminUseLifeSaver,
    getGameGroups,
    getGamePlayers,
    updateGroup,
    updatePlayerScore,
    getGameScores,
    checkAnswerLocal
    // getGames2
}

// get demo data
// work
async function getGames(isAdmin, filterBy = {}, sortBy = {}, currPage) {
    filterBy = {
        filterBy,
        sortBy,
        currPage
    }
    let games
    if (isAdmin) {
        games = await httpService.post(`Admin/Games`, filterBy)
    } else {
        games = await httpService.get(`User/Games`)
    }
    return games
}

async function getStatistics() {
    return await httpService.get(BASE_URL + `Statistics`)
}

async function getPlayers(gameId, filterBy = {}, sortBy = {}, currPage) {
    filterBy = {
        filterBy,
        sortBy,
        currPage
    }
    const players = await httpService.post(`Admin/Game/${gameId}/Player`, filterBy)
    return players
}

async function getGroups(gameId) {
    // filterBy = {
    //     filterBy,
    //     sortBy,
    //     currPage
    // }
    const groups = await httpService.post(`Admin/Game/${gameId}/Groups`)
    return groups
}

async function getGameGroups(gameId, filterBy = {}, sortBy = {}, currPage) {
    filterBy = {
        filterBy,
        sortBy,
        currPage
    }
    const groups = await httpService.post(`Admin/Game/${gameId}/Groups`, filterBy)
    return groups
}

async function getGamePlayers(gameId, filterBy = {}, sortBy = {}, currPage) {
    filterBy = {
        filterBy,
        sortBy,
        currPage
    }
    const groups = await httpService.post(`Admin/Game/${gameId}/Player`, filterBy)
    return groups
}

async function updateGroup(gameId, groupIdentifier, scoreDiff) {
    const groupUpdatePayload = {
        groupIdentifier,
        scoreDiff,
    }

    const isUpdated = await httpService.put(`Admin/Game/${gameId}/Group`, groupUpdatePayload)
    return isUpdated;
}

async function updatePlayerScore(playerId, gameId, newScore) {
    const playerUpdatePayload = {
        playerId,
        gameId,
        newScore
    }

    const isUpdated = await httpService.put(`Player/UpdateScore`, playerUpdatePayload)
    return isUpdated;
}

async function getGameById(gameId) {
    return httpService.get(BASE_URL + gameId)

    // return Promise.resolve(demoDataService.getGame3())
}


async function getShallowGameById(gameId) {
    return httpService.get(BASE_URL + `${gameId}/Preview`)

    // return demoDataService.getGame4()

}

async function remove(gameId) {
    return httpService.delete(`Admin/Game/${gameId}`)
}

async function save(game) {

    if (game.id) {
        return httpService.put('Admin/Game', game)
    } else {
        // work
        return httpService.post('Game', game)
    }
}

async function checkAnswer(answer) {
    const newPlayer = httpService.post(`Player/Answer`, answer)
    return newPlayer
}

async function adminCheckAnswer(player, answer) {
    const payload = {
        player: {...player, lastAnswerState: false, lastAnswerSkipped: false},
        answer
    }
    const newPlayer = httpService.post(`Player/AdminAnswerTest`, payload)
    return newPlayer
}

async function checkAnswerLocal(answerData, currectAnswer, loggedinPlayer) {
    console.log('answerData:', answerData)
    console.log('currectAnswer:', currectAnswer)
    console.log('loggedinPlayer:', loggedinPlayer)
    const newPlayer = { ...loggedinPlayer }
    if (answerData.answer === currectAnswer) {
        newPlayer.lastAnswerState = true
    } else {
        newPlayer.lastAnswerState = false
    }
    return Promise.resolve(newPlayer)
}

async function usingLifeSaver(data) {
    return httpService.post(`Player/LifeSaver`, data)
}

async function adminUseLifeSaver(player, lifeSaver) {
    const payload = {
        player: {...player, lastAnswerState: false, lastAnswerSkipped: false},
        lifeSaver
    }
    return httpService.post(`Player/LifeSaverTest`, payload)
}

async function getGameScores() {
    return await httpService.get("Game/Statistics")
}
///////////////////////////////////////

function getEmptyGame() {
    return {
        id: null,
        name: '', // v // e
        isDeleted: false,
        activities: null, // || []
        stages: null, // || []
        createDate: '',
        dateStart: '', // for form v  // e
        timeStart: '', // for form v // e
        dateEnd: '', // for form v // e
        timeEnd: '', // for form v // e
        gameStartTimestamp: null, // after form // e
        gameEndTimestamp: null, // after form // e
        themeColors: ['#ffffff'], // v // e
        icon: null, // e
        groups: null, // v
        gameType: '', // stages or activities v 
        activityProgressType: 'open', // open/ time/ progress v
        admins: [], // v // e // [{adminId:'212'}]
        textBefore: '', // v //e
        textAfter: '', // v //e
        lifeSavers: null

    }
}

function getEmptyGroup() {
    return {
        id: utilService.makeId(), // adding txt from the game name
        name: '', // v // e
        adminAdditionalScore: 0, // after game // e
    }
}

function getEmptyStage() {
    return {
        id: null,
        name: '', // v // e
        activities: [getEmptyActivity()], // v
        dateStart: '', // for form v
        timeStart: '', // for form v
        dateEnd: '', // for form v
        timeEnd: '', // for form v
        stageStartTimestamp: null, // after form - if the game.activityProgressType === onTime
        stageEndTimestamp: null, // after form - if the game.activityProgressType === onTime
        textBefore: '', // v
        textAfter: '', // v
        maxError: '', // v
        isRequired: false, // v
    }
}

function getEmptyActivity() {
    return {
        id: null,
        text: '',// v => text // e
        activityType: 'open', // v open/multiple/yesno/typing
        correctAnswer: '', // v // e
        activityAswers: null, // if activityType === 'multiple' v // e
        // correctAnswerId: 0, // after form (calc from 2 props above)
        timeToRespond: 0, // on game
        // timeToRespond: 0, // on game
        dateStart: '', // for form v // e
        timeStart: '', // for form v // e
        dateEnd: '', // for form v // e
        timeEnd: '', // for form v // e
        activityStartTimestamp: null, // after form - if the game.activityProgressType === onTime // e
        activityEndTimestamp: null, // after form - if the game.activityProgressType === onTime // e
        pointsValue: 0, // v //e
        maxError: 0, // v //e
        mediaBefore: null, // {type : image/video , txt:'' , url:''} v //e
        mediaAfter: null, // {type : image/video , txt:'' , url:''} v //e
        textBefore: '', // v //e
        textAfter: '', // v //e
        lifeSaver: null, // v [] //e
        isRequired: false, // v
    }
}

function getDefaultFilter() {
    return { name: '' }
}

function getDefaultSort() {
    return { value: 'date', desc: 1 }
}




// const games = [
//     {
//         "id": "68f65152-2b7a-4d6e-b0d3-08dc4fc92625",
//         "name": "1",
//     },
//     {
//         "id": "2402d695-1607-4133-f6cc-08dc4fd6c936",
//         "name": "2",
//     },
//     {
//         "id": "a8e83467-9bd6-4dd0-1de0-08dc4fd8e0ab",
//         "name": "3",
//     },
//     {
//         "id": "e5b83853-c2c1-48e4-4ada-08dc50ecaa00",
//         "name": "4",
//     },
//     {
//         "id": "af25601c-045f-4935-d9b4-08dc50f580fd",
//         "name": "5",
//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "6",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "7",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "8",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "9",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "10",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "11",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "12",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "13",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "14",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "15",

//     },
//     {
//         "id": "68f65152-2b7a-4d6e-b0d3-08dc4fc92625",
//         "name": "1",
//     },
//     {
//         "id": "2402d695-1607-4133-f6cc-08dc4fd6c936",
//         "name": "2",
//     },
//     {
//         "id": "a8e83467-9bd6-4dd0-1de0-08dc4fd8e0ab",
//         "name": "3",
//     },
//     {
//         "id": "e5b83853-c2c1-48e4-4ada-08dc50ecaa00",
//         "name": "4",
//     },
//     {
//         "id": "af25601c-045f-4935-d9b4-08dc50f580fd",
//         "name": "5",
//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "6",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "7",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "8",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "9",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "10",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "11",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "12",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "13",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "14",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "15",

//     }, {
//         "id": "68f65152-2b7a-4d6e-b0d3-08dc4fc92625",
//         "name": "1",
//     },
//     {
//         "id": "2402d695-1607-4133-f6cc-08dc4fd6c936",
//         "name": "2",
//     },
//     {
//         "id": "a8e83467-9bd6-4dd0-1de0-08dc4fd8e0ab",
//         "name": "3",
//     },
//     {
//         "id": "e5b83853-c2c1-48e4-4ada-08dc50ecaa00",
//         "name": "4",
//     },
//     {
//         "id": "af25601c-045f-4935-d9b4-08dc50f580fd",
//         "name": "5",
//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "6",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "7",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "8",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "9",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "10",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "11",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "12",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "13",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "14",

//     },
//     {
//         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
//         "name": "15",

//     },
// ]
// // // for dev
// return Promise.resolve(games.slice(currPage * 6, currPage * 6 + 6))