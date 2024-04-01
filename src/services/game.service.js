import { httpService } from './http.service.js'

const BASE_URL = 'Game/'

export const gameService = {
    query,
    getById,
    save,
    remove,
    getActivitiesOfGame,
    getEmptyGame,
}

async function query(filterBy = {}, sortBy = {}) {
    // filterBy = { ...filterBy, ...sortBy }
    return httpService.get(BASE_URL, filterBy)
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
        stages: [],

    }
}