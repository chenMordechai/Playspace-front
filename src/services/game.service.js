import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const BASE_URL = 'Game/'

export const gameService = {
    getAdminGames,
    getById,
    save,
    remove,
    getActivitiesOfGame,
    getEmptyGame,
    getEmptyTeam,
    getEmptyStage,
    getEmptyQuestion,
}

async function getAdminGames(filterBy = {}, sortBy = {}) {
    // filterBy = { ...filterBy, ...sortBy }
    return httpService.get('Admin/Games', filterBy)
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
        colors: null,
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