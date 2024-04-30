import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getGames } from "../store/actions/game.action"

// after user login
export function User() {

    const loggedinUser = useSelector(storeState => storeState.authModule.loggedinUser)
    console.log('loggedinUser:', loggedinUser)
    const [userGames, setUserGames] = useState(null)

    useEffect(() => {
        init()
    }, [])

    async function init() {
        try {
            // work
            const userGames = await getGames(loggedinUser)
            console.log('userGames:', userGames)
            setUserGames(userGames)

        } catch (err) {
            console.log('err:', err)
        }
    }


    return (
        <section className="user">
            <section className="user-info-container">
                <div className="user-info">
                    <div className="img-container">
                        <img src="" alt="" />
                    </div>
                    <div className="name-container">
                        <span>{loggedinUser.name}</span>
                        <span>email</span>
                    </div>

                </div>
                <button>
                    <img src="" alt="" />
                    <span>Join a group</span>
                </button>

            </section>
        </section>
    )




}