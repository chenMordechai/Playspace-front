import { authService } from "../../services/auth.service.js";

export const SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER'
export const SET_LOGGEDIN_PLAYER = 'SET_LOGGEDIN_PLAYER'
export const SET_LOGGEDIN_PLAYER_GROUP = 'SET_LOGGEDIN_PLAYER_GROUP'


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
        case SET_LOGGEDIN_PLAYER_GROUP:
            return { ...state, loggedinPlayer: { ...state.loggedinPlayer, groupId: action.groupId } }
        default:
            return state;
    }
}