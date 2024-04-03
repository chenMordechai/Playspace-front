import { httpService } from './http.service.js'

const BASE_URL_AUTH = 'Auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const authService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getEmptyCredentials
}

async function login(userCred) {
    const user = await httpService.get(`${BASE_URL_AUTH}Login`, userCred)
    console.log('user:', user)
    if (user) {
        _setLoggedinUser(user)
        return user
    }

    // const response = await fetch('https://62.171.155.24/api/Auth/Login?email=AAA2A2@GMAIL.COM&name=AAAA', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     // body: JSON.stringify({ username, password })
    // });
    // console.log('response:', response)
    // const user = await httpService.get('https://62.171.155.24/api/Auth/Login?email=AAA2A2@GMAIL.COM&name=AAAA')
    // const user = await httpService.get(`${BASE_URL_AUTH}Login?email=${userCred.email}&name=${userCred.name}`)


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

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return await httpService.post(BASE_URL_AUTH + 'logout')

}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}


function _setLoggedinUser(user) {
    const { userId, name } = user
    const userToSave = { userId, name }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        email: 'AAA2A2@GMAIL.COM',
        name: 'AAAA',
    }
}
