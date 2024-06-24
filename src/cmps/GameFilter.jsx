
export function GameFilter({ filterBy, onSetFilterBy, sortBy, onSetSortBy }) {
    return (
        <section className="game-filter">
            <form>
                <label htmlFor="name">סינון</label>
                <input type="text" id="name" placeholder="שם המשחק" name="name" value={filterBy.name} onChange={onSetFilterBy} />
                <br />
                <label htmlFor="sortBy">מיון</label>
                <select name="value" onChange={onSetSortBy} value={sortBy.value}>
                    <option value="name">שם</option>
                    <option value="date">תאריך</option>
                </select>
                <label htmlFor="desc">סדר יורד</label>
                <input type="checkbox" id="desc" name="desc" checked={(sortBy.desc === -1)} onChange={onSetSortBy} />
            </form>
        </section>
    )
}