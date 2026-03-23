import { useState } from "react";
import { useAccounts } from "../contexts/AccountsContext";
import Button from "./Button";
import closeIcon from "../assets/icons/close.png";

export default function StudentBorrowHistory() {
  const { currentAccount } = useAccounts();
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [displayCount, setDisplayCount] = useState(10);

  const filteredHistory =
    [...(currentAccount?.history || [])].filter((book) => {
      const q = query.toLowerCase();
      switch (searchBy) {
        case "title":
          return book.title.toLowerCase().includes(q);
        case "author":
          return Array.isArray(book.author_name)
            ? book.author_name.some((a) => a.toLowerCase().includes(q))
            : book.author_name?.toLowerCase().includes(q);
        case "category":
          return Array.isArray(book.category)
            ? book.category.some((a) => a.toLowerCase().includes(q))
            : book.category?.toLowerCase().includes(q);
        default:
          return false;
      }
    }) || [];

  return (
    <div className="p-4 space-y-5">
      <Search
        query={query}
        onQuery={setQuery}
        searchBy={searchBy}
        onSearchBy={setSearchBy}
        onResetDisplay={() => setDisplayCount(10)} // pass reset function
      />
      <div className="overflow-x-auto">
        <div className="min-w-full border border-gray-300 rounded-lg shadow-md">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-4 bg-gray-200 text-gray-800 font-semibold text-sm border-b border-gray-300">
            <div className="px-4 py-3 border-r border-b border-gray-300">
              ISBN
            </div>
            <div className="px-4 py-3 border-r border-b border-gray-300">
              Title
            </div>
            <div className="px-4 py-3 border-r border-b border-gray-300">
              Author
            </div>
            <div className="px-4 py-3 border-r border-b border-gray-300">
              Category
            </div>
          </div>

          {/* Data Rows */}
          {filteredHistory.slice(0, displayCount).map((book, index) => (
            <BorrowedBooksHistory key={`${book.id}-${index}`} book={book} />
          ))}

          {filteredHistory.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No results found.
            </div>
          )}
        </div>
      </div>

      {displayCount < filteredHistory.length && (
        <div className="text-center my-4">
          <Button
            buttonStyleType="btn1"
            className="px-4 py-2"
            onClick={() => setDisplayCount(displayCount + 10)}
          >
            See More
          </Button>
        </div>
      )}
    </div>
  );
}

function BorrowedBooksHistory({ book }) {
  const authors = Array.isArray(book.author_name)
    ? book.author_name
    : book.author_name?.split(", ") || [];

  const categories = Array.isArray(book.category)
    ? book.category
    : book.category?.split(", ") || [];

  return (
    <>
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-4 text-sm">
        <div className="px-4 py-2 border-r border-b border-gray-300">
          {book.id}
        </div>
        <div className="px-4 py-2 border-r border-b border-gray-300">
          {book.title}
        </div>
        <div className="px-4 py-2 border-r border-b border-gray-300">
          {authors.length > 0
            ? authors.map((author, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded mr-1"
                >
                  {author}
                </span>
              ))
            : "-"}
        </div>
        <div className="px-4 py-2 border-r border-b border-gray-300">
          {categories.length > 0
            ? categories.map((cat, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded mr-1"
                >
                  {cat}
                </span>
              ))
            : "-"}
        </div>
      </div>

      {/* Mobile Card */}
      <div className="md:hidden border-b border-gray-200 p-3 space-y-1 text-xs">
        <div>
          <span className="font-semibold text-gray-700">ISBN: </span>
          {book.id}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Title: </span>
          {book.title}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Author: </span>
          {authors.length > 0 ? authors.join(", ") : "-"}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Category: </span>
          {categories.length > 0 ? categories.join(", ") : "-"}
        </div>
      </div>
    </>
  );
}

function Search({ query, onQuery, searchBy, onSearchBy, onResetDisplay }) {
  const [showSearch, setShowSearch] = useState(false);

  function handleCloseQuery() {
    setShowSearch(false);
    onQuery("");
    onResetDisplay(); // --- FIX: reset display count when clearing query ---
  }

  return showSearch ? (
    <div className="flex flex-col sm:flex-row gap-2 items-center">
      <input
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        className="flex-1 p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder={`Search by ${searchBy}`}
      />
      <div className="flex gap-2">
        <select
          className="p-2 rounded-lg text-sm bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400"
          value={searchBy}
          onChange={(e) => onSearchBy(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="category">Category</option>
        </select>
        <img
          className="w-5 h-5 cursor-pointer"
          src={closeIcon}
          alt="icon-close"
          onClick={handleCloseQuery}
        />
      </div>
    </div>
  ) : (
    <Button
      buttonStyleType="btn1"
      padding="padding3"
      hover="hover1"
      onClick={() => setShowSearch(true)}
    >
      Search
    </Button>
  );
}
