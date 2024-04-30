import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getGames } from "../store/actions/game.action"

export function User() {

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    console.log('loggedinUser:', loggedinUser)
    const [userGames, setUserGames] = useState(null)

    useEffect(() => {
        init()
    }, [])

    async function init() {
        try {
            // ! Avishai 
            const userGames = await getGames(loggedinUser)
            console.log('userGames:', userGames)
            setUserGames(userGames)

        } catch (err) {
            console.log('err:', err)
        }
    }


    return (
        <section className="user">
            User
        </section>
    )




}