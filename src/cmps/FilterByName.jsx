

export function FilterByName({ onSubmitFilter, filterBy, handlaChange }) {
    return (
        <section className="filter-by-name">
            <span>Filter</span>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" value={filterBy.name} onChange={handlaChange} />
                <button>Search</button>
            </form>
        </section>
    )
}