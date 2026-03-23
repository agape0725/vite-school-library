// import { useState } from "react";
// import Button from "./Button";
// import AlertMessageModal from "./AlertMessageModal";
// import ConfirmMessageModal from "./ConfirmMessageModal";
// import noResultsIcon from "../assets/icons/no-results.png";
// import { useAccounts } from "../contexts/AccountsContext";

// const backendUrl = "http://localhost:7000";

// function ManageRemoveEditBooks() {
//   const {
//     accounts,
//     books,
//     deleteBook,
//     updateBook,
//     toggleBookLost,
//     currentAccount,
//     removeBookFromAllFavorites,
//   } = useAccounts();
//   const [searchBook, setSearchBook] = useState("");
//   const [alertModal, setAlertModal] = useState({ message: "", icon: "" });
//   const [confirmModal, setConfirmModal] = useState({
//     message: "",
//     icon: "",
//     onConfirm: null,
//   });
//   const [searchBy, setSearchBy] = useState("title");
//   const [editBook, setEditBook] = useState(null); // Book being edited
//   const [displayCount, setDisplayCount] = useState(8);
//   const [formData, setFormData] = useState({
//     title: "",
//     author_name: "",
//     first_publish_year: "",
//     book_cover: "",
//     description: "",
//     category: "",
//     rating: "",
//     added_at: "",
//     isLost: "",
//   });

//   function getBorrowRequestUsers(accounts, book) {
//     return accounts.filter((acc) =>
//       (acc.borrow || []).some((b) => b.id === book.id)
//     );
//   }

//   function getCurrentBorrower(accounts, book) {
//     return accounts.find((acc) => {
//       const allBooks = [...(acc.borrowed || []), ...(acc.lost || [])];
//       return allBooks.some((b) => b.id === book.id);
//     });
//   }

//   // function getCurrentBorrower(accounts, book) {
//   //   return accounts.find((acc) =>
//   //     ((acc.borrowed && acc.lost) || []).some((b) => b.id === book.id)
//   //   );
//   // }

//   function BorrowRequestAlert({ book, users }) {
//     return (
//       <div className="space-y-4 text-sm text-gray-800">
//         <p className="font-medium">
//           This book ({book.title}) is currently in student(s) borrow request.
//           Review and decline the request before deleting.
//         </p>
//         <p className="font-semibold text-gray-900">
//           User(s) who requested to borrow this book:
//         </p>
//         <div
//           className={`grid ${
//             users.length === 1 ? "grid-cols-1" : "sm:grid-cols-1 lg:grid-cols-2"
//           }   gap-3 text-xs`}
//         >
//           {users.map((user, key) => (
//             <div
//               key={key}
//               className="rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm"
//             >
//               <p>
//                 <span className="text-gray-700 font-semibold">Fullname: </span>
//                 {user.fullname}
//               </p>
//               <p>
//                 <span className="text-gray-700 font-semibold">USN: </span>
//                 {user.studentNumber}
//               </p>
//               {user.year ? (
//                 <p className="italic text-gray-600">
//                   {user.year === "Shs" ? "Senior Highschool" : "College"}
//                 </p>
//               ) : (
//                 <p className="italic text-gray-600">{user.role}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   function BorrowedBookAlert({ book, user }) {
//     return (
//       <div className="space-y-4 text-sm text-gray-800">
//         <p className="font-medium">
//           This book ({book.title}) is currently borrowed by {user.firstname}.
//           Please wait for its return before deleting.
//         </p>
//         <div className="space-y-2 text-xs">
//           <h1 className="font-semibold">USER DETAILS</h1>
//           <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm">
//             <p>
//               <span className="text-gray-700 font-semibold">Fullname: </span>
//               {user.firstname} {user.lastname}
//             </p>
//             <p>
//               <span className="text-gray-700 font-semibold">USN: </span>
//               {user.studentNumber}
//             </p>
//             <p className="italic text-gray-600">
//               {user.year === "Shs" ? "Senior Highschool" : "College"}
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Handle delete
//   const handleDelete = async (book) => {
//     // Current user logic

//     const isBorrowedByCurrentUser = (currentAccount?.borrowed || []).some(
//       (b) => b.id === book.id
//     );
//     const isRequestedByCurrentUser = (currentAccount?.borrow || []).some(
//       (b) => b.id === book.id
//     );

