import { gameService } from "../../services/game.service.js";

export async function getAdminGames(filterBy = {}) {
    try {
        const games = await gameService.getAdminGames(filterBy)
        console.log('games:', games)
        // store.dispatch({ type: SET_GAMES, games })
    } catch (err) {
        console.log('game action -> Cannot load games', err)
        throw err
    }
}