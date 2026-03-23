import { useState } from "react";
import fillIcon from "../assets/icons/fill.png";
import { useAccounts } from "../contexts/AccountsContext";
import AlertMessageModal from "./AlertMessageModal";

function ManageAddBooks() {
  const { createBook } = useAccounts();
  const [alertModal, setAlertModal] = useState({ message: "", icon: "" });
  const [bookDetails, setBookDetails] = useState({
    key: "",
    title: "",
    author_name: "",
    first_publish_year: "",
    book_cover: "",
    description: "",
    category: "",
    rating: "",
    totalQuantity: 0,
    added_at: "",
    isLost: false,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files.length > 0) {
      // Just store the file path (relative to /public folder)
      setBookDetails((prev) => ({
        ...prev,
        book_cover: `assets/book-cover/${files[0].name}`,
      }));
    } else {
      setBookDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !bookDetails.key ||
      !bookDetails.title ||
      !bookDetails.author_name ||
      !bookDetails.first_publish_year ||
      Number(bookDetails.totalQuantity) <= 0
    ) {
      setAlertModal({
        message:
          "Please fill in the required fields: ISBN, Title, Author name, Publish year.",
        icon: "info",
      });
      return;
    }

    const totalQty = Number(bookDetails.totalQuantity);

    const formattedBook = {
      id: bookDetails.key,
      key: bookDetails.key,
      title: bookDetails.title,
      author_name: bookDetails.author_name
        .split(",")
        .map((author) => author.trim()),
      first_publish_year: Number(bookDetails.first_publish_year) || null,
      book_cover: bookDetails.book_cover,
      description: bookDetails.description,
      category: bookDetails.category.split(",").map((c) => c.trim()),
      rating: Number(bookDetails.rating) || null,

      // 🔥 QUANTITY LOGIC
      totalQuantity: totalQty,
      availableQuantity: totalQty,

      added_at: new Date().toISOString(),
      isLost: false,
    };

    try {
      // 1. Check if the book already exists
      const checkRes = await fetch(
        `http://localhost:7000/books?id=${encodeURIComponent(formattedBook.id)}`
      );
      if (!checkRes.ok) throw new Error("Failed to check for duplicates");

      const existingBooks = await checkRes.json();
      if (existingBooks.length > 0) {
        setAlertModal({
          message: "A book with this ISBN/ID already exists.",
          icon: "cancel",
        });
        return;
      }

      // 2. Add the book if its not existing
      createBook(formattedBook);

      setAlertModal({ message: "Book added successfully!", icon: "success" });
      setBookDetails({
        key: "",
        title: "",
        author_name: "",
        first_publish_year: "",
        book_cover: "",
        description: "",
        category: "",
        rating: "",
        totalQuantity: 0,
        isLost: bookDetails.isLost,
      });
    } catch (err) {
      console.error(err);
      setAlertModal({
        message: "Error adding book. Please try again.",
        icon: "cancel",
      });
    }
  }

  const resetAlertModal = () => setAlertModal({ message: "", icon: "" });

  return (
    <>
      {alertModal.message && alertModal.icon && (
        <AlertMessageModal
          icon={alertModal.icon}
          onCloseMessage={resetAlertModal}
        >
          {alertModal.message}
        </AlertMessageModal>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 items-center"
      >
        <div className="flex items-center gap-2">
          <h1 className="text-blue900 text-2xl font-semibold">Book Form</h1>
          <img className="w-7" src={fillIcon} alt="icon-fill" />
        </div>

        <div className="flex flex-col gap-5 w-full max-w-md bg-white p-5 rounded-lg shadow">
          <BookInput
            label="ISBN"
            name="key"
            value={bookDetails.key}
            onChange={handleChange}
          />
          <BookInput
            label="Title"
            name="title"
            value={bookDetails.title}
            onChange={handleChange}
          />
          <BookInput
            label="Author (comma separated)"
            name="author_name"
            value={bookDetails.author_name}
            onChange={handleChange}
          />
          <BookInput
            label="Total Quantity"
            name="totalQuantity"
            type="number"
            value={bookDetails.totalQuantity}
            onChange={handleChange}
          />
          <BookInput
            label="Publish year"
            name="first_publish_year"
            type="number"
            value={bookDetails.first_publish_year}
            onChange={handleChange}
          />
          <BookTextarea
            label="Description"
            name="description"
            value={bookDetails.description}
            onChange={handleChange}
          />
          <BookInput
            label="Category (comma separated)"
            name="category"
            value={bookDetails.category}
            onChange={handleChange}
          />
          <BookInput
            label="Book cover"
            name="book_cover"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
          <BookInput
            label="Rating"
            name="rating"
            type="number"
            step="0.01"
            value={bookDetails.rating}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          padding="padding1"
          hover="hover1"
          className="p-3 rounded-lg text-xs border border-blue900 text-blue500 hover:bg-blue900 hover:text-white"
        >
          CONFIRM
        </button>
      </form>
    </>
  );
}

function BookInput({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold">{label}:</label>
      <input {...props} className="border rounded px-2 py-1" />
    </div>
  );
}

function BookTextarea({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold">{label}:</label>
      <textarea
        {...props}
        className="border rounded px-2 py-1 resize-none h-24"
      />
    </div>
  );
}

export default ManageAddBooks;
