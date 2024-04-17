import {useState,useEffect} from 'react'
import { useParams } from "react-router-dom"

import {PlayerEdit} from '../cmps/PlayerEdit'

export function GameGroups (){
    const [groups, setGroups] = useState(null)
   

    const { gameId } = useParams()

    useEffect(() => {
        console.log('gameId:', gameId)

        // Avishai get groups with players
        getGroupsWithPlayers()

    }, [])


    function getGroupsWithPlayers(){
        const groups = [
            {
                id: "iw5k9",
                name: "קבוצה א",
                adminAdditionalScore: 0,
                players:[{
                    id: "GR1rkr",
                    name: "שחקן א",
                    gameId: "779CF2C1-3529-4DB2-366B-08DC51029963",
                    groupId: "iw5k9",
                    score:100
                },{
                    id: "GR1rke",
                    name: "שחקן ב",
                    gameId: "779CF2C1-3529-4DB2-366B-08DC51029963",
                    groupId: "iw5k9",
                    score:100
                },{
                    id: "GR1rky",
                    name: "שחקן ג",
                    gameId: "779CF2C1-3529-4DB2-366B-08DC51029963",
                    groupId: "iw5k9",
                    score:100
                }]
            },
            {
                id: "iw5k8",
                name: "קבוצה ב",
                adminAdditionalScore: 0,
                players:[{
                    id: "GR1rkw",
                    name: "שחקן ד",
                    gameId: "779CF2C1-3529-4DB2-366B-08DC51029963",
                    groupId: "iw5k8",
                    score:100
                },{
                    id: "GR1rka",
                    name: "שחקן ה",
                    gameId: "779CF2C1-3529-4DB2-366B-08DC51029963",
                    groupId: "iw5k8",
                    score:100
                },{
                    id: "GR1rkv",
                    name: "שחקן ו",
                    gameId: "779CF2C1-3529-4DB2-366B-08DC51029963",
                    groupId: "iw5k8",
                    score:100
                }]
            },
        ]

        setGroups(groups)
    }
    function handleChange(ev){
      const  {value} = ev.target
      setScoreToEdit(value)

    }

    if(!groups) return
    return (
        <section className="game-groups rtl">
            <h1>Game Groups</h1>

            <ul className="groups-container">
                    {groups.map(group => <li key={group.id}>
                        {group.name}

                        <ul>
                    {group.players.map(player=> 
                        <PlayerEdit key={player.id} player={player} handleChange={handleChange}/>)}
                        </ul>
                    </li>)}
                </ul>
        </section>
    )
}