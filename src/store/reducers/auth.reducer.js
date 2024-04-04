import { authService } from "../../services/auth.service.js";

export const SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER'
export const SET_LOGGEDIN_PLAYER = 'SET_LOGGEDIN_PLAYER'


const initialState = {
    loggedinUser: authService.getLoggedinUser(),
    loggedinPlayer: authService.getLoggedinPlayer(),

}

export function authReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_LOGGEDIN_USER:
            return { ...state, loggedinUser: action.user }
        case SET_LOGGEDIN_PLAYER:
            return { ...state, loggedinPlayer: action.player }
        default:
            return state;
    }
}