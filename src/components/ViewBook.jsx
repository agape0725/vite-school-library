import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const [authorName, setAuthorName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://openlibrary.org/works/${id}.json`
        );
        if (!response.ok) throw new Error("Failed to fetch book details");

        const data = await response.json();

        const authorKey = data.authors[0].author.key;
        if (authorKey) {
          const resAuthor = await fetch(
            `https://openlibrary.org${authorKey}.json`
          );
          const dataAuthor = await resAuthor.json();
          setAuthorName(dataAuthor.name);
        }

        setBookDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  function content() {
    if (isLoading) return <Loader />;
    if (error) return <ErrorFetch message={error} />;
    if (!bookDetails) return <ErrorFetch message="No book found" />;
    if (bookDetails && !isLoading && !error)
      return <BookDetails details={bookDetails} author={authorName} />;
  }

  return (
    <>
      <Overlay
        opacity="opacity-75"
        position="fixed"
        onClick={() => navigate("/library")}
      />
      <div className={`${styles.details}`}>{content()}</div>
    </>
  );
}

export default ViewBook;
