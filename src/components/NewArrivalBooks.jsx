import { useState } from "react";
import starIcon from "../assets/icons/star.png";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:7000";

function NewArrivalBooks({ books }) {
  return (
    <div className="w-full">
      <ul className="flex flex-wrap gap-5">
        {books.map((book, index) => (
          <NewArrivalBook key={index} book={book} />
        ))}
      </ul>
    </div>
  );
}

function NewArrivalBook({ book }) {
  const [onHoverBook, setOnHoverBook] = useState(false);

  const rating = book.rating;

  return (
    <Link to={`/library/${book.key}`} state={{ book }}>
      <li
        className={`w-24 sm:w-28 md:w-32 flex flex-col items-center text-center cursor-pointer`}
        onMouseEnter={() => setOnHoverBook(true)}
        onMouseLeave={() => setOnHoverBook(false)}
      >
        <img
          className={`w-full h-36 object-cover rounded shadow-md transform transition-transform duration-300 ${
            onHoverBook ? "scale-105" : "scale-100"
          }`}
          src={`${BASE_URL}/${book.book_cover}`}
          alt={book.title}
        />
        <h1
          className="text-sm font-medium text-black900 mt-2 truncate w-full"
          title={book.title}
        >
          {book.title}
        </h1>
        <p
          className="text-xs text-green-500 font-medium truncate w-full"
          title={book.author_name}
        >
          {book.author_name}
        </p>
        <span
          className={`flex gap-1 text-xs font-semibold ${
            rating ? "text-orange100" : "text-orange200"
          }`}
          title={rating ? `Rating: ${rating.toFixed(1)}` : "No ratings"}
        >
          {typeof rating === "number" && rating > 0 ? (
            <div className="flex gap-1 items-center">
              <p>{rating.toFixed(1)}</p>
              <img className="w-3 h-3" src={starIcon} alt="icon-star" />
            </div>
          ) : (
            <span className="italic text-xs font-light">No ratings</span>
          )}
        </span>
      </li>
    </Link>
  );
}

export default NewArrivalBooks;