//     if (isBorrowedByCurrentUser) {
//       setAlertModal({
//         message: (
//           <p>
//             You currently have this book (<strong>{book.title}</strong>)
//             borrowed. You cannot delete it until it's returned.
//           </p>
//         ),
//         icon: "info",
//       });
//       return;
//     }

//     if (isRequestedByCurrentUser) {
//       setAlertModal({
//         message: (
//           <p>
//             You have a pending borrow request for <strong>{book.title}</strong>.
//             Please cancel the request before deleting this book.
//           </p>
//         ),
//         icon: "info",
//       });
//       return;
//     }

//     // Users logic
//     const usersWhoBorrowed = getCurrentBorrower(accounts, book);
//     const usersWithBorrowRequest = getBorrowRequestUsers(accounts, book);

//     if (usersWhoBorrowed) {
//       setAlertModal({
//         message: <BorrowedBookAlert book={book} user={usersWhoBorrowed} />,
//         icon: "info",
//       });

//       return;
//     } else if (usersWithBorrowRequest.length > 0) {
//       setAlertModal({
//         message: (
//           <BorrowRequestAlert book={book} users={usersWithBorrowRequest} />
//         ),
//         icon: "info",
//       });

//       return;
//     }

//     setConfirmModal({
//       message: (
//         <p>
//           Are you sure you want to delete <strong>{book.title}</strong>?
//         </p>
//       ),
//       icon: "question",
//       onConfirm: async () => {
//         await removeBookFromAllFavorites(book.id); // remove from favorites
//         deleteBook(book.id); // delete the book itself
//       },
//     });
//   };

//   // Handle edit click
//   const handleEditClick = (book) => {
//     setEditBook(book.id);
//     setFormData({
//       title: book.title,
//       author_name: Array.isArray(book.author_name)
//         ? book.author_name.join(", ")
//         : book.author_name || "",
//       first_publish_year: book.first_publish_year || "",
//       book_cover: book.book_cover || "",
//       description: book.description || "",
//       category: Array.isArray(book.category)
//         ? book.category.join(", ")
//         : book.category || "",
//       rating: book.rating || "",
//       added_at: book.added_at,
//       isLost: book.isLost,
//     });
//   };

//   // Handle form change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle save
//   const handleSave = async (id) => {
//     const updatedBook = {
//       id: String(id),
//       key: String(id),
//       title: formData.title,
//       author_name: formData.author_name
//         .split(",")
//         .map((a) => a.trim())
//         .filter(Boolean),
//       first_publish_year: Number(formData.first_publish_year),
//       book_cover: formData.book_cover,
//       description: formData.description,
//       category: formData.category
//         .split(",")
//         .map((c) => c.trim())
//         .filter(Boolean),
//       rating: Number(formData.rating),
//       added_at: formData.added_at,
//       isLost: Boolean(formData.isLost),
//     };

//     try {
//       await fetch(`${backendUrl}/books/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedBook),
//       });

//       updateBook(updatedBook); // <-- tell context to update
//       setEditBook(null); // close edit mode
//       setSearchBook("");
//       setSearchBy("title");
//       setAlertModal({ message: "Book updated!", icon: "success" });
//     } catch (error) {
//       console.error("Error updating book:", error);
//     }
//   };

//   const handleReportLost = async (book) => {
//     setConfirmModal({
//       message: `${
//         !book.isLost
//           ? `Book ${book.title} has been marked as unavailable.`
//           : `Book ${book.title} is now AVAILABLE!`
//       }`,
//       icon: "success",
//       onConfirm: () => toggleBookLost(book),
//     });
//   };

//   const filteredBooks = books.filter((book) => {
//     const title = book.title?.toLowerCase() || "";
//     const isbn = book.id;
//     const author = Array.isArray(book.author_name)
//       ? book.author_name.join(", ").toLowerCase()
//       : (book.author_name || "").toLowerCase();
//     const year = String(book.first_publish_year || "").toLowerCase();

//     return searchBy === "title"
//       ? title.includes(searchBook.toLowerCase())
//       : searchBy === "isbn"
//       ? isbn.includes(Number(searchBook))
//       : searchBy === "author"
//       ? author.includes(searchBook.toLowerCase())
//       : year.includes(searchBook.toLowerCase());
//   });

//   const resetAlertModal = () => setAlertModal({ message: "", icon: "" });
//   const resetConfirmModal = () =>
//     setConfirmModal({ message: "", icon: "", onConfirm: null });

