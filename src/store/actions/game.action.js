import { gameService } from "../../services/game.service.js";

export async function getGames(loggedinUser) {
    try {
        const games = await gameService.getGames(loggedinUser)
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
    } catch (err) {
        console.log('user action -> Cannot get game', err)
        throw err
    }
}

