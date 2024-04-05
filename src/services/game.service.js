import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const BASE_URL = 'Game/'

export const gameService = {
    getGames,
    getById,
    save,
    remove,
    getActivitiesOfGame,
    getEmptyGame,
    getEmptyTeam,
    getEmptyStage,
    getEmptyQuestion,
    getGames2
}

async function getGames2() {
    return await httpService.getGames();
}

async function getGames(loggedinUser) {
    const str = loggedinUser?.checkAdmin ? 'Admin' : 'User'
    // doesn't work
    // return httpService.get(`${str}/Games`)

    // for dev
    return Promise.resolve([
        {
            "id": "68f65152-2b7a-4d6e-b0d3-08dc4fc92625",
            "name": "Test7 Game",
            "createdDate": "2024-03-29T10:20:52.2961654",
            "updatedDate": "2024-03-21T23:26:08.6284508",
            "isDeleted": false,
            "activities": null,
            "players": null,
            "groups": null,
            "themeId": 0,
            "themeColors": null,
            "iconId": null,
            "description": null,
            "activityTimingType": 0,
            "admins": null,
            "adminData": null
        },
        {
            "id": "2402d695-1607-4133-f6cc-08dc4fd6c936",
            "name": "Test7 Game",
            "createdDate": "2024-03-29T12:01:10.8405715",
            "updatedDate": "2024-03-21T23:26:08.6284508",
            "isDeleted": false,
            "activities": null,
            "players": null,
            "groups": null,
            "themeId": 0,
            "themeColors": null,
            "iconId": null,
            "description": null,
            "activityTimingType": 0,
            "admins": null,
            "adminData": null
        },
        {
            "id": "a8e83467-9bd6-4dd0-1de0-08dc4fd8e0ab",
            "name": "Test11 Game",
            "createdDate": "2024-03-29T12:13:27.6960581",
            "updatedDate": "2024-03-21T23:26:08.6284508",
            "isDeleted": false,
            "activities": null,
            "players": null,
            "groups": null,
            "themeId": 0,
            "themeColors": null,
            "iconId": null,
            "description": null,
            "activityTimingType": 0,
            "admins": null,
            "adminData": null
        },
        {
            "id": "e5b83853-c2c1-48e4-4ada-08dc50ecaa00",
            "name": "het",
            "createdDate": "2024-03-30T22:11:37.7031187",
            "updatedDate": "2024-03-30T22:19:38.6043091",
            "isDeleted": false,
            "activities": null,
            "players": null,
            "groups": null,
            "themeId": 0,
            "themeColors": null,
            "iconId": null,
            "description": null,
            "activityTimingType": 0,
            "admins": null,
            "adminData": null
        },
        {
            "id": "af25601c-045f-4935-d9b4-08dc50f580fd",
            "name": "Tssssssssssss5 Game",
            "createdDate": "2024-03-30T23:10:53.738908",
            "updatedDate": "2024-03-30T23:25:13.5315538",
            "isDeleted": false,
            "activities": null,
            "players": null,
            "groups": null,
            "themeId": 0,
            "themeColors": null,
            "iconId": null,
            "description": null,
            "activityTimingType": 0,
            "admins": null,
            "adminData": null
        },
        {
            "id": "779cf2c1-3529-4db2-366b-08dc51029963",
            "name": "Tessssssssssssssssssss Game",
            "createdDate": "2024-03-31T00:44:38.3820653",
            "updatedDate": "2024-03-21T23:26:08.6284508",
            "isDeleted": false,
            "activities": null,
            "players": null,
            "groups": null,
            "themeId": 0,
            "themeColors": null,
            "iconId": null,
            "description": null,
            "activityTimingType": 0,
            "admins": null,
            "adminData": null
        }
    ])
}

async function getById(postId) {
    return httpService.get(BASE_URL + postId)
}

async function remove(postId) {
    return httpService.delete(BASE_URL + postId)
}

async function save(post) {
    if (post._id) {
        return httpService.put(BASE_URL + post._id, post)
    } else {
        return httpService.post(BASE_URL, post)
    }
}

async function getActivitiesOfGame() {

}

function getEmptyGame() {
    return {
        name: '',
        dateStart: '',
        timeStart: '',
        dateEnd: '',
        timeEnd: '',
        colors: ['#ffffff', '#9e9e9e', '#000000'],
        logo: '',
        teams: null,
        guidelines: '',
        type: '',
        stages: null,

    }
}

function getEmptyTeam() {
    return {
        id: utilService.makeId(),
        name: ''
    }
}
function getEmptyStage() {
    return {
        id: utilService.makeId(),
        time: '',
        questions: null,
        numOfMistakes: '',
        isRequired: false
    }
}
function getEmptyQuestion() {
    return {
        id: utilService.makeId(),
        type: '',
        txt: '',
        answer: '',
        options: [],
        score: 0,
        media: null,
        moreContent: '',
        moreContentAfter: '',
        lifeSaver: []
    }
}