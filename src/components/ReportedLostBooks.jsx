export default function ReportedLostBooks({ books }) {
  return (
    <div className="bg-red-500/20 w-full p-5 rounded-xl">
      <ul className="flex flex-wrap gap-5">
        {books.map((book, index) => (
          <LostBook key={index} book={book} />
        ))}
      </ul>
    </div>
  );
}

function LostBook({ book }) {
  return (
    <li className="w-24 sm:w-28 md:w-32 flex flex-col items-center text-center">
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
    </li>
  );
}
