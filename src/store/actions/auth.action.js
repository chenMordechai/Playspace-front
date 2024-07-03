import { authService } from "../../services/auth.service.js";

import { SET_LOGGEDIN_USER, SET_LOGGEDIN_PLAYER, SET_LOGGEDIN_PLAYER_GROUP } from "../reducers/auth.reducer.js";

import { store } from '../store.js'

// get user
export async function getUser() {
    try {
        const user = await authService.getUser()
        store.dispatch({ type: SET_LOGGEDIN_USER, user })
        return user
    } catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
}



export async function login(credentials) {
    try {
        const user = await authService.login(credentials)
        store.dispatch({ type: SET_LOGGEDIN_USER, user })
        return user
    } catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
}

export async function adminLogin(credentials) {
    try {
        const { password } = credentials
        const adminCred = { password }
        const userAdmin = await authService.adminLogin(adminCred)
        store.dispatch({ type: SET_LOGGEDIN_USER, user: userAdmin })
        return userAdmin
    } catch (err) {
        console.log('user actions -> Cannot admin login', err)
        throw err
    }
}

export async function logout() {
    try {
        await authService.logout()
        store.dispatch({ type: SET_LOGGEDIN_USER, user: null })
    } catch (err) {
        console.error('user actions -> Cannot logout:', err)
        throw err
    }
}


export async function signup(credentials) {
    try {
        const user = await authService.signup(credentials)
        store.dispatch({ type: SET_LOGGEDIN_USER, player: user })
        return user
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}

export async function isUserExist(credentials) {
    try {
        const res = await authService.isUserExist(credentials)
        return res
    } catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
}

export async function getPlayer(gameId) {
    try {
        const player = await authService.getPlayer(gameId)
        store.dispatch({ type: SET_LOGGEDIN_PLAYER, player })
        return player
    } catch (err) {
        console.log('user action -> Cannot get player', err)
        throw err
    }
}

export async function getPlayerByCookie() {
    try {
        const player = await authService.getPlayerByCookie()
        store.dispatch({ type: SET_LOGGEDIN_PLAYER, player })
        return player
    } catch (err) {
        console.log('user action -> Cannot get player', err)
        throw err
    }
}


export async function getAdmins() {
    try {
        const admins = await authService.getAdmins()
        return admins
    } catch (err) {
        console.log('user actions -> Cannot get admins', err)
        throw err
    }
}






