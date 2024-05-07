import { gameService } from "../../services/game.service.js";

export async function getGames(loggedinUser, filterBy, sortBy, currPage) {
    try {
        const games = await gameService.getGames(loggedinUser, filterBy, sortBy, currPage)
        console.log('games:', games)
        // store.dispatch({ type: SET_GAMES, games })
        return games
    } catch (err) {
        console.log('game action -> Cannot load games', err)
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

export async function getPlayer(gameId) {
    try {
        const player = await gameService.getPlayer(gameId)
        return player
    } catch (err) {
        console.log('user action -> Cannot get player', err)
        throw err
    }
}


