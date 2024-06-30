

export function FilterByName({ onSubmitFilter, filterBy, handleChange }) {
    return (
        <section className="filter-by-name">
            <span>Filter</span>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" value={filterBy.name} onChange={handleChange} />
                <button>Search</button>
            </form>
        </section>
    )
}