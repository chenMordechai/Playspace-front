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

const BASE_URL_AUTH = 'auth/'
const STORAGE_KEY_USER = 'loggedinUser'
const STORAGE_KEY_PLAYER = 'loggedinPlayer'

export const authService = {
    login,
    adminLogin,
    logout,
    signup,
    getAdmins,
    getLoggedinUser,
    getLoggedinPlayer,
    getEmptyCredentials,
    getEmptySignupCred
}

// work
async function login(userCred) {
    const user = await httpService.post(`${BASE_URL_AUTH}Login`, userCred)
    user.isAdmin = true  // for dev
    if (user) {
        _setLoggedinUser(user)
        return user
    }
}

// work
async function adminLogin(adminCred) {
    const user = await httpService.post(`${BASE_URL_AUTH}AdminLogin`, adminCred)
    user.checkAdmin = true  // for dev
    if (user) {
        _setLoggedinUser(user)
        return user
    }
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
async function signup({ email, gameId, groupId, name, password }) {
    const playerToSave = { email, gameId, groupId, name, password }

    const player = await httpService.post(BASE_URL_AUTH + 'Signup', playerToSave)

    _setLoggedinPlayer(player)
    return player

}

async function getAdmins() {

    const admins = await httpService.get('Game/Admins')
    return admins

    return Promise.resolve([
        {
            userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: 'Anat Shapira',
            isAdmin: true
        }, {
            userId: "3fa85f64-5717-4562-b3fc-2c963frrrrr",
            name: 'Adam',
            isAdmin: true
        }])

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
        email: 'AnatShapira@gmail.com',
        name: 'Anat Shapira',
        // password: ''
        // password: 'Aa1234$%'
    }
}

function getEmptySignupCred() {
    return {
        email: 'BBBB@GMAIL.COM',
        name: 'BBBB',
        password: 'string$%',
        // gameId: "779CF2C1-3529-4DB2-366B-08DC51029963",
        // groupId: 0
    }
}


