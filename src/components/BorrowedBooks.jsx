import { useState } from "react";
import { useAccounts } from "../contexts/AccountsContext";
import ConfirmMessageModal from "./ConfirmMessageModal.jsx";
import AlertMessageModal from "./AlertMessageModal.jsx";
import Button from "./Button";

function BorrowedBooks({ books }) {
  return (
    <div className="w-full bg-green-500/20 p-5 rounded-xl">
      <ul className="flex flex-wrap gap-5">
        {books.map((book, index) => (
          <BorrowedBook key={index} book={book} />
        ))}
      </ul>
    </div>
  );
}

function BorrowedBook({ book }) {
  const { returnBook, reportLostBook, currentAccount } = useAccounts();

  const [confirmMessage, setConfirmMessage] = useState({
    message: "",
    icon: "",
    action: "",
    onConfirm: null,
  });
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    icon: "",
    onConfirm: null,
  });

  function handleReturn(book) {
    console.log(book);
    setConfirmMessage({
      message: "Would you like to return this book?",
      icon: "question",
      action: "return",
      onConfirm: () => returnBook(book),
    });
  }

  function handleReport(book) {
    setConfirmMessage({
      message: "Would you like to report this book as lost?",
      icon: "question",
      action: "lost",
      onConfirm: () => reportLostBook(book),
    });
  }

  function daysLeft(lentDateStr) {
    if (!lentDateStr) return null;

    const lentDate = new Date(lentDateStr);
    const now = new Date();

    const diffTime = now - lentDate; // milliseconds difference
    const diffDays = diffTime / (1000 * 60 * 60 * 24); // convert to days

    const daysRemaining = 4 - diffDays;

    if (daysRemaining <= 0) return 0;
    return Math.ceil(daysRemaining);
  }

  const remaining = daysLeft(book.lentDate);
  const isReturning = currentAccount.returning?.some((b) => b.id === book.id);
  const isLost = currentAccount.lost?.some((b) => b.id === book.id);

  const resetAlertModal = () => setAlertMessage({ message: "", icon: "" });
  const resetConfirmModal = () =>
    setConfirmMessage({ message: "", icon: "", onConfirm: null });

  return (
    <li className="w-24 sm:w-28 md:w-32 flex flex-col items-center text-center">
      {confirmMessage.message && confirmMessage.icon && (
        <ConfirmMessageModal
          icon={confirmMessage.icon}
          onCloseMessage={() => setConfirmMessage({ message: "", icon: "" })}
          onClick={() => {
            confirmMessage.onConfirm?.();
            resetConfirmModal();
            setAlertMessage({
              message: `${
                confirmMessage.action === "return"
                  ? "Your return request has been sent. You may now visit the library. (Don't forget to bring the book with you)"
                  : "Your report request has been sent to the admin."
              }`,
              icon: "success",
            });
          }}
        >
          {confirmMessage.message}
        </ConfirmMessageModal>
      )}
      {alertMessage.message && alertMessage.icon && (
        <AlertMessageModal
          icon={alertMessage.icon}
          onCloseMessage={() => resetAlertModal()}
        >
          {alertMessage.message}
        </AlertMessageModal>
      )}
      <img
        className="w-full h-36 object-cover rounded shadow-md "
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
        className="text-xs text-blue900 truncate w-full mb-1"
        title={book.author_name}
      >
        {book.author_name}
      </p>

      {!isReturning && !isLost ? (
        <p
          className={`text-xs font-semibold mb-2 ${
            remaining === 0 ? "text-red-600" : "text-green-600"
          }`}
        >
          {remaining === 0
            ? "Overdue"
            : `${remaining} day${remaining > 1 ? "s" : ""} left`}
        </p>
      ) : (
        <span
          className={`text-xs italic ${
            isReturning ? "text-green-600" : "text-red-600"
          }`}
        >
          {isReturning ? "Return request sent" : "Reported as lost"}
        </span>
      )}

      <div className="flex flex-col gap-1">
        {!isReturning && !isLost && (
          <Button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white text-xs p-2"
            onClick={() => handleReturn(book)}
          >
            Return
          </Button>
        )}
        {!isReturning && !isLost && (
          <Button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white text-xs p-2"
            onClick={() => handleReport(book)}
          >
            Report as lost
          </Button>
        )}
      </div>
    </li>
  );
}

export default BorrowedBooks;
