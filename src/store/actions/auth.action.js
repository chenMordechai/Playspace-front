import { authService } from "../../services/auth.service.js";
import { SET_LOGGEDIN_USER ,SET_LOGGEDIN_PLAYER} from "../reducers/auth.reducer.js";

import { store } from '../store.js'

export async function login(credentials) {
    try {
        const user = await authService.login(credentials)
        store.dispatch({ type: SET_LOGGEDIN_USER, user })
        console.log('user:', user)
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

        const user = await authService.adminLogin(adminCred)
        const userAdmin = user;
        // const userAdmin = {
        //     userId: "78ddbb27-9fa5-4e24-2127-08dc4f5ff903",
        //     name: "anat shapira",
        //     isAdmin: true,
        //     checkAdmin: true
        // } // for dev

        store.dispatch({ type: SET_LOGGEDIN_USER, user: userAdmin })
        console.log('userAdmin:', userAdmin)
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
    console.log('credentials:', credentials)
    try {
        const player = await authService.signup(credentials)
        store.dispatch({ type: SET_LOGGEDIN_PLAYER, player })
        console.log('player:', player)
        return player
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}
