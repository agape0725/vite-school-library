import { useAccounts } from "../../contexts/AccountsContext";
import { useState } from "react";
import Button from "../Button";
import AlertMessageModal from "../AlertMessageModal";
import ConfirmMessageModal from "../ConfirmMessageModal";
import clsx from "clsx";

function Books({ books, studentId, action }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 bg-white p-4 rounded-xl shadow-inner">
      {books.map((book) => (
        <Book key={book.id} book={book} studentId={studentId} action={action} />
      ))}
    </ul>
  );
}

function Book({ book, studentId, action }) {
  const {
    lendBookToStudent,
    removeBookFromLists,
    removeBookFromReturning,
    accounts,
    books,
    toggleBookLost,
    currentAccount,
  } = useAccounts();
  const [isDisappearing, setIsDisappearing] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    icon: "",
  });
  const [confirmMessage, setConfirmMessage] = useState({
    message: "",
    icon: "",
    onConfirm: null,
  });

  function findBorrowers(accounts, book, studentId) {
    if (!studentId) return [];

    return accounts.filter(
      (acc) =>
        acc.id !== studentId &&
        Array.isArray(acc.borrowed) &&
        acc.borrowed.some((b) => b.id === book.id)
    );
  }

  function canBorrowBook(student) {
    return student.role === "Student"
      ? Array.isArray(student.borrowed) && student.borrowed.length < 5
      : Array.isArray(student.borrowed) && student.borrowed.length < 10;
  }

  function bookIsUnavailable(bookId) {
    const book = books.find((book) => book.id === bookId);

    if (!book.isLost) return false;
    return book.isLost === true;
  }

  function handleAction(id) {
    const sameUser = studentId === currentAccount.id;
    const student = accounts.find((acc) => acc.id === studentId);
    const liveBook = books.find((b) => b.id === id);

    if (!liveBook) return;

    if (action === "borrowed" || action === "overdue") {
      return;
    }

    if (action === "borrowing") {
      if (bookIsUnavailable(id)) {
        return setAlertMessage({
          message: "This book is currently unavailable or missing.",
          icon: "sad",
        });
      }

      if (!canBorrowBook(student)) {
        return setAlertMessage({
          message: `This user has already borrowed the maximum of ${student.borrowed.length} books.`,
          icon: "cancel",
        });
      }

      const borrowers = findBorrowers(accounts, book, studentId);

      console.log(liveBook.availableQuantity);

      if (borrowers.length > 0 && liveBook.availableQuantity <= 0) {
        setAlertMessage({
          message: (
            <div className="space-y-4 text-sm text-gray-800">
              <p className="font-medium text-gray-600">
                This book has no available copies left.
              </p>

              <p className="text-gray-500">
                Please wait for one of the following users to return the book
                before lending it to{" "}
                {sameUser
                  ? "your account."
                  : `${student.firstname} ${student.lastname}.`}
              </p>

              <div className="space-y-2 text-xs">
                <h1 className="font-semibold uppercase tracking-wide text-gray-700">
                  Users who currently have this book
                </h1>

                <div className="space-y-2">
                  {borrowers.map((borrower) => (
                    <div
                      key={borrower.id}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm"
                    >
                      <p>
                        <span className="font-semibold text-gray-700">
                          Fullname:
                        </span>{" "}
                        {borrower.firstname} {borrower.lastname}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          USN:
                        </span>{" "}
                        {borrower.studentNumber}
                      </p>
                      <p className="italic text-gray-600">
                        {borrower.year === "Shs"
                          ? "Senior Highschool"
                          : "College"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
          icon: "cancel",
        });
        return;
      }

      setConfirmMessage({
        message: (
          <div className="space-y-5 text-gray-800">
            <h1 className="text-base font-semibold leading-snug">
              Would you like to confirm{" "}
              <span className="text-green-600">lending</span> this book to{" "}
              <span className="text-green-700">
                {sameUser
                  ? "your account"
                  : `${student?.firstname} ${student?.lastname}`}
              </span>
              ?
            </h1>

            <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4 shadow-md flex flex-col items-center hover:shadow-xl transition-shadow">
              <img
                src={book.book_cover}
                alt={book.title}
                className="w-32 h-44 object-cover rounded-lg shadow-md border border-green-100"
              />
              <div className="mt-3">
                <p className="font-semibold text-sm text-center text-green-800">
                  {book.title}
                </p>
                <p className="text-xs text-green-600 italic">
                  {book.author_name}
                </p>
              </div>
            </div>
          </div>
        ),
        icon: "question",
        onConfirm: () => lendBookToStudent(studentId, book),
      });
      return;
    }

    setConfirmMessage({
      message: (
        <div className="space-y-5 text-gray-800">
          <h1 className="text-base font-semibold leading-snug">
            Accept this <span className="text-red-600">book return</span>{" "}
            request from{" "}
            <span className="text-red-700">
              {sameUser ? "you" : student?.firstname}
            </span>
            ?
          </h1>

          <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 shadow-md flex flex-col items-center hover:shadow-xl transition-shadow">
            <img
              src={book.book_cover}
              alt={book.title}
              className="w-32 h-44 object-cover rounded-lg shadow-md border border-red-100"
            />
            <div className="mt-3 space-y-1">
              <p className="font-semibold text-sm text-center text-red-800">
                {book.title}
              </p>
              <p className="text-xs text-red-600 italic">{book.author_name}</p>
            </div>
          </div>
        </div>
      ),
      icon: "question",
      onConfirm: () => removeBookFromLists(studentId, book),
    });
  }

  // Decline borrow request
  function handleDeclineBorrowRequest() {
    if (!studentId) return;
    const sameUser = studentId === currentAccount.id;
    const student = accounts.find((acc) => acc.id === studentId);

    setConfirmMessage({
      message: `Are you sure you want to remove (${book.title}) from ${
        sameUser ? "your" : `${student.firstname} ${student.lastname}`
      } borrow list?`,
      icon: "question",
      onConfirm: () => removeBookFromLists(studentId, book),
    });
  }

  // Decline return request
  function handleDeclineReturnRequest() {
    if (!studentId) return;
    const sameUser = studentId === currentAccount.id;
    const student = accounts.find((acc) => acc.id === studentId);

    setConfirmMessage({
      message: `Are you sure you want to decline (${book.title}) from ${
        sameUser ? "your" : `${student.firstname} ${student.lastname}`
      } returning list?`,
      icon: "question",
      onConfirm: () => removeBookFromReturning(studentId, book),
    });
  }

  // Replace a lost book
  function handleReplaceBook() {
    if (!studentId) return;
    const sameUser = studentId === currentAccount.id;
    const student = accounts.find((acc) => acc.id === studentId);
    const sameBook = books.find((b) => b.id === book.id);

    setConfirmMessage({
      message: `Are you sure this book has already been replaced by ${
        sameUser ? "you" : `${student.firstname} ${student.lastname}`
      }?`,
      icon: "question",
      onConfirm: () => {
        removeBookFromLists(studentId, book);
        if (sameBook.isLost) toggleBookLost(sameBook);
      },
    });
  }

  // Mark book as unavailable
  const handleReportLost = async (book) => {
    const sameBook = books.find((b) => b.id === book.id);

    setConfirmMessage({
      message: `${
        !sameBook.isLost
          ? `Book ${book.title} has been marked as lost.`
          : `Book ${book.title} is now available again.`
      }`,
      icon: "success",
      onConfirm: () => toggleBookLost(sameBook),
    });
  };

  const resetConfirm = () =>
    setConfirmMessage({
      message: "",
      icon: "",
      onConfirm: null,
    });

  const resetAlert = () => setAlertMessage({ message: "", icon: "" });
  const sameBook = books.find((b) => b.id === book.id);

  return (
    <>
      {confirmMessage.message && confirmMessage.icon && (
        <ConfirmMessageModal
          icon={confirmMessage.icon}
          onClick={() => {
            if (confirmMessage.onConfirm) {
              setIsDisappearing(true);
              resetConfirm();
              setTimeout(() => {
                confirmMessage.onConfirm();
              }, 600);
            }
          }}
          onCloseMessage={() => resetConfirm()}
        >
          {confirmMessage.message}
        </ConfirmMessageModal>
      )}

      {alertMessage.message && alertMessage.icon && (
        <AlertMessageModal
          icon={alertMessage.icon}
          onCloseMessage={() => resetAlert()}
        >
          {alertMessage.message}
        </AlertMessageModal>
      )}

      <li
        className={clsx(
          "flex flex-col items-center text-center group min-h-full transition-all duration-500",
          isDisappearing && action !== "lost" && "opacity-0 scale-90"
        )}
      >
        <div className="relative w-24 sm:w-28 md:w-32">
          <img
            src={book.book_cover}
            alt={book.title}
            className="w-full h-36 object-cover rounded-lg shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:shadow-lg"
          />
        </div>
        <h3
          className="text-sm font-medium text-black mt-2 truncate w-full"
          title={book.title}
        >
          {book.title}
        </h3>
        <p
          className={`text-xs text-orange-500 truncate w-full ${
            action !== "lost" && "mb-2"
          }`}
          title={book.author_name}
        >
          {book.author_name}
        </p>
        {action === "lost" && (
          <p
            className="text-xs text-gray-500 truncate w-full"
            title={book.title}
          >
            {book.id}
          </p>
        )}
        <div className="flex gap-1">
          {action !== "borrowed" && action !== "overdue" && (
            <div className="flex gap-1">
              {action !== "lost" && (
                <Button
                  type="button"
                  className="bg-green-500 hover:bg-green-600 text-white text-xs p-2"
                  onClick={() => handleAction(book.id)}
                >
                  {action === "borrowing" ? "Lend book" : "Accept"}
                </Button>
              )}
              {action !== "lost" && action !== "borrowing" && (
                <Button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white text-xs p-2"
                  onClick={handleDeclineReturnRequest}
                >
                  Decline
                </Button>
              )}
            </div>
          )}

          {action === "lost" && (
            <div className="flex flex-col gap-1 mt-2">
              <Button
                type="button"
                className="bg-green-500 hover:bg-green-600 text-white text-xs p-2"
                onClick={handleReplaceBook}
              >
                Replace
              </Button>
              {!sameBook.isLost ? (
                <Button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white text-xs p-2"
                  onClick={() => handleReportLost(book)}
                >
                  Mark as Unavailable
                </Button>
              ) : (
                <span className="text-xs text-gray-500 italic border border-gray-300 rounded px-2 py-1 bg-gray-50">
                  Book is already marked as unavailable
                </span>
              )}
            </div>
          )}

          {action === "borrowing" && (
            <Button
              padding="padding3"
              hover="hover1"
              className="text-white text-sm bg-red-600"
              onClick={handleDeclineBorrowRequest}
            >
              Decline
            </Button>
          )}
        </div>
      </li>
    </>
  );
}

export default Books;
