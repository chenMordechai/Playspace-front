import { combineReducers, compose, legacy_createStore as createStore } from "redux"
// import { userService } from "../services/user.service.js"
import { authReducer } from "./reducers/auth.reducer.js"
import { activityReducer } from "./reducers/activity.reducer.js"
import { gameReducer } from "./reducers/game.reducer.js"



const rootReducer = combineReducers({
    authModule: authReducer,
    activityModule: activityReducer,
    gameModule: gameReducer,
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())




