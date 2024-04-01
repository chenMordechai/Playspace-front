import { gameService } from "../../services/game.service.js";

export async function loadGames(filterBy = {}) {
    try {
        const games = await gameService.query(filterBy)
        // store.dispatch({ type: SET_GAMES, games })
    } catch (err) {
        console.log('game action -> Cannot load games', err)
        throw err
    }
}