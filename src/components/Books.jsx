import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Book from "./Book";
import Button from "./Button";
import Loader from "./Loader";
import ErrorFetch from "./ErrorFetch";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import SearchQuery from "./SearchQuery";

function Books() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("history");
  const [searchBy, setSearchBy] = useState("title");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const controllerRef = useRef(null);
  const location = useLocation();
  const [displayCount, setDisplayCount] = useState(8);

  // Debugging: Log isLoading changes
  // useEffect(() => {
  //   console.log("isLoading:", isLoading);
  // }, [isLoading]);

  // **Debounce the search query**
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      setIsLoading(true); // Ensure loading state is set before fetching
      fetchBooks();
    }

    async function fetchBooks() {
      // Abort previous request if exists
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;
      const { signal } = controller;

      try {
        setError("");

        const res = await fetch(
          `https://openlibrary.org/search.json?${searchBy}=${debouncedQuery}`,
          { signal }
        );

        if (!res.ok) throw new Error(`Search failed`);

        const data = await res.json();

        if (!data.docs || data.docs.length === 0) {
          throw new Error("No books found");
        }

        // Shuffle books randomly for default query
        const booksApi =
          debouncedQuery === "harry+potter"
            ? [...data.docs].sort(() => Math.random() - 0.5)
            : data.docs;

        setBooks(booksApi);
        setDisplayCount(8);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching books:", err);
          setError(err.message);
        }
      } finally {
        // Only set isLoading(false) if the request was not aborted
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [debouncedQuery]);

  return (
    <Section
      backgroundColor="bg-dirtyWhite"
      shadow="shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,0.25)]"
    >
      <SectionTitle fontColor="text-orange100">Books</SectionTitle>
      <SearchQuery
        onSearchQuery={setQuery}
        searchBy={searchBy}
        onSearchBy={setSearchBy}
      />

      {/* Loader should show while fetching data */}
      {isLoading && <Loader />}

      {/* Show error message if fetch fails */}
      {error && <ErrorFetch message={error} />}

      {!isLoading && !error && (
        <>
          <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 m-auto gap-1">
            {books.slice(0, displayCount).map((book) => (
              <Link
                key={book.key}
                to={`/library/${book.key.replace("/works/", "")}`}
              >
                <Book book={book} />
              </Link>
            ))}
          </ul>

          {!location.pathname.startsWith("/library") ? (
            <Link
              to="/library"
              className="text-sm text-blue900 m-auto cursor-pointer"
            >
              <Button type="btn1" padding="padding1" hover="hover1">
                Go to library
              </Button>
            </Link>
          ) : (
            displayCount < books.length && (
              <div className="m-auto">
                <Button
                  type="btn1"
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
