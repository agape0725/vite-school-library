import { useState, useEffect } from "react";
import Button from "./Button";
import AlertMessageModal from "./AlertMessageModal";
import ConfirmMessageModal from "./ConfirmMessageModal";
import noResultsIcon from "../assets/icons/no-results.png";
import { useAccounts } from "../contexts/AccountsContext";

const backendUrl = "http://localhost:7000";

function ManageRemoveEditBooks() {
  const { accounts, deleteBook } = useAccounts();
  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState("");
  const [alertModal, setAlertModal] = useState({ message: "", icon: "" });
  const [confirmModal, setConfirmModal] = useState({
    message: "",
    icon: "",
    onConfirm: null,
  });
  const [searchBy, setSearchBy] = useState("title");
  const [editBook, setEditBook] = useState(null); // Book being edited
  const [formData, setFormData] = useState({
    title: "",
    author_name: "",
    first_publish_year: "",
    book_cover: "",
    description: "",
    category: "",
    rating: "",
  });

  // Fetch books from JSON server
  useEffect(() => {
    fetch(`${backendUrl}/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  // Handle delete
  const handleDelete = async (book) => {
    const usersWithBorrowRequest = accounts.filter((acc) =>
      (acc.borrow || []).some((b) => b.id === book.id)
    );

    const usersWhoBorrowed = accounts.find((acc) =>
      (acc.borrowed || []).some((b) => b.id === book.id)
    );

    if (usersWhoBorrowed) {
      const { firstname, lastname, studentNumber, year } = usersWhoBorrowed;

      setAlertModal({
        message: (
          <div className="space-y-4 text-sm text-gray-800">
            <p className="font-medium">
              This book ({book.title}) is currently borrowed by {firstname}.
              Please wait for its return before deleting.
            </p>
            <div className="space-y-2 text-xs">
              <h1 className="font-semibold">USER DETAILS</h1>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm">
                <p>
                  <span className="text-gray-700 font-semibold">
                    Fullname:{" "}
                  </span>
                  {firstname} {lastname}
                </p>
                <p>
                  <span className="text-gray-700 font-semibold">USN: </span>
                  {studentNumber}
                </p>
                <p className="italic text-gray-600">
                  {year === "Shs" ? "Senior Highschool" : "College"}
                </p>
              </div>
            </div>
          </div>
        ),
        icon: "info",
      });

      return;
    } else if (usersWithBorrowRequest.length > 0) {
      const userDetails = usersWithBorrowRequest.map((user) => ({
        fullname: `${user.firstname} ${user.lastname}`,
        usn: user.studentNumber,
        year: user.year,
      }));

      setAlertModal({
        message: (
          <div className="space-y-4 text-sm text-gray-800">
            <p className="font-medium">
              This book ({book.title}) is currently in student(s) borrow
              request. Review and decline the request before deleting.
            </p>
            <p className="font-semibold text-gray-900">
              User(s) who requested to borrow this book:
            </p>
            <div className="space-y-3 text-xs">
              {userDetails.map((user, key) => (
                <div
                  key={key}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm"
                >
                  <p>
                    <span className="text-gray-700 font-semibold">
                      Fullname:{" "}
                    </span>
                    {user.fullname}
                  </p>
                  <p>
                    <span className="text-gray-700 font-semibold">USN: </span>
                    {user.usn}
                  </p>
                  <p className="italic text-gray-600">
                    {user.year === "Shs" ? "Senior Highschool" : "College"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ),
        icon: "info",
      });

      return;
    }

    setConfirmModal({
      message: `Are you sure you want to delete this book? ${book.title}`,
      icon: "question",
      onConfirm: () => deleteBook(book.id),
    });
  };

  // Handle edit click
  const handleEditClick = (book) => {
    setEditBook(book.id);
    setFormData({
      title: book.title,
      author_name: Array.isArray(book.author_name)
        ? book.author_name.join(", ")
        : book.author_name || "",
      first_publish_year: book.first_publish_year || "",
      book_cover: book.book_cover || "",
      description: book.description || "",
      category: Array.isArray(book.category)
        ? book.category.join(", ")
        : book.category || "",
      rating: book.rating || "",
    });
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save
  const handleSave = async (id) => {
    const updatedBook = {
      id: String(id),
      key: String(id),
      title: formData.title,
      author_name: formData.author_name
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      first_publish_year: Number(formData.first_publish_year),
      book_cover: formData.book_cover,
      description: formData.description,
      category: formData.category
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      rating: Number(formData.rating),
    };

    try {
      await fetch(`${backendUrl}/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });

      setBooks((prev) => prev.map((b) => (b.id === id ? updatedBook : b)));
      setEditBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const filteredBooks = books.filter((book) => {
    const title = book.title?.toLowerCase() || "";
    const author = Array.isArray(book.author_name)
      ? book.author_name.join(", ").toLowerCase()
      : (book.author_name || "").toLowerCase();
    const year = String(book.first_publish_year || "").toLowerCase();

    return searchBy === "title"
      ? title.includes(searchBook.toLowerCase())
      : searchBy === "author"
      ? author.includes(searchBook.toLowerCase())
      : year.includes(searchBook.toLowerCase());
  });

  const resetAlertModal = () => setAlertModal({ message: "", icon: "" });
  const resetConfirmModal = () => setConfirmModal({ message: "", icon: "" });

  return (
    <div className="flex flex-col gap-5">
      {/* Alert Message Modal */}
      {alertModal.message && alertModal.icon && (
        <AlertMessageModal
          icon={alertModal.icon}
          onCloseMessage={resetAlertModal}
        >
          {alertModal.message}
        </AlertMessageModal>
      )}

      {/* Confirm Message Modal */}
      {confirmModal.message && confirmModal.icon && (
        <ConfirmMessageModal
          icon={confirmModal.icon}
          onClick={() => {
            if (confirmModal.onConfirm) confirmModal.onConfirm();
          }}
          onCloseMessage={resetConfirmModal}
        >
          {confirmModal.message}
        </ConfirmMessageModal>
      )}

      {/* Search Section */}
      <div className="flex flex-col items-center gap-2">
        <label className="text-lg font-poppins font-semibold text-blue900">
          SEARCH
        </label>
        <div className="flex flex-wrap justify-center gap-2">
          <input
            type="text"
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
            className="p-2 rounded-lg text-xs border border-gray-300 w-40 sm:w-56"
            placeholder="Search book..."
          />
          <select
            className="p-2 rounded-lg text-xs border border-gray-300"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="flex flex-col gap-3 p-3 border rounded-lg shadow-sm bg-white"
            >
              {editBook === book.id ? (
                // Edit Mode
                <div className="flex flex-col gap-2 text-sm">
                  <BookInput
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeHolder="Title"
                  />
                  <BookInput
                    type="text"
                    name="author_name"
                    value={formData.author_name}
                    onChange={handleChange}
                    placeHolder="Author(s), comma-separated"
                  />
                  <BookInput
                    type="number"
                    name="first_publish_year"
                    value={formData.first_publish_year}
                    onChange={handleChange}
                    placeHolder="Year"
                  />
                  <BookInput
                    label="Book Cover"
                    name="book_cover"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFormData((prev) => ({
                          ...prev,
                          book_cover: `assets/book-cover/${file.name}`,
                        }));
                      }
                    }}
                  />
                  <textarea
                    type="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-1 rounded"
                  />
                  <BookInput
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeHolder="Category, comma-separated"
                  />
                  <BookInput
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    placeHolder="Rating"
                  />
                  <div className="flex gap-2">
                    <Button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => handleSave(book.id)}
                    >
                      Save
                    </Button>
                    <Button
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      onClick={() => setEditBook(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex flex-col gap-2 text-sm items-center">
                  <div className="text-xs flex flex-col items-center">
                    <img
                      className="w-24 h-32 rounded-lg object-cover mb-3"
                      src={`${backendUrl}/${book.book_cover}`}
                      alt="book-cover"
                    />
                    <p className="font-semibold">{book.title}</p>
                    <p className="text-gray-500">
                      {Array.isArray(book.author_name)
                        ? book.author_name.join(", ")
                        : book.author_name}
                    </p>
                    <p className="text-gray-400">{book.first_publish_year}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleEditClick(book)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(book)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5 items-center my-10">
          <p className="text-gray-500/50 text-lg italic">No books found.</p>
          <img className="w-20" src={noResultsIcon} alt="icon-no-found" />
        </div>
      )}
    </div>
  );
}

function BookInput({ type, name, value, onChange, placeholder }) {
  return (
    <>
      {type !== "textarea" ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border p-1 rounded"
        />
      ) : (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border p-1 rounded"
        />
      )}
    </>
  );
}

export default ManageRemoveEditBooks;
