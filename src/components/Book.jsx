import { useEffect, useState } from "react";
import noCover from "../assets/images/no-cover.jpg";
import Overlay from "./Overlay";

function Book({ book }) {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // if (!book) return;

  const {
    key,
    title,
    author_name: author,
    first_publish_year: year,
    cover_i: imageId,
  } = book;

  // Fetch book description
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchDescription() {
      try {
        const res = await fetch(`https://openlibrary.org${key}.json`, {
          signal,
        });
        const data = await res.json();
        setDescription(
          data.description?.value ||
            data.description ||
            "No description available"
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching description:", error);
        }
      }
    }

    fetchDescription();

    return () => controller.abort();
  }, [key]);

  // Fetch book rating
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchRating() {
      try {
        const res = await fetch(`https://openlibrary.org${key}/ratings.json`, {
          signal,
        });
        const data = await res.json();
        setRating(data.summary?.average ? Number(data.summary.average) : null);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching rating:", error);
        }
      }
    }

    fetchRating();

    return () => controller.abort();
  }, [key]);

  return (
    <div
      className="flex flex-col gap-2 cursor-pointer w-full sm:w-28"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <div
          className={`relative transition-transform duration-100 linear ${
            isHovered ? "bg-cover" : "bg-contain scale-95"
          } bg-center h-44 w-full shadow-inner`}
          style={{
            backgroundImage: `${
              imageId
                ? `url(https://covers.openlibrary.org/b/id/${imageId}-L.jpg)`
                : `url(${noCover})`
            }`,
          }}
        >
          {isHovered && <Overlay opacity="bg-opacity-60" />}
        </div>
      </div>
      <div className="flex flex-col h-full font-montserrat gap-0.5">
        <h1 className="text-sm truncate w-full sm:w-28" title={title}>
          {title}
        </h1>
        {author ? (
          <p
            className="text-xs font-semibold truncate w-full sm:w-28 flex-grow"
            title={author}
          >
            {author}
          </p>
        ) : (
          <div className="flex-grow" /> // Empty div to push rating down
        )}
        <span
          className={`flex gap-1 text-xs font-semibold ${
            rating ? "text-orange100" : "text-orange200"
          }`}
        >
          {typeof rating === "number" ? (
            <>
              {rating.toFixed(1)}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="orange"
                stroke="orange"
                className="w-4"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </>
          ) : (
            <>
              {"No ratings"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="orange"
                className="w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="{2}"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </>
          )}
        </span>
      </div>
    </div>
  );
}

export default Book;
