import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { demoDataService } from './demoData.service.js'

const BASE_URL = 'Game/'

export const gameService = {
    getGames,
    getGameById,
    save,
    remove,
    getActivitiesOfGame,
    getEmptyGame,
    getEmptyGroup,
    getEmptyStage,
    getEmptyActivity,
    // getGames2
}

// get demo data
// work
async function getGames(loggedinUser) {
    const str = loggedinUser?.checkAdmin ? 'Admin' : 'User'
    return httpService.get(`${str}/Games`)

    // for dev
    // return Promise.resolve([
    //     {
    //         "id": "68f65152-2b7a-4d6e-b0d3-08dc4fc92625",
    //         "name": "Test7 Game",
    //         "createdDate": "2024-03-29T10:20:52.2961654",
    //         "updatedDate": "2024-03-21T23:26:08.6284508",
    //         "isDeleted": false,
    //         "activities": null,
    //         "players": null,
    //         "groups": null,
    //         "themeId": 0,
    //         "themeColors": null,
    //         "iconId": null,
    //         "description": null,
    //         "activityTimingType": 0,
    //         "admins": null,
    //         "adminData": null
    //     },
    //     {
    //         "id": "2402d695-1607-4133-f6cc-08dc4fd6c936",
    //         "name": "Test7 Game",
    //         "createdDate": "2024-03-29T12:01:10.8405715",
    //         "updatedDate": "2024-03-21T23:26:08.6284508",
    //         "isDeleted": false,
    //         "activities": null,
    //         "players": null,
    //         "groups": null,
    //         "themeId": 0,
    //         "themeColors": null,
    //         "iconId": null,
    //         "description": null,
    //         "activityTimingType": 0,
    //         "admins": null,
    //         "adminData": null
    //     },
    //     {
    //         "id": "a8e83467-9bd6-4dd0-1de0-08dc4fd8e0ab",
    //         "name": "Test11 Game",
    //         "createdDate": "2024-03-29T12:13:27.6960581",
    //         "updatedDate": "2024-03-21T23:26:08.6284508",
    //         "isDeleted": false,
    //         "activities": null,
    //         "players": null,
    //         "groups": null,
    //         "themeId": 0,
    //         "themeColors": null,
    //         "iconId": null,
    //         "description": null,
    //         "activityTimingType": 0,
    //         "admins": null,
    //         "adminData": null
    //     },
    //     {
    //         "id": "e5b83853-c2c1-48e4-4ada-08dc50ecaa00",
    //         "name": "het",
    //         "createdDate": "2024-03-30T22:11:37.7031187",
    //         "updatedDate": "2024-03-30T22:19:38.6043091",
    //         "isDeleted": false,
    //         "activities": null,
    //         "players": null,
    //         "groups": null,
    //         "themeId": 0,
    //         "themeColors": null,
    //         "iconId": null,
    //         "description": null,
    //         "activityTimingType": 0,
    //         "admins": null,
    //         "adminData": null
    //     },
    //     {
    //         "id": "af25601c-045f-4935-d9b4-08dc50f580fd",
    //         "name": "Tssssssssssss5 Game",
    //         "createdDate": "2024-03-30T23:10:53.738908",
    //         "updatedDate": "2024-03-30T23:25:13.5315538",
    //         "isDeleted": false,
    //         "activities": null,
    //         "players": null,
    //         "groups": null,
    //         "themeId": 0,
    //         "themeColors": null,
    //         "iconId": null,
    //         "description": null,
    //         "activityTimingType": 0,
    //         "admins": null,
    //         "adminData": null
    //     },
    //     {
    //         "id": "779cf2c1-3529-4db2-366b-08dc51029963",
    //         "name": "Tessssssssssssssssssss Game",
    //         "createdDate": "2024-03-31T00:44:38.3820653",
    //         "updatedDate": "2024-03-21T23:26:08.6284508",
    //         "isDeleted": false,
    //         "activities": null,
    //         "players": null,
    //         "groups": null,
    //         "themeId": 0,
    //         "themeColors": null,
    //         "iconId": null,
    //         "description": null,
    //         "activityTimingType": 0,
    //         "admins": null,
    //         "adminData": null
    //     }
    // ])
}

async function getGameById(gameId) {
    // ! Avishai doesn't work
    // return httpService.get(BASE_URL + gameId)

    // return demoDataService.getGame2()
    return demoDataService.getGame1()
}

async function remove(gameId) {
    return httpService.delete(BASE_URL + gameId)
}

async function save(game) {
    console.log('game service', game)

    if (game.id) {
        return httpService.put(BASE_URL + game.id, game)
    } else {
        // work
        return httpService.post('Game', game)
    }
}

async function getActivitiesOfGame() {

}

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
        gameStartTimestamp: 0, // after form // e
        gameEndTimestamp: 0, // after form // e
        themeColors: ['#ffffff', '#9e9e9e', '#000000'], // v // e
        icon: null, // e
        groups: null, // v
        gameType: '', // stages or activities v 
        activityProgressType: 'open', // open/ time/ progress v
        admins: [], // v // e
        textBefore: '', // v //e
        textAfter: '', // v //e
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
        stageStartTimestamp: 0, // after form - if the game.activityProgressType === onTime
        stageEndTimestamp: 0, // after form - if the game.activityProgressType === onTime
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
        activityStartTimestamp: 0, // after form - if the game.activityProgressType === onTime // e
        activityEndTimestamp: 0, // after form - if the game.activityProgressType === onTime // e
        pointsValue: 0, // v //e
        maxError: 0, // v //e
        mediaBefore: null, // {type : image/video , txt:'' , url:''} v //e
        mediaAfter: null, // {type : image/video , txt:'' , url:''} v //e
        textBefore: '', // v //e
        textAfter: '', // v //e
        lifeSaver: null // v [] //e
    }
}

