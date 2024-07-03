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
    getPlayer,
    getPlayerByCookie,
    isUserExist
}

// work
async function getUser() {
    return await httpService.get(`${BASE_URL_AUTH}User`)

}

async function login(userCred) {
    return await httpService.post(`${BASE_URL_AUTH}Login`, userCred)
}

// work
async function adminLogin(adminCred) {
    return await httpService.post(`${BASE_URL_AUTH}AdminLogin`, adminCred)
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
    return await httpService.post(BASE_URL_AUTH + 'Signup', playerToSave)
}

async function isUserExist({ email, gameId, name }) {
    const userToCheck = { email, gameId, name }
    return await httpService.post(BASE_URL_AUTH + 'IsUserExist', userToCheck)
}

async function getPlayer(gameId) {
    return httpService.get(`Game/${gameId}/player`)
}

async function getPlayerByCookie() {
    return httpService.get(`Player/GetPlayerByCookie`)
}

async function getAdmins() {
    return await httpService.get('Game/Admins')
}

async function getUserData(userId) {
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
        email: 'system',
        name: 'system',
        // password: ''
        password: 'system'
        // email: 'AnatShapira@gmail.com',
        // name: 'Anat Shapira',
        // password: 'Aa1234$%'
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


