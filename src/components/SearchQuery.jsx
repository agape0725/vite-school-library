function SearchQuery({ onSearchQuery, searchBy, onSearchBy }) {
  return (
    <div className="flex gap-1 m-auto">
      <input
        className="text-xs p-2 rounded-md outline-none"
        placeholder="Search book"
        type="text"
        onChange={(e) => onSearchQuery(e.target.value)}
      />
      <select
        className="text-xs p-2"
        value={searchBy}
        onChange={(e) => onSearchBy(e.target.value)}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="subject">Category</option>
      </select>
    </div>
  );
}

export default SearchQuery;
