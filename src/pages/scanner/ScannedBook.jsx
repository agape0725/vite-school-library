// import { useLocation } from "react-router-dom";
// import { useAccounts } from "../../contexts/AccountsContext";
// import Button from "../../components/Button";

// export default function ScannedBook() {
//   const location = useLocation();
//   const book = location.state?.book;
//   const { currentAccount, borrowBook, favoriteBook, returnBook, accounts } =
//     useAccounts();

//   if (!book) return <p>No book scanned yet.</p>;

//   // console.log(book);

//   const alreadyInBorrowList =
//     currentAccount?.borrow?.some((b) => String(b.id) === String(book.id)) ||
//     false;

//   const alreadyInFavoriteList =
//     currentAccount?.favorite?.some((b) => String(b.id) === String(book.id)) ||
//     false;

//   const alreadyBorrowed = currentAccount?.borrowed?.some(
//     (b) => String(b.id) === String(book.id) || false
//   );

//   const isOverdue =
//     currentAccount?.overdue?.some((b) => String(b.id) === String(book.id)) ||
//     false;

//   const alreadyRequestedReturn = currentAccount?.returning?.some(
//     (b) => String(b.id) === String(book.id) || false
//   );

//   const isBorrowedByOther = accounts.some((acc) => {
//     if (acc.id === currentAccount.id) return false;
//     return (
//       Array.isArray(acc.borrowed) &&
//       acc.borrowed.some(
//         (b) =>
//           String(b.id) === String(book.id) ||
//           String(b.title) === String(book.title)
//       )
//     );
//   });

//   function handleAddBook() {
//     if (!alreadyInBorrowList) borrowBook(book);
//   }

//   function handleFavoriteBook() {
//     if (!alreadyInFavoriteList) favoriteBook(book);
//   }

//   function handleReturnBook() {
//     if (alreadyBorrowed || isOverdue) returnBook(book);
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center space-y-4">
//         <h3 className="text-2xl font-extrabold text-gray-800 text-center">
//           {book.title}
//         </h3>

//         {book.book_cover && (
//           <img
//             className="w-48 h-64 object-cover rounded-lg shadow-md"
//             src={book.book_cover}
//             alt={book.title}
//           />
//         )}

//         {book.description && (
//           <p className="text-gray-700 text-justify text-sm">
//             {book.description}
//           </p>
//         )}

//         <div className="w-full border-t border-gray-200 pt-3 space-y-1 text-gray-600 text-sm">
//           {book.author_name && (
//             <p>
//               <span className="font-semibold">Author:</span> {book.author_name}
//             </p>
//           )}
//           <p>
//             <span className="font-semibold">ISBN:</span> {book.id}
//           </p>
//         </div>

//         <div className="w-full border-t border-gray-200 pt-5 text-center">
//           {/* {!alreadyInBorrowList && !alreadyBorrowed && !isOverdue ? (
//             <Button
//               onClick={handleAddBook}
//               className="bg-green-500 hover:bg-green-600 active:bg-green-700
//              text-white font-semibold px-5 py-2
//              rounded-xl shadow-md transition duration-200
//              ease-in-out transform hover:scale-105"
//             >
//               Borrow book
//             </Button>
//           ) : alreadyBorrowed || isOverdue ? (
//             alreadyRequestedReturn ? (
//               <span
//                 className="text-xs font-lg italic text-gray-500
//              bg-gray-100 px-5 py-3 rounded-lg shadow-sm"
//               >
//                 Already requested a return
//               </span>
//             ) : (
//               <Button
//                 onClick={handleReturnBook}
//                 className="bg-red-500 hover:bg-red-600 active:bg-red-700
//              text-white font-semibold px-5 py-2
//              rounded-xl shadow-md transition duration-200
//              ease-in-out transform hover:scale-105"
//               >
//                 Return
//               </Button>
//             )
//           ) : (
//             <span
//               className="text-xs font-lg italic text-gray-500
//              bg-gray-100 px-5 py-3 rounded-lg shadow-sm"
//             >
//               Already in the borrow list
//             </span>
//           )} */}

