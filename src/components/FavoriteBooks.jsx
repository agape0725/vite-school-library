import { useState } from "react";
import { useAccounts } from "../contexts/AccountsContext";
import Button from "./Button";

function FavoriteBooks({ books }) {
  return (
    <div className="w-full">
      <ul className="flex flex-wrap gap-5">
        {books.map((book, index) => (
          <FavoriteBook key={index} book={book} />
        ))}
      </ul>
    </div>
  );
}

function FavoriteBook({ book }) {
  const [onHoverBook, setOnHoverBook] = useState(false);
  const { removeFavoriteBook } = useAccounts();

  return (
    <li
      className="w-24 sm:w-28 md:w-32 flex flex-col items-center text-center"
      onMouseEnter={() => setOnHoverBook(true)}
      onMouseLeave={() => setOnHoverBook(false)}
    >
      <img
        className="w-full h-36 object-cover rounded shadow-md"
        src={book.book_cover}
        alt={book.title}
      />
      <h1
        className="text-sm font-medium text-black900 mt-2 truncate w-full"
        title={book.title}
      >
        {book.title}
      </h1>
      <p
        className="text-xs text-orange200 truncate w-full mb-2"
        title={book.author_name}
      >
        {book.author_name}
      </p>
      <div className="h-8 transition-opacity duration-300">
        <Button
          buttonStyleType="btn2"
          padding="padding3"
          hover="hover2"
          className={`${onHoverBook ? "opacity-100" : "opacity-0"}`}
          onClick={() => removeFavoriteBook(book.id)}
        >
          Remove
        </Button>
      </div>
    </li>
  );
}

export default FavoriteBooks;
