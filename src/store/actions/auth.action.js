import { authService } from "../../services/auth.service.js";
import { SET_LOGGEDIN_USER } from "../reducers/auth.reducer.js";

import { store } from '../store.js'

export async function login(credentials) {
    console.log('action login')
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