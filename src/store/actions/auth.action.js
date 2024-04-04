import { authService } from "../../services/auth.service.js";
import { SET_LOGGEDIN_USER } from "../reducers/auth.reducer.js";

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
    console.log('adminLogin', credentials)
    try {
        const { password } = credentials
        const adminCred = { password }
        const user = await authService.adminLogin(adminCred)
        store.dispatch({ type: SET_LOGGEDIN_USER, user })
        console.log('user:', user)
        return user
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
