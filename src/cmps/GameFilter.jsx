
export function GameFilter({ filterBy, onSetFilterBy, sortBy, onSetSortBy }) {
    return (
        <section className="game-filter">
            <form>
                <label htmlFor="name">Filter</label>
                <input type="text" id="name" placeholder="game name" name="name" value={filterBy.name} onChange={onSetFilterBy} />
                <br />
                <label htmlFor="sortBy">Sort</label>
                <select name="value" onChange={onSetSortBy} value={sortBy.value}>
                    <option value="name">Name</option>
                    <option value="date">Date</option>
                </select>
                <label htmlFor="desc">Descending</label>
                <input type="checkbox" id="desc" name="desc" checked={(sortBy.desc === -1)} onChange={onSetSortBy} />
            </form>
        </section>
    )
}