//           {!alreadyInBorrowList &&
//           !alreadyBorrowed &&
//           !isOverdue &&
//           !isBorrowedByOther ? (
//             <Button
//               onClick={handleAddBook}
//               className="bg-green-500 hover:bg-green-600 active:bg-green-700
//              text-white font-semibold px-5 py-2
//              rounded-xl shadow-md transition duration-200
//              ease-in-out transform hover:scale-105"
//             >
//               Borrow book
//             </Button>
//           ) : alreadyBorrowed || isOverdue ? (
//             alreadyRequestedReturn ? (
//               <span
//                 className="text-xs font-lg italic text-gray-500
//              bg-gray-100 px-5 py-3 rounded-lg shadow-sm"
//               >
//                 Already requested a return
//               </span>
//             ) : !alreadyInFavoriteList ? (
//               <Button
//                 onClick={handleReturnBook}
//                 className="bg-red-500 hover:bg-red-600 active:bg-red-700
//              text-white font-semibold px-5 py-2
//              rounded-xl shadow-md transition duration-200
//              ease-in-out transform hover:scale-105"
//               >
//                 Return
//               </Button>
//             ) : (
//               <span
//                 className="text-xs font-lg italic text-gray-500
//              bg-gray-100 px-5 py-3 rounded-lg shadow-sm"
//               >
//                 This book is already in your favorite list.
//               </span>
//             )
//           ) : isBorrowedByOther ? (
//             <div className="space-y-5">
//               <span
//                 className="text-xs font-lg italic text-gray-500
//              bg-gray-100 px-5 py-3 rounded-lg shadow-sm"
//               >
//                 This book is already borrowed by other user.
//               </span>
//               <Button
//                 onClick={handleFavoriteBook}
//                 className="bg-green-500 hover:bg-green-600 active:bg-green-700
//              text-white font-semibold px-4 py-2
//              rounded-xl shadow-md transition duration-200
//              ease-in-out transform hover:scale-105"
//               >
//                 Add to favorite
//               </Button>
//             </div>
//           ) : (
//             <span
//               className="text-xs font-lg italic text-gray-500
//              bg-gray-100 px-5 py-3 rounded-lg shadow-sm"
//             >
//               Already in the borrow list
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useLocation, useNavigate } from "react-router-dom";
import { useAccounts } from "../../contexts/AccountsContext";
import Button from "../../components/Button";

