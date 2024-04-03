import { authService } from "../../services/auth.service.js";

export const SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER'


const initialState = {
    loggedinUser: authService.getLoggedinUser(),

}

export function authReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_LOGGEDIN_USER:
            return { ...state, loggedinUser: action.user }
        default:
            return state;
    }
}