import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { FilterByName } from "./FilterByName"
import { ScoreEdit } from "./ScoreEdit"
import { gameService } from "../services/game.service"
import { utilService } from "../services/util.service"

export function AdminGroups() {
    const [groups, setGroups] = useState(null)
    const [filterBy, setFilterBy] = useState({ name: '' })
    const { gameId } = useParams();

    const loadGroups = useCallback(async () => {
        try {
            const groups = await gameService.getGameGroups(gameId, filterBy)
            setGroups(groups)
        }
        catch (err) {
            console.log('err:', err)
        }
    }, [gameId, filterBy])

    const loadGroupsDebounced = useCallback(utilService.debounce(loadGroups, 300), [loadGroups])

    useEffect(() => {
        loadGroupsDebounced()
    }, [filterBy, loadGroupsDebounced])

    function onFilterGroups(ev) {
        ev.preventDefault()
        loadGroupsDebounced()
    }

    function handleChange(ev) {
        const { value, name } = ev.target
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    async function onUpdateScore(groupId, diff) {
        const group = groups.find(group => group.id === groupId)
        const isUpdated = await gameService.updateGroup(gameId, groupId, diff)
        group.adminAdditionalScore = (isUpdated) ? group.adminAdditionalScore + +diff : group.adminAdditionalScore
        setGroups(groups => groups.map(g => g.id === groupId ? group : g))
    }

    if (!groups) return (<p>There are no groups to show.</p>)
    return (
        <section className="admin-groups">
            <h1>Groups</h1>

            <FilterByName onSubmitFilter={onFilterGroups} filterBy={filterBy} handleChange={handleChange} />

            <ul className="groups-container">
                {groups.map((group, i) => <li key={i}>
                    {group.name}
                    <div>
                        <span>{group.adminAdditionalScore}</span>
                    </div>

                    <ScoreEdit id={group.id} onUpdateScore={onUpdateScore} />
                </li>)}
            </ul>

        </section>
    )
}
