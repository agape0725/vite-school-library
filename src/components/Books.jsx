import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import data from "../../data/db.json";
import Book from "./Book";
import Button from "./Button";
import Loader from "./Loader";
import ErrorFetch from "./ErrorFetch";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import SearchQuery from "./SearchQuery";
import { useAccounts } from "../contexts/AccountsContext";

function Books({ shadowStyle = "shadow-none" }) {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const location = useLocation();
  const [displayCount, setDisplayCount] = useState(8);
  const { isAuthenticated } = useAccounts();

  const notLibrary = !location.pathname.startsWith("/library");

  // Debounce query input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const fetchBooks = () => {
      try {
        setError("");
        const queryLower = debouncedQuery.toLowerCase();

        let filteredBooks = data.books.filter((book) => {
          if (searchBy === "title") {
            return book.title.toLowerCase().includes(queryLower);
          } else if (searchBy === "author") {
            return (
              book.author_name &&
              book.author_name.some((author) =>
                author.toLowerCase().includes(queryLower)
              )
            );
          } else if (searchBy === "category") {
            return (
              book.category &&
              book.category.some((c) => c.toLowerCase().includes(queryLower))
            );
          }
          return false;
        });

        if (filteredBooks.length === 0) {
          throw new Error("No books found");
        }

        setBooks(filteredBooks);
        setDisplayCount(notLibrary ? 8 : 10);
      } catch (err) {
        setError(err.message);
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchBooks();
  }, [debouncedQuery, searchBy, notLibrary]);

  const gridCols = notLibrary
    ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-8"
    : "grid-cols-3 sm:grid-cols-5 lg:grid-cols-10";

  return (
    <Section shadow={shadowStyle}>
      <SectionTitle fontColor="text-orange100">Books</SectionTitle>
      <SearchQuery
        onSearchQuery={setQuery}
        searchBy={searchBy}
        onSearchBy={setSearchBy}
      />

      {isLoading && <Loader />}

      {error && <ErrorFetch message={error} />}

      {!isLoading && !error && (
        <>
          <ul className={`grid ${gridCols} m-auto gap-2`}>
            {books.slice(0, displayCount).map((book) =>
              isAuthenticated ? (
                book.isLost ? (
                  <div key={book.key} className="cursor-not-allowed">
                    <Book book={book} />
                  </div>
                ) : (
                  <Link
                    key={book.key}
                    to={`/library/${book.key}`}
                    state={{ book }}
                  >
                    <Book book={book} />
                  </Link>
                )
              ) : (
                <Link key={book.key} to="/login">
                  <Book book={book} />
                </Link>
              )
            )}
          </ul>

          {notLibrary ? (
            <Link
              to={`${isAuthenticated ? "/library" : "/login"}`}
              className="text-sm text-blue900 m-auto cursor-pointer"
            >
              <Button buttonStyleType="btn1" padding="padding1" hover="hover1">
                Go to library
              </Button>
            </Link>
          ) : (
            displayCount < books.length && (
              <div className="m-auto">
                <Button
                  buttonStyleType="btn1"
                  padding="padding1"
                  hover="hover1"
                  onClick={() => setDisplayCount((prev) => prev + 10)}
                >
                  See more
                </Button>
              </div>
            )
          )}
        </>
      )}
    </Section>
  );
}

export default Books;