export default function ScannedBook() {
  const location = useLocation();
  const book = location.state?.book;
  const { currentAccount, borrowBook, favoriteBook, returnBook, accounts } =
    useAccounts();
  const bookNotFound = book?.title === "Book not found!";
  const navigate = useNavigate();

  if (!book)
    return (
      <p className="text-center text-gray-500 mt-10">No book scanned yet.</p>
    );

  // Borrow/favorite state flags
  const alreadyInBorrowList =
    currentAccount?.borrow?.some((b) => String(b.id) === String(book.id)) ||
    false;
  const alreadyInFavoriteList =
    currentAccount?.favorite?.some((b) => String(b.id) === String(book.id)) ||
    false;

  // Return/overdue state flags
  const alreadyBorrowed =
    currentAccount?.borrowed?.some((b) => String(b.id) === String(book.id)) ||
    false;
  const isOverdue =
    currentAccount?.overdue?.some((b) => String(b.id) === String(book.id)) ||
    false;
  const alreadyRequestedReturn =
    currentAccount?.returning?.some((b) => String(b.id) === String(book.id)) ||
    false;

  // Borrowed by someone else
  const isBorrowedByOther = accounts.some((acc) => {
    if (acc.id === currentAccount.id) return false;
    return (
      Array.isArray(acc.borrowed) &&
      acc.borrowed.some(
        (b) =>
          String(b.id) === String(book.id) ||
          String(b.title) === String(book.title)
      )
    );
  });

  const isUnavailable = accounts.some((acc) => {
    return (
      Array.isArray(acc.lost) &&
      acc.lost.some(
        (b) =>
          String(b.id) === String(book.id) ||
          String(b.title) === String(book.title)
      )
    );
  });

  // const borrowedBook = currentAccount.find(acc => acc.borrowed === )
  // console.log(currentAccount.borrowed);

  const borrowedBook = currentAccount.borrowed.find((b) => b.id === book.id);

  function handleAddBook() {
    if (!alreadyInBorrowList) borrowBook(book);
  }

  function handleFavoriteBook() {
    if (!alreadyInFavoriteList) favoriteBook(book);
  }

  function handleReturnBook() {
    if (alreadyBorrowed || isOverdue) returnBook(borrowedBook);
  }

  function renderActionButton() {
    if (
      !alreadyInBorrowList &&
      !alreadyBorrowed &&
      !isOverdue &&
      !isBorrowedByOther &&
      !isUnavailable
    ) {
      return (
        <Button
          onClick={handleAddBook}
          className="bg-green-600 hover:bg-green-700 active:bg-green-800 
          text-white font-semibold px-6 py-2.5 rounded-lg shadow-md transition 
          duration-200 ease-in-out transform hover:scale-105"
        >
          Borrow Book
        </Button>
      );
    }

    if (alreadyBorrowed || isOverdue) {
      if (alreadyRequestedReturn) {
        return (
          <span className="block font-semibold text-sm text-green-500 bg-green-100 px-4 py-2 rounded-lg shadow-sm">
            Return request sent!
          </span>
        );
      }

      return (
        <Button
          onClick={handleReturnBook}
          className="bg-red-600 hover:bg-red-700 active:bg-red-800 
            text-white font-semibold px-6 py-2.5 rounded-lg shadow-md transition 
            duration-200 ease-in-out transform hover:scale-105"
        >
          Return Book
        </Button>
      );
    }

    if (isBorrowedByOther) {
      return (
        <div className="space-y-3">
          <span
            className={`block text-xs italic ${
              alreadyInFavoriteList
                ? "text-green-600 bg-green-200"
                : "text-gray-500 bg-gray-100"
            } px-4 py-2 rounded-lg shadow-sm`}
          >
            {alreadyInFavoriteList
              ? "This book is now in your favorite list. You’ll be able to borrow it when returned by the current borrower."
              : "This book is currently borrowed by other user. Add it to your favorites to borrow once it’s returned."}
          </span>
          {!alreadyInFavoriteList && (
            <Button
              onClick={handleFavoriteBook}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
              text-white font-semibold px-5 py-2.5 rounded-lg shadow-md transition 
              duration-200 ease-in-out transform hover:scale-105"
            >
              Add to Favorites
            </Button>
          )}
        </div>
      );
    }

    if (isUnavailable) {
      return (
        <div className="space-y-3">
          <span
            className={`block text-xs italic ${
              alreadyInFavoriteList
                ? "text-green-600 bg-green-200"
                : "text-gray-500 bg-gray-100"
            } px-4 py-2 rounded-lg shadow-sm`}
          >
            "This book is temporarily unavailable.
          </span>
        </div>
      );
    }

    return (
      <span className="block font-semibold text-sm text-green-500 bg-green-100 px-4 py-2 rounded-lg shadow-sm">
        Already in your borrow list
      </span>
    );
  }

  function renderTryAgain() {
    return (
      <Button
        onClick={() => navigate("/scan")}
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
              text-white font-semibold px-5 py-2.5 rounded-lg shadow-md transition 
              duration-200 ease-in-out transform hover:scale-105"
      >
        Scan again
      </Button>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center space-y-5">
        <h3 className="text-2xl font-extrabold text-gray-900 text-center">
          {book.title}
        </h3>

        {book.book_cover && (
          <img
            className="w-52 h-64 object-cover rounded-lg shadow-lg border border-gray-200"
            src={book.book_cover}
            alt={book.title}
          />
        )}

        {book.description && (
          <p className="text-gray-700 text-justify text-sm">
            {book.description}
          </p>
        )}

        <div className="w-full border-t border-gray-200 pt-4 space-y-1 text-gray-700 text-sm">
          {/* {book.author_name && (
            <p>
              <span className="font-semibold">Author:</span> {book.author_name}
            </p>
          )} */}

          {book.author_name && (
            <p>
              <span className="font-semibold">Author:</span>{" "}
              {Array.isArray(book.author_name)
                ? book.author_name.join(", ")
                : book.author_name}
            </p>
          )}
          <p>
            <span className="font-semibold">ISBN:</span> {book.id}
          </p>
        </div>

        <div className="w-full border-t border-gray-200 pt-5 text-center">
          {!bookNotFound ? renderActionButton() : renderTryAgain()}
        </div>
      </div>
    </div>
  );
}
