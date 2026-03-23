import noImage from "../assets/images/no-cover.jpg";
import Button from "./Button";
import AlertMessageModal from "./AlertMessageModal";
import closeImg from "../assets/icons/close.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAccounts } from "../contexts/AccountsContext";
import { b } from "framer-motion/m";

const backendUrl = "http://localhost:7000";

function BookDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [alertMessage, setAlertMessage] = useState({ message: "", icon: "" });
  const {
    borrowBook,
    favoriteBook,
    isAuthenticated,
    currentAccount,
    accounts,
  } = useAccounts();

  // Get the passed book object from Link's state
  const book = location.state?.book;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        navigate("/library");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  if (!book) {
    // Show fallback if no book data found in state
    return (
      <div className="flex flex-col m-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          Book Details Not Found
        </h2>
        <p className="text-gray-500 mb-6 italic text-sm">
          We couldn't find the details of this book. It might have been removed
          or is temporarily unavailable.
        </p>
        <Button
          onClick={() => navigate("/library")}
          className="px-6 py-2 rounded-xl font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all shadow-md m-auto"
        >
          Back to Library
        </Button>
      </div>
    );
  }

  // Destructure local book data
  const {
    key,
    title,
    description,
    category: categoryArray,
    author_name: authorArray,
    first_publish_year: year,
    book_cover: cover,
  } = book;

  // Keep author and category in array
  const author =
    authorArray && authorArray.length ? authorArray : ["Unknown Author"];
  const categories =
    categoryArray && categoryArray.length ? categoryArray : ["No Category"];

  // For display
  const authorsDisplay = author.join(", ");
  const categoriesDisplay = categories.join(", ");

  const imageSrc = cover
    ? cover.startsWith("http")
      ? cover
      : `${backendUrl}/${cover}`
    : noImage;

  // Borrow book handler
  const handleBorrow = () => {
    if (!isAuthenticated) {
      // alert();
      setAlertMessage({
        message: "Please log in to borrow books.",
        icon: "sad",
      });
      return;
    }

    const borrowedMatchByCurrentUser =
      Array.isArray(currentAccount.borrowed) &&
      currentAccount.borrowed.some((b) => b.id === book.id);

    if (borrowedMatchByCurrentUser) {
      // alert();
      setAlertMessage({
        message: "You have already borrowed this book.",
        icon: "info",
      });
      return;
    }

    const lostMatchByCurrentUser =
      Array.isArray(currentAccount.lost) &&
      currentAccount.lost.some((b) => b.id === book.id);

    if (lostMatchByCurrentUser) {
      // alert();
      setAlertMessage({
        message:
          "It looks like this book has been reported as lost. Kindly replace it and return it to the library before borrowing it again. Thank you!",
        icon: "sad",
      });
      return;
    }

    const isAlreadyInBorrow = currentAccount.borrow.some(
      (b) => b.id === book.id || b.title === book.title
    );

    // Already in borrow list
    if (isAlreadyInBorrow) {
      // alert();
      setAlertMessage({
        message: "This book is already in your borrow list.",
        icon: "info",
      });
      return;
    }

    // Already borrowed or reported lost by other student
    const isBorrowedOrLostByOther = accounts.some((acc) => {
      if (acc.id === currentAccount.id) return false; // skip current user

      const borrowedMatch =
        Array.isArray(acc.borrowed) &&
        acc.borrowed.some((b) => b.id === book.id || b.title === book.title);

      const lostMatch =
        Array.isArray(acc.lost) &&
        acc.lost.some((b) => b.id === book.id || b.title === book.title);

      return borrowedMatch || lostMatch;
    });

    if (isBorrowedOrLostByOther && book.availableQuantity <= 0) {
      // alert();
      setAlertMessage({
        message:
          "This book is currently borrowed by another user. You may add it to your favorites and borrow it once it's returned.",
        icon: "info",
      });
      return;
    }

    const borrowedBook = {
      id: key || crypto.randomUUID(),
      title,
      author_name: author,
      category: categories,
      year,
      book_cover: `${backendUrl}/${cover}`,
    };

    borrowBook(borrowedBook);
    // alert();
    setAlertMessage({
      message: " BOOK HAS BEEN ADDED TO YOUR BORROW LIST",
      icon: "success",
    });
  };

  // Favorite book handler
  const handleFavoriteBook = () => {
    if (!isAuthenticated) {
      // alert();
      setAlertMessage({
        message: "Please log in to mark this book as favorite.",
        icon: "cancel",
      });
      return;
    }

    const alreadyFavorite = currentAccount.favorite.some(
      (b) => b.id === book.id || b.title === book.title
    );

    if (alreadyFavorite) {
      // alert();
      setAlertMessage({
        message: "You've already marked this book as favorite.",
        icon: "info",
      });
      return;
    }

    const favoritedBook = {
      id: key || crypto.randomUUID(),
      title,
      author_name: author,
      category: categories,
      year,
      book_cover: `${backendUrl}/${cover}`,
    };

    favoriteBook(favoritedBook);
    // alert();
    setAlertMessage({
      message: "Book successfully marked as favorite!",
      icon: "success",
    });
  };

  return (
    <>
      <div className="absolute right-5" onClick={() => navigate("/library")}>
        <img className="w-4 cursor-pointer" src={closeImg} alt="close" />
      </div>

      {alertMessage.message && (
        <AlertMessageModal
          icon={alertMessage.icon}
          onCloseMessage={() => {
            setAlertMessage({ message: "", icon: "" });
            if (alertMessage.icon === "success") {
              navigate("/library");
            }
          }}
        >
          {alertMessage.message}
        </AlertMessageModal>
      )}

      <img
        className="rounded-lg w-full h-[50vh] md:w-[250px] mx-auto object-contain flex items-center justify-center text-xs italic"
        src={imageSrc}
        alt={title}
      />

      <div className="flex flex-col gap-3 justify-center w-full">
        <p className="text-xl text-blue900 font-semibold">{title}</p>

        <Details name="description" value={description}>
          Description
        </Details>

        <div className="flex flex-col gap-1">
          <Details name="author" value={authorsDisplay}>
            Author
          </Details>
          <Details name="year" value={year}>
            Year
          </Details>
          <Details name="categories" value={categoriesDisplay}>
            Category
          </Details>
        </div>

        <div className="flex gap-2 mt-5 justify-center md:justify-start">
          <Button
            buttonStyleType="btn2"
            padding="padding3"
            hover="hover2"
            onClick={handleBorrow}
          >
            Borrow
          </Button>
          <Button
            buttonStyleType="btn1"
            padding="padding3"
            hover="hover1"
            onClick={handleFavoriteBook}
          >
            Add to favorite
          </Button>
        </div>
      </div>
    </>
  );
}

function Details({ children, name, value }) {
  return (
    <>
      {value && name === "description" ? (
        <p className="text-xs italic">{value}</p>
      ) : value ? (
        <p className="text-xs">
          <span className="text-orange200">{children}:</span> {value}
        </p>
      ) : null}
    </>
  );
}

export default BookDetails;
