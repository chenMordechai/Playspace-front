import { useState, useEffect } from "react"

import { PlayerEdit } from '../cmps/PlayerEdit'

export function AdminGroups() {
    const [groups, setGroups] = useState(null)

    useEffect(() => {

        //! Avishai get groups 
        getGroups()

    }, [])


    function getGroups() {
        const groups = [
            {
                id: "iw5k9",
                name: "קבוצה א",
                adminAdditionalScore: 0,
            },
            {
                id: "iw5k8",
                name: "קבוצה ב",
                adminAdditionalScore: 0,
            },
            {
                id: "iw5k9",
                name: "קבוצה א",
                adminAdditionalScore: 0,
            },
            {
                id: "iw5k8",
                name: "קבוצה ב",
                adminAdditionalScore: 0,
            },
            {
                id: "iw5k9",
                name: "קבוצה א",
                adminAdditionalScore: 0,
            },
            {
                id: "iw5k8",
                name: "קבוצה ב",
                adminAdditionalScore: 0,
            },
            {
                id: "iw5k9",
                name: "קבוצה א",
                adminAdditionalScore: 0,
            },
            {
                id: "iw5k8",
                name: "קבוצה ב",
                adminAdditionalScore: 0,
            },
            {
                id: "iw5k9",
                name: "קבוצה א",
                adminAdditionalScore: 0,
            },
            {
                id: "iw5k8",
                name: "קבוצה ב",
                adminAdditionalScore: 0,
            },
            {
                id: "iw5k9",
                name: "קבוצה א",
                adminAdditionalScore: 0,
            },
            {
                id: "iw5k8",
                name: "קבוצה ב",
                adminAdditionalScore: 0,
            },
        ]

        setGroups(groups)
    }

    if (!groups) return ''
    return (
        <section className="admin-groups">
            <h1>Groups</h1>

            <ul className="groups-container">
                {groups.map((group, i) => <li key={i}>
                    {group.name}
                </li>)}
            </ul>

        </section>
    )
}