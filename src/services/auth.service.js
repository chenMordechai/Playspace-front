import Axios from 'axios'

const axios = Axios.create({
    // withCredentials: true
    headers: {
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        // 'Authorization': 'Bearer <token_here>'
    }
})

import { httpService } from './http.service.js'

const BASE_URL_AUTH = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const authService = {
    login,
    adminLogin,
    logout,
    signup,
    getLoggedinUser,
    getEmptyCredentials
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

    // https://62.171.155.24/api/auth/AdminLogin?password=Aa1234$%

    const res = await axios({
        url: `https://62.171.155.24/api/auth/AdminLogin`,
        method: 'GET',
        params: {
            password: 'Aa1234$%'
        },

    })
    console.log(res.data)

    // const response = await fetch('https://62.171.155.24/api/auth/AdminLogin', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    // })
    // console.log(await response.json())

    // const userAdmin = await httpService.get(`${BASE_URL_AUTH}AdminLogin`, adminCred)
    // console.log('userAdmin:', userAdmin)

    // userAdmin.isAdmin = true  // for dev
    // userAdmin.checkAdmin = true // for dev 
    // if (userAdmin) {
    //     _setLoggedinUser(userAdmin)
    //     return userAdmin
    // }
}

async function logout() {
    localStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    // missing api for logout
    // return await httpService.post(BASE_URL_AUTH + 'logout')

}

async function signup({ username, password, fullname, email }) {
    const userToSave = {
        username,
        password,
        fullname,
        email
    }
    // console.log('userToSave:', userToSave)
    const user = await httpService.post(BASE_URL_AUTH + 'signup', userToSave)
    _setLoggedinUser(user)
    return user

}



function getLoggedinUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN))
}


function _setLoggedinUser(user) {
    // const { userId, name , isAdmin } = user
    // const userToSave = { userId, name , isAdmin }
    localStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}

function getEmptyCredentials() {
    return {
        email: 'AnatShapira@gmail.com',
        name: 'Anat Shapira',
        password: 'Aa1234$%'
    }
}