//   return (
//     <div className="flex flex-col gap-5">
//       {/* Alert Message Modal */}
//       {alertModal.message && alertModal.icon && (
//         <AlertMessageModal
//           icon={alertModal.icon}
//           onCloseMessage={resetAlertModal}
//         >
//           {alertModal.message}
//         </AlertMessageModal>
//       )}

//       {/* Confirm Message Modal */}
//       {confirmModal.message && confirmModal.icon && (
//         <ConfirmMessageModal
//           icon={confirmModal.icon}
//           onClick={() => {
//             if (confirmModal.onConfirm) confirmModal.onConfirm();
//             resetConfirmModal();
//           }}
//           onCloseMessage={resetConfirmModal}
//         >
//           {confirmModal.message}
//         </ConfirmMessageModal>
//       )}

//       {/* Search Section */}
//       <div className="flex flex-col items-center gap-2">
//         <label className="text-lg font-poppins font-semibold text-blue900">
//           SEARCH
//         </label>
//         <div className="flex flex-wrap justify-center gap-2">
//           <input
//             type="text"
//             value={searchBook}
//             onChange={(e) => setSearchBook(e.target.value)}
//             className="p-2 rounded-lg text-xs border border-gray-300 w-40 sm:w-56"
//             placeholder="Search book..."
//           />
//           <select
//             className="p-2 rounded-lg text-xs border border-gray-300"
//             value={searchBy}
//             onChange={(e) => setSearchBy(e.target.value)}
//           >
//             <option value="title">Title</option>
//             <option value="author">Author</option>
//             <option value="year">Year</option>
//             <option value="isbn">ISBN</option>
//           </select>
//         </div>
//       </div>

//       {/* Books Grid */}
//       {filteredBooks.length > 0 ? (
//         <>
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//             {filteredBooks.slice(0, displayCount).map((book) => (
//               <div
//                 key={book.id}
//                 className="flex flex-col gap-3 p-3 border rounded-lg shadow-sm bg-white"
//               >
//                 {editBook === book.id ? (
//                   // Edit Mode
//                   <div className="flex flex-col gap-2 text-sm">
//                     <BookInput
//                       type="text"
//                       name="title"
//                       value={formData.title}
//                       onChange={handleChange}
//                       placeholder="Title"
//                     />
//                     <BookInput
//                       type="text"
//                       name="author_name"
//                       value={formData.author_name}
//                       onChange={handleChange}
//                       placeholder="Author(s), comma-separated"
//                     />
//                     <BookInput
//                       type="number"
//                       name="first_publish_year"
//                       value={formData.first_publish_year}
//                       onChange={handleChange}
//                       placeholder="Year"
//                     />
//                     <BookInput
//                       type="file"
//                       label="Book Cover"
//                       name="book_cover"
//                       accept="image/*"
//                       onChange={(e) => {
//                         const file = e.target.files?.[0];
//                         if (file) {
//                           setFormData((prev) => ({
//                             ...prev,
//                             book_cover: `assets/book-cover/${file.name}`,
//                           }));
//                         }
//                       }}
//                     />
//                     <BookInput
//                       type="textarea"
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       placeholder="Description"
//                       className="border p-1 rounded"
//                     />
//                     <BookInput
//                       type="text"
//                       name="category"
//                       value={formData.category}
//                       onChange={handleChange}
//                       placeholder="Category, comma-separated"
//                     />
//                     <BookInput
//                       type="number"
//                       name="rating"
//                       value={formData.rating}
//                       onChange={handleChange}
//                       placeholder="Rating"
//                     />
//                     <div className="flex gap-2">
//                       <Button
//                         className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                         onClick={() => handleSave(book.id)}
//                       >
//                         Save
//                       </Button>
//                       <Button
//                         className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
//                         onClick={() => setEditBook(null)}
//                       >
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   // View Mode
//                   <div className="flex flex-col gap-2 text-sm items-center">
//                     <div className="text-xs flex flex-col items-center">
//                       <img
//                         className="w-24 h-32 rounded-lg object-cover mb-3"
//                         src={`${backendUrl}/${book.book_cover}`}
//                         alt="book-cover"
//                       />
//                       <p className="font-semibold">{book.title}</p>
//                       <p className="text-gray-500">
//                         {Array.isArray(book.author_name)
//                           ? book.author_name.join(", ")
//                           : book.author_name}
//                       </p>
//                       <p className="text-gray-400">{book.first_publish_year}</p>
//                     </div>
//                     <div className="grid grid-cols-2 gap-1">
//                       <Button
//                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 col-span-1"
//                         onClick={() => handleEditClick(book)}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 col-span-1"
//                         onClick={() => handleDelete(book)}
//                       >
//                         Delete
//                       </Button>
//                       <Button
//                         className={`${
//                           !book.isLost
//                             ? "bg-amber-600 hover:bg-amber-700"
//                             : "bg-green-500 hover:bg-green-600"
//                         } text-white px-3 py-1 rounded col-span-2`}
//                         onClick={() => handleReportLost(book)}
//                       >
//                         {!book.isLost
//                           ? "MARK AS UNAVAILABLE"
//                           : "MARK AS AVAILABLE"}
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//           {displayCount < books.length && (
//             <div className="m-auto">
//               <Button
//                 buttonStyleType="btn1"
//                 padding="padding1"
//                 hover="hover1"
//                 onClick={() => setDisplayCount((prev) => prev + 8)}
//               >
//                 See more
//               </Button>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="flex flex-col gap-5 items-center my-10">
//           <p className="text-gray-500/50 text-lg italic">No books found.</p>
//           <img className="w-20" src={noResultsIcon} alt="icon-no-found" />
//         </div>
//       )}
//     </div>
//   );
// }

