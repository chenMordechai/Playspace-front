import { useEffect } from "react"
import { loadGames } from "../store/actions/game.action.js"



export function Home() {

    useEffect(() => {
        init()
    }, [])

    async function init() {
        try {
            // await loadGames()
        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
        <section className="home">
            <h1>Home</h1>
        </section>
    )
}