import { useState, useEffect } from "react"

import { FilterByName } from "./FilterByName"
import { ScoreEdit } from "./ScoreEdit"

export function AdminGroups() {
    const [groups, setGroups] = useState(null)
    const [filterBy, setFilterBy] = useState({ name: '' })

    useEffect(() => {

        //! Avishai get groups by filter
        getGroups(filterBy)

    }, [filterBy])

    function getGroups() {
        const groups = [
            {
                id: "iw5k9",
                name: "קבוצה א",
                adminAdditionalScore: 0,
                score: 1000
            },
            {
                id: "iw5k8",
                name: "קבוצה ב",
                adminAdditionalScore: 0,
                score: 1000
            },
            {
                id: "iw5k9",
                name: "קבוצה א",
                adminAdditionalScore: 0,
                score: 1040
            },
            {
                id: "iw5k8",
                name: "קבוצה ב",
                adminAdditionalScore: 0,
                score: 1436
            },
            {
                id: "iw5k9",
                name: "קבוצה א",
                adminAdditionalScore: 0,
                score: 1430
            },
            {
                id: "iw5k8",
                name: "קבוצה ב",
                adminAdditionalScore: 0,
                score: 1320
            },
            {
                id: "iw5k9",
                name: "קבוצה א",
                adminAdditionalScore: 0,
                score: 1230
            },
            {
                id: "iw5k8",
                name: "קבוצה ב",
                adminAdditionalScore: 0,
                score: 1000
            },

        ]

        setGroups(groups)
    }

    function onFilterGroups(ev) {
        console.log('onFilterGroups')
        ev.preventDefault()
    }

    function handlaChange(ev) {
        const { value, name } = ev.target
        setFilterBy({ [name]: value })
    }

    function onUpdateScore(groupId, diff) {
        console.log('onUpdateScore')
        //! Avishay update group score
    }

    if (!groups) return ''
    return (
        <section className="admin-groups">
            <h1>Groups</h1>

            <FilterByName onSubmitFilter={onFilterGroups} filterBy={filterBy} handlaChange={handlaChange} />

            <ul className="groups-container">
                {groups.map((group, i) => <li key={i}>
                    {group.name}
                    <div>
                        <span>{group.score}</span>
                    </div>

                    <ScoreEdit id={group.id} onUpdateScore={onUpdateScore} />
                </li>)}
            </ul>

        </section>
    )
}