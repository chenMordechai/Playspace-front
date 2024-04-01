import { combineReducers, compose, legacy_createStore as createStore } from "redux"
// import { userService } from "../services/user.service.js"
import { userReducer } from "./reducers/user.reducer.js"
import { activityReducer } from "./reducers/activity.reducer.js"
import { gameReducer } from "./reducers/game.reducer.js"



const rootReducer = combineReducers({
    userModule: userReducer,
    activityModule: activityReducer,
    gameModule: gameReducer,
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())




