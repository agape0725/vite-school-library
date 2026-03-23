import { useAccounts } from "../contexts/AccountsContext";
import styles from "./Dashboard.module.css";
import DateAndTime from "./DateAndTime";
import newItem from "../assets/icons/new-item.png";
import borrow from "../assets/icons/borrow-book.png";
import lost from "../assets/icons/lost.png";
import overdue from "../assets/icons/overdue.png";
import favorite from "../assets/icons/favorite.png";
import borrowed from "../assets/icons/borrowed.png";
import success from "../assets/icons/success.png";
import overdueBook from "../assets/icons/overdue-book.png";
import empty from "../assets/icons/empty.png";
import BorrowBooks from "./BorrowBooks.jsx";
import BorrowedBooks from "./BorrowedBooks.jsx";
import FavoriteBooks from "./FavoriteBooks.jsx";
import ReportedLostBooks from "./ReportedLostBooks.jsx";
import OverdueBooks from "./OverdueBooks.jsx";
import NewArrivalBooks from "./NewArrivalBooks.jsx";
import { useEffect } from "react";

function Dashboard() {
  const { currentAccount, checkAndUpdateOverdueBooks, books } = useAccounts();

  function daysLeft(lentDateStr) {
    const lentDate = new Date(lentDateStr);
    const now = new Date();
    const diffTime = now - lentDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(4 - diffDays, 0);
  }

  useEffect(() => {
    checkAndUpdateOverdueBooks();
  }, []);

  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const lostBooks = Array.isArray(currentAccount.lost)
    ? currentAccount.lost
    : [];
  const isLost = lostBooks.length !== 0;

  const newArrivalBooks = books.filter(
    (book) => new Date(book.added_at) >= sevenDaysAgo && !book.isLost
  );

  const overdueBooks = Array.isArray(currentAccount.overdue)
    ? currentAccount.overdue
    : [];
  const isOverdue = overdueBooks.length !== 0;

  const borrowedBooks = Array.isArray(currentAccount.borrowed)
    ? currentAccount.borrowed.filter((book) => daysLeft(book.lentDate) > 0)
    : [];
  const isBorrowed = borrowedBooks.length !== 0;

  const borrowBooks = Array.isArray(currentAccount.borrow)
    ? currentAccount.borrow
    : [];
  const isBorrow = borrowBooks.length === 0;

  const faveBooks = Array.isArray(currentAccount.favorite)
    ? currentAccount.favorite
    : [];
  const isFavorite = faveBooks.length === 0;

  return (
    <div className="w-full px-4 sm:px-6 md:px-10">
      <div className={`${styles.dashboard} max-w-screen-lg mx-auto`}>
        {/* Date and Time */}
        <div className="mb-5">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Hello,{" "}
            <span className="text-orange200">{currentAccount.firstname}!</span>
          </h1>
          <DateAndTime />
        </div>
      </div>

      {/* Responsive Stat Boxes */}
      <div className="flex flex-wrap gap-4 sm:gap-5">
        <Box icon={borrowed} bookLength={currentAccount.borrowed.length}>
          Borrowed
        </Box>
        <Box icon={borrow} bookLength={currentAccount.borrow.length}>
          To Borrow
        </Box>
        <Box icon={favorite} bookLength={currentAccount.favorite.length}>
          Favorites
        </Box>
        <Box icon={overdue} bookLength={currentAccount.overdue.length}>
          Overdue
        </Box>
        <Box icon={lost} bookLength={currentAccount.lost.length}>
          Lost
        </Box>
      </div>

      <>
        {newArrivalBooks.length > 0 && (
          <BookSection label="arrival" name="Now Available">
            <NewArrivalBooks books={newArrivalBooks} />
          </BookSection>
        )}

        {isOverdue && (
          <BookSection label="overdue" name="Overdue books">
            <OverdueBooks books={overdueBooks} />
          </BookSection>
        )}

        {isLost && (
          <BookSection label="lost" name="REPORTED AS LOST">
            <ReportedLostBooks books={lostBooks} />
          </BookSection>
        )}

        {isBorrowed && (
          <BookSection label="borrowed" name="borrowed now">
            <BorrowedBooks
              books={borrowedBooks.map((book) => ({
                ...book,
                daysLeft: daysLeft(book.lentDate),
              }))}
            />
          </BookSection>
        )}

        <BookSection label="borrow" name="to borrow books">
          {isBorrow ? (
            <NoBooks>Empty borrow book list!</NoBooks>
          ) : (
            <BorrowBooks books={borrowBooks} />
          )}
        </BookSection>

        <BookSection label="favorite" name="favorites">
          {isFavorite ? (
            <NoBooks>No marked as favorite books yet!</NoBooks>
          ) : (
            <FavoriteBooks books={faveBooks} />
          )}
        </BookSection>
      </>
    </div>
  );
}

function BookSection({ children, label, name }) {
  const formatted = name
    .split("")
    .map((l, i) => (i === 0 ? l.toUpperCase() : l.toLowerCase()))
    .join("");

  return (
    <div
      className={`mt-6 transition-all duration-300 ${
        label === "arrival" && "bg-yellow-400/10 rounded-xl shadow-lg p-3"
      }`}
    >
      <div
        className={`flex items-center gap-3 mb-4 ${
          label === "arrival" &&
          "bg-yellow-100/70 py-3 px-4 rounded-lg shadow-md"
        }`}
      >
        <div className="flex gap-2 items-center">
          {label === "arrival" && (
            <img
              className="w-7"
              src={newItem}
              alt="icon-new"
              style={{
                filter:
                  "invert(82%) sepia(43%) saturate(4643%) hue-rotate(5deg) brightness(100%) contrast(94%) drop-shadow(0 0 4px rgba(255,215,0,0.4))",
              }}
            />
          )}
          <h1
            className={`transition-all duration-300 ${
              label === "borrowed" ||
              (label !== "favorite" &&
                label !== "borrow" &&
                label !== "arrival")
                ? "text-xl sm:text-2xl font-bold"
                : label === "arrival"
                ? "font-extrabold text-3xl tracking-widest"
                : "text-lg sm:text-xl font-semibold"
            } ${
              label === "favorite"
                ? "text-pink-400"
                : label === "borrow"
                ? "text-blue-400"
                : label === "borrowed"
                ? "text-green-500"
                : label === "arrival"
                ? "text-yellow-400"
                : "text-red-500"
            }`}
          >
            {label === "arrival" || label === "lost" ? name : formatted}
          </h1>
        </div>
        {label === "borrowed" ? (
          <img
            src={success}
            alt={`icon-${label}`}
            className="w-7 drop-shadow-md"
          />
        ) : label === "overdue" ? (
          <img
            src={overdueBook}
            alt={`icon-${label}`}
            className="w-7 drop-shadow-md"
          />
        ) : null}
      </div>
      <div
        className={`p-2 sm:p-3 ${
          label === "arrival" && "bg-slate-900/5 rounded-lg"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Box({ children, bookLength, icon }) {
  return (
    <div
      className={`${styles.box} flex-1 min-w-[140px] sm:min-w-[160px] md:min-w-[180px]`}
    >
      <div>
        <span className="text-lg sm:text-xl">{bookLength}</span>
        <div>
          <img
            src={icon}
            alt={children}
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </div>
      </div>
      <h1 className="text-sm sm:text-base">{children}</h1>
    </div>
  );
}

function NoBooks({ children }) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <span className="text-gray-400/70 italic text-sm sm:text-base">
        {children}
      </span>
      <img className="w-20 sm:w-24 mb-6" src={empty} alt="icon-empty" />
    </div>
  );
}

export default Dashboard;
