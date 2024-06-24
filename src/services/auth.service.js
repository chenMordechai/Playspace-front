// import Axios from 'axios'

// const axios = Axios.create({
//     // withCredentials: true
//     headers: {
//         // 'Content-Type': 'application/json',
//         // 'Accept': 'application/json',
//         // 'Authorization': 'Bearer <token_here>'
//     }
// })

import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const BASE_URL_AUTH = 'auth/'
const STORAGE_KEY_USER = 'loggedinUser'
const STORAGE_KEY_PLAYER = 'loggedinPlayer'

export const authService = {
    getUser,
    login,
    adminLogin,
    logout,
    signup,
    getAdmins,
    getLoggedinUser,
    getLoggedinPlayer,
    getEmptyCredentials,
    getEmptySignupCred,
    getUserData,
    getPlayer
}

// work
async function getUser() {
    const user = await httpService.get(`${BASE_URL_AUTH}User`)
    return user
}

async function login(userCred) {
    const user = await httpService.post(`${BASE_URL_AUTH}Login`, userCred)
    // user.isAdmin = true  // for dev
    // if (user) {
    //     _setLoggedinUser(user)
    return user
    // }
}

// work
async function adminLogin(adminCred) {
    const user = await httpService.post(`${BASE_URL_AUTH}AdminLogin`, adminCred)
    // user.checkAdmin = true  // for dev
    // if (user) {
    //     _setLoggedinUser(user)
    return user
    // }
}

// logout for user and admin
async function logout() {
    localStorage.removeItem(STORAGE_KEY_USER)
    localStorage.removeItem(STORAGE_KEY_PLAYER)
    // missing api for logout
    // return await httpService.post(BASE_URL_AUTH + 'logout')

}

// for players
// work
async function signup({ email, gameId, groupId, name, media }) {
    const playerToSave = { email, gameId, groupId, name, media }

    const user = await httpService.post(BASE_URL_AUTH + 'Signup', playerToSave)

    // demoData:
    // const player = {
    //     id: utilService.makeId(),
    //     email: 'BBBB@GMAIL.COM',
    //     name: 'BBBB',
    //     password: 'string$%',
    //     gameId: "779CF2C1-3529-4DB2-366B-08DC51029963",
    //     // groupId: 0
    // }
    // if (user) {
    //     _setLoggedinUser(user)
    return user
    // }

}

async function getPlayer(gameId) {
    const player = httpService.get(`Game/${gameId}/player`)
    // if (player) {
    //     _setLoggedinPlayer(player)
    //     return player
    // }

}


async function getAdmins() {

    const admins = await httpService.get('Game/Admins')
    return admins

    // return Promise.resolve([
    //     {
    //         userId: "c25ca045-9b0b-4c67-d356-08dc57bf9c72",
    //         name: 'Anat Shapira',
    //         isAdmin: true
    //     }, {
    //         userId: "3fa85f64-5717-4562-b3fc-2c963frrrrr",
    //         name: 'Adam',
    //         isAdmin: true
    //     }])

}

async function getUserData(userId) {
    // ??
    return Promise.resolve({ id: userId })

}




function getLoggedinUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_USER))
}

function getLoggedinPlayer() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_PLAYER))
}

function _setLoggedinUser(user) {
    // const { userId, name , isAdmin } = user
    // const userToSave = { userId, name , isAdmin }
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user))
    return user
}

function _setLoggedinPlayer(player) {
    // const { userId, name , isAdmin } = user
    // const userToSave = { userId, name , isAdmin }
    localStorage.setItem(STORAGE_KEY_PLAYER, JSON.stringify(player))
    return player
}

function getEmptyCredentials() {
    return {
        // email: 'AAAA@GMAIL.COM',
        // name: 'AAAA',
        // email: 'system',
        // name: 'system',
        // // password: ''
        // password: 'system'
        email: 'AnatShapira@gmail.com',
        name: 'Anat Shapira',
        password: 'Aa1234$%'
    }
}

function getEmptySignupCred() {
    return {
        email: '',
        name: '',
        gameId: '',
        media: null,
        groupId: ''
        // email: 'BBBB@GMAIL.COM',
        // name: 'BBBB',
        // gameId: "779CF2C1-3529-4DB2-366B-08DC51029963",
        // groupId: 0
    }
}