// function BookInput({ type = "text", name, value, onChange, placeholder }) {
//   return (
//     <>
//       {type === "textarea" ? (
//         <textarea
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className="border p-1 rounded"
//         />
//       ) : (
//         <input
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className="border p-1 rounded"
//         />
//       )}
//     </>
//   );
// }

// export default ManageRemoveEditBooks;

import { useState } from "react";
import Button from "./Button";
import AlertMessageModal from "./AlertMessageModal";
import ConfirmMessageModal from "./ConfirmMessageModal";
import noResultsIcon from "../assets/icons/no-results.png";
import { useAccounts } from "../contexts/AccountsContext";

const backendUrl = "http://localhost:7000";

function ManageRemoveEditBooks() {
  const {
    accounts,
    books,
    deleteBook,
    updateBook,
    toggleBookLost,
    currentAccount,
    removeBookFromAllFavorites,
  } = useAccounts();
  const [searchBook, setSearchBook] = useState("");
  const [alertModal, setAlertModal] = useState({ message: "", icon: "" });
  const [confirmModal, setConfirmModal] = useState({
    message: "",
    icon: "",
    onConfirm: null,
  });
  const [searchBy, setSearchBy] = useState("title");
  const [editBook, setEditBook] = useState(null); // Book being edited
  const [displayCount, setDisplayCount] = useState(8);
  const [formData, setFormData] = useState({
    title: "",
    author_name: "",
    first_publish_year: "",
    book_cover: "",
    description: "",
    category: "",
    rating: "",
    totalQuantity: 0,
    availableQuantity: 0,
    added_at: "",
    isLost: "",
  });

  function getBorrowRequestUsers(accounts, book) {
    return accounts.filter((acc) =>
      (acc.borrow || []).some((b) => b.id === book.id),
    );
  }

  function getCurrentBorrower(accounts, book) {
    return accounts.find((acc) => {
      const allBooks = [...(acc.borrowed || []), ...(acc.lost || [])];
      return allBooks.some((b) => b.id === book.id);
    });
  }

  // function getCurrentBorrower(accounts, book) {
  //   return accounts.find((acc) =>
  //     ((acc.borrowed && acc.lost) || []).some((b) => b.id === book.id)
  //   );
  // }

  function BorrowRequestAlert({ book, users }) {
    return (
      <div className="space-y-4 text-sm text-gray-800">
        <p className="font-medium">
          This book ({book.title}) is currently in student(s) borrow request.
          Review and decline the request before deleting.
        </p>
        <p className="font-semibold text-gray-900">
          User(s) who requested to borrow this book:
        </p>
        <div
          className={`grid ${
            users.length === 1 ? "grid-cols-1" : "sm:grid-cols-1 lg:grid-cols-2"
          }   gap-3 text-xs`}
        >
          {users.map((user, key) => (
            <div
              key={key}
              className="rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm"
            >
              <p>
                <span className="text-gray-700 font-semibold">Fullname: </span>
                {user.fullname}
              </p>
              <p>
                <span className="text-gray-700 font-semibold">USN: </span>
                {user.studentNumber}
              </p>
              {user.year ? (
                <p className="italic text-gray-600">
                  {user.year === "Shs" ? "Senior Highschool" : "College"}
                </p>
              ) : (
                <p className="italic text-gray-600">{user.role}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function BorrowedBookAlert({ book, user }) {
    return (
      <div className="space-y-4 text-sm text-gray-800">
        <p className="font-medium">
          This book ({book.title}) is currently borrowed by {user.firstname}.
          Please wait for its return before deleting.
        </p>
        <div className="space-y-2 text-xs">
          <h1 className="font-semibold">USER DETAILS</h1>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm">
            <p>
              <span className="text-gray-700 font-semibold">Fullname: </span>
              {user.firstname} {user.lastname}
            </p>
            <p>
              <span className="text-gray-700 font-semibold">USN: </span>
              {user.studentNumber}
            </p>
            <p className="italic text-gray-600">
              {user.year === "Shs" ? "Senior Highschool" : "College"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Handle delete
  const handleDelete = async (book) => {
    // Current user logic

    const isBorrowedByCurrentUser = (currentAccount?.borrowed || []).some(
      (b) => b.id === book.id,
    );
    const isRequestedByCurrentUser = (currentAccount?.borrow || []).some(
      (b) => b.id === book.id,
    );

    if (isBorrowedByCurrentUser) {
      setAlertModal({
        message: (
          <p>
            You currently have this book (<strong>{book.title}</strong>)
            borrowed. You cannot delete it until it's returned.
          </p>
        ),
        icon: "info",
      });
      return;
    }

    if (isRequestedByCurrentUser) {
      setAlertModal({
        message: (
          <p>
            You have a pending borrow request for <strong>{book.title}</strong>.
            Please cancel the request before deleting this book.
          </p>
        ),
        icon: "info",
      });
      return;
    }

    // Users logic
    const usersWhoBorrowed = getCurrentBorrower(accounts, book);
    const usersWithBorrowRequest = getBorrowRequestUsers(accounts, book);

    if (usersWhoBorrowed) {
      setAlertModal({
        message: <BorrowedBookAlert book={book} user={usersWhoBorrowed} />,
        icon: "info",
      });

      return;
    } else if (usersWithBorrowRequest.length > 0) {
      setAlertModal({
        message: (
          <BorrowRequestAlert book={book} users={usersWithBorrowRequest} />
        ),
        icon: "info",
      });

      return;
    }

    setConfirmModal({
      message: (
        <p>
          Are you sure you want to delete <strong>{book.title}</strong>?
        </p>
      ),
      icon: "question",
      onConfirm: async () => {
        await removeBookFromAllFavorites(book.id); // remove from favorites
        deleteBook(book.id); // delete the book itself
      },
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
      totalQuantity: book.totalQuantity ?? 0,
      availableQuantity: book.availableQuantity ?? 0,
      added_at: book.added_at,
      isLost: book.isLost,
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
  // const handleSave = async (id) => {
  //   const totalQty = Number(formData.totalQuantity);

  //   const updatedBook = {
  //     id: String(id),
  //     key: String(id),
  //     title: formData.title,
  //     author_name: formData.author_name
  //       .split(",")
  //       .map((a) => a.trim())
  //       .filter(Boolean),
  //     first_publish_year: Number(formData.first_publish_year),
  //     book_cover: formData.book_cover,
  //     description: formData.description,
  //     category: formData.category
  //       .split(",")
  //       .map((c) => c.trim())
  //       .filter(Boolean),
  //     rating: Number(formData.rating),
  //     totalQuantity: Number(totalQty),
  //     availableQuantity: totalQty,
  //     added_at: formData.added_at,
  //     isLost: Boolean(formData.isLost),
  //   };

  //   try {
  //     await fetch(`${backendUrl}/books/${id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updatedBook),
  //     });

  //     updateBook(updatedBook); // <-- tell context to update
  //     setEditBook(null); // close edit mode
  //     setSearchBook("");
  //     setSearchBy("title");
  //     setAlertModal({ message: "Book updated!", icon: "success" });
  //   } catch (error) {
  //     console.error("Error updating book:", error);
  //   }
  // };
  const handleSave = async (id) => {
    const totalQty = Number(formData.totalQuantity);

    // Find current book state from context
    const currentBook = books.find((b) => String(b.id) === String(id));
    if (!currentBook) return;

    // How many copies are currently borrowed
    const borrowedCount =
      currentBook.totalQuantity - currentBook.availableQuantity;

    // Recalculate availability
    let newAvailableQuantity = totalQty - borrowedCount;

    // Clamp (cannot go below 0)
    if (newAvailableQuantity < 0) {
      newAvailableQuantity = 0;
    }

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

      // ✅ FIXED INVENTORY LOGIC
      totalQuantity: totalQty,
      availableQuantity: newAvailableQuantity,

      added_at: formData.added_at,
      isLost: Boolean(formData.isLost),
    };

    try {
      await fetch(`${backendUrl}/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });

      updateBook(updatedBook);
      setEditBook(null);
      setSearchBook("");
      setSearchBy("title");
      setAlertModal({ message: "Book updated!", icon: "success" });
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleReportLost = async (book) => {
    setConfirmModal({
      message: `${
        !book.isLost
          ? `Book ${book.title} has been marked as unavailable.`
          : `Book ${book.title} is now AVAILABLE!`
      }`,
      icon: "success",
      onConfirm: () => toggleBookLost(book),
    });
  };

  const filteredBooks = books.filter((book) => {
    const title = book.title?.toLowerCase() || "";
    const isbn = book.id;
    const author = Array.isArray(book.author_name)
      ? book.author_name.join(", ").toLowerCase()
      : (book.author_name || "").toLowerCase();
    const year = String(book.first_publish_year || "").toLowerCase();

    return searchBy === "title"
      ? title.includes(searchBook.toLowerCase())
      : searchBy === "isbn"
        ? isbn.includes(Number(searchBook))
        : searchBy === "author"
          ? author.includes(searchBook.toLowerCase())
          : year.includes(searchBook.toLowerCase());
  });

  const resetAlertModal = () => setAlertModal({ message: "", icon: "" });
  const resetConfirmModal = () =>
    setConfirmModal({ message: "", icon: "", onConfirm: null });

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
            resetConfirmModal();
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
            <option value="isbn">ISBN</option>
          </select>
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredBooks.slice(0, displayCount).map((book) => (
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
                      placeholder="Title"
                    />
                    <BookInput
                      type="text"
                      name="author_name"
                      value={formData.author_name}
                      onChange={handleChange}
                      placeholder="Author(s), comma-separated"
                    />
                    <BookInput
                      type="number"
                      name="totalQuantity"
                      value={formData.totalQuantity}
                      onChange={handleChange}
                      placeholder="Total Quantity"
                    />
                    <BookInput
                      type="number"
                      name="first_publish_year"
                      value={formData.first_publish_year}
                      onChange={handleChange}
                      placeholder="Year"
                    />
                    <BookInput
                      type="file"
                      label="Book Cover"
                      name="book_cover"
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
                    <BookInput
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
                      placeholder="Category, comma-separated"
                    />
                    <BookInput
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      placeholder="Rating"
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
                      <div className="mt-2 flex flex-col items-center">
                        <p className="text-gray-500">
                          Total copies: {book.totalQuantity}
                        </p>
                        <p className="text-gray-500">
                          Available copies: {book.availableQuantity}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <Button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 col-span-1"
                        onClick={() => handleEditClick(book)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 col-span-1"
                        onClick={() => handleDelete(book)}
                      >
                        Delete
                      </Button>
                      <Button
                        className={`${
                          !book.isLost
                            ? "bg-amber-600 hover:bg-amber-700"
                            : "bg-green-500 hover:bg-green-600"
                        } text-white px-3 py-1 rounded col-span-2`}
                        onClick={() => handleReportLost(book)}
                      >
                        {!book.isLost
                          ? "MARK AS UNAVAILABLE"
                          : "MARK AS AVAILABLE"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {displayCount < books.length && (
            <div className="m-auto">
              <Button
                buttonStyleType="btn1"
                padding="padding1"
                hover="hover1"
                onClick={() => setDisplayCount((prev) => prev + 8)}
              >
                See more
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-5 items-center my-10">
          <p className="text-gray-500/50 text-lg italic">No books found.</p>
          <img className="w-20" src={noResultsIcon} alt="icon-no-found" />
        </div>
      )}
    </div>
  );
}

function BookInput({ type = "text", name, value, onChange, placeholder }) {
  return (
    <>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border p-1 rounded"
        />
      ) : (
        <input
          type={type}
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
