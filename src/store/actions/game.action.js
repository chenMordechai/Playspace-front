import { gameService } from "../../services/game.service.js";
import { SET_LOGGEDIN_PLAYER } from "../reducers/auth.reducer.js";

import { store } from '../store.js'

export async function getGames(isAdmin, filterBy, sortBy, currPage) {
    try {
        const games = await gameService.getGames(isAdmin, filterBy, sortBy, currPage)
        // store.dispatch({ type: SET_GAMES, games })
        return games
    } catch (err) {
        console.log('game action -> Cannot load games', err)
        throw err
    }
}

export async function getPlayers(gameId, filterBy) {
    try {
        const players = await gameService.getPlayers(gameId, filterBy)
        return players
    } catch (err) {
        console.log('game action -> Cannot load players', err)
        throw err
    }
}

export async function getGroups(gameId, filterBy) {
    try {
        const groups = await gameService.getGroups(gameId, filterBy)
        return groups
    } catch (err) {
        console.log('game action -> Cannot load groups', err)
        throw err
    }
}

export async function getGameById(gameId) {
    try {
        const game = await gameService.getGameById(gameId)
        // store.dispatch({ type: SET_GAME, game })
        return game
    } catch (err) {
        console.log('user action -> Cannot get game', err)
        throw err
    }
}

export async function getShallowGameById(gameId) {
    try {
        const shallowGame = await gameService.getShallowGameById(gameId)
        // store.dispatch({ type: SET_GAME, game })
        return shallowGame
    } catch (err) {
        console.log('user action -> Cannot get game', err)
        throw err
    }
}

export async function addGame(game) {
    try {
        const newGame = await gameService.save(game)
        return newGame
    } catch (err) {
        console.log('user action -> Cannot add game', err)
        throw err
    }
}

export async function deleteGame(gameId) {
    try {
        await gameService.remove(gameId)
    } catch (err) {
        console.log('user action -> Cannot remove game', err)
        throw err
    }
}

export async function checkGameAnswer(answerData, currectAnswer) {
    const { loggedinUser } = store.getState().authModule
    console.log('loggedinUser:', loggedinUser)
    const { loggedinPlayer } = store.getState().authModule
    try {
        let player
        if (loggedinUser?.isAdmin) {
            console.log('user is admin')
            player = await gameService.adminCheckAnswer(loggedinPlayer, answerData)
        } else {
            player = await gameService.checkAnswer(answerData)
        }
        // store.dispatch({ type: SET_LOGGEDIN_PLAYER, player })
        return player
    }
    catch (err) {
        console.log('user action -> Cannot get player', err)
        throw err
    }


}

export async function usingLifeSaver(answerData) {
    try {
        const player = await gameService.usingLifeSaver(answerData)
        store.dispatch({ type: SET_LOGGEDIN_PLAYER, player })
        return player
    } catch (err) {
        console.log('user action -> Cannot get player', err)
        throw err
    }
}


