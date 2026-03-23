import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../../data/db.json"; // adjust path if needed
import styles from "./ViewBook.module.css";
import Loader from "./Loader";
import ErrorFetch from "./ErrorFetch";
import BookDetails from "./BookDetails";
import Overlay from "./Overlay";

function ViewBook() {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setError("");

    // Find the book in local data by matching 'id' to book key or id field
    const findBook = () => {
      // Depending on how your local data's key/id looks, adapt this
      // Here assuming key looks like "/works/OL1234W", so we strip "/works/" prefix to compare with id param
      const book = data.books.find((b) => b.key === id);

      if (!book) {
        setError("No book found");
        setBookDetails(null);
      } else {
        setBookDetails(book);
      }
      setIsLoading(false);
    };

    findBook();
  }, [id]);

  function content() {
    if (isLoading) return <Loader />;
    if (error) return <ErrorFetch message={error} />;
    if (!bookDetails) return <ErrorFetch message="No book found" />;
    return (
      <BookDetails
        details={bookDetails}
        author={
          bookDetails.author_name
            ? bookDetails.author_name.join(", ")
            : "Unknown Author"
        }
      />
    );
  }

  return (
    <>
      <Overlay
        opacity="opacity-75"
        position="fixed"
        zIndex="z-50"
        onClick={() => navigate("/library")}
      />
      <div className={`${styles.details}`}>{content()}</div>
    </>
  );
}

export default ViewBook;
