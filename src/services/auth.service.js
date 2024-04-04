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
    getLoggedinUser,
    getLoggedinPlayer,
    getEmptyCredentials,
    getEmptySignupCred
}

// work
async function login(userCred) {
    const user = await httpService.get(`${BASE_URL_AUTH}Login`, userCred)
    console.log('user:', user)
    user.isAdmin = true  // for dev
    if (user) {
        _setLoggedinUser(user)
        return user
    }
}

async function adminLogin(adminCred) {
    console.log('adminCred:', adminCred)
    adminCred = { password: 'Aa1234$%' }

    ////////////////////////////////////////////////////////
    // api call doesn't work
    // const userAdmin = await httpService.get(`${BASE_URL_AUTH}AdminLogin`, adminCred)
    // console.log('userAdmin:', userAdmin)

    // userAdmin.isAdmin = true  // for dev
    // userAdmin.checkAdmin = true // for dev 
    // if (userAdmin) {
    const userAdmin = {
        userId: "78ddbb27-9fa5-4e24-2127-08dc4f5ff903",
        name: "anat shapira",
        isAdmin: true,
        checkAdmin: true
    } // for dev
    _setLoggedinUser(userAdmin)
    //     return userAdmin
    // }

    ////////////////////////////////////////////////////////

    // https://62.171.155.24/api/auth/AdminLogin?password=Aa1234$%

    // const res = await axios({
    //     url: `https://62.171.155.24/api/auth/AdminLogin`,
    //     method: 'GET',
    //     params: {
    //         password: 'Aa1234$%'
    //     },

    // })
    // console.log(res.data)

    ////////////////////////////////////////////////////////

    // const response = await fetch('https://62.171.155.24/api/auth/AdminLogin', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    // })
    // console.log(await response.json())

}

// logout for user and admin
async function logout() {
    localStorage.removeItem(STORAGE_KEY_USER)
    localStorage.removeItem(STORAGE_KEY_PLAYER)
    // missing api for logout
    // return await httpService.post(BASE_URL_AUTH + 'logout')

}

// for players
async function signup({ email, gameId, groupId, name, password }) {
    const playerToSave = { email, gameId, groupId, name, password }

    const player = await httpService.post(BASE_URL_AUTH + 'Signup', playerToSave)

    // const response = await fetch('https://62.171.155.24/api/auth/Signup', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(playerToSave)
    // });
    // const player = await response.json()

    console.log('player:', player)
    _setLoggedinPlayer(player)
    return player

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
        password: 'Aa1234$%'
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


