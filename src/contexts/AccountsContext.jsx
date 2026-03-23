import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import generateTransactionId from "../utils/generateTransactionId";

const AccountContext = createContext();
const BASE_URL = "http://localhost:7000";

const initialState = {
  accounts: [],
  books: [],
  history: [],
  currentAccount: {},
  isAuthenticated: false,
  isLoading: false,
  error: "",
};

function isOverdue(lentDateStr) {
  const lentDate = new Date(lentDateStr);
  const now = new Date();

  const diffTime = now - lentDate; // difference in milliseconds
  const diffDays = diffTime / (1000 * 60 * 60 * 24); // convert to days

  return diffDays > 4;
}

function formattedDateTime(date) {
  if (!date)
    return <span className="italic text-red-500">not yet returned</span>;
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // 12-hour format with AM/PM
  });
}

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "account/loaded":
      return { ...state, isLoading: false, accounts: action.payload };

    // case "account/loaded":
    //   return {
    //     ...state,
    //     isLoading: false,
    //     accounts: Array.isArray(action.payload) ? action.payload : [],
    //   };

    case "account/created":
      return {
        ...state,
        isLoading: false,
        accounts: [...state.accounts, action.payload],
      };

    case "account/logged-in":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        currentAccount: action.payload,
        role: action.payload.role,
      };

    case "account/logged-out":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        currentAccount: {},
      };

    case "book/loaded":
      return { ...state, isLoading: false, books: action.payload };

    case "book/created":
      return {
        ...state,
        isLoading: false,
        books: [...state.books, action.payload],
      };

    case "book/deleted":
      return {
        ...state,
        isLoading: false,
        books: state.books.filter((book) => book.id !== action.payload),
      };

    case "book/updated":
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book,
        ),
      };

    case "history/loaded":
      return { ...state, isLoading: false, history: action.payload };

    case "history/added":
      return {
        ...state,
        isLoading: false,
        history: [...state.history, action.payload],
      };

    case "history/updated":
      return {
        ...state,
        isLoading: false,
        history: state.history.map((h) =>
          h.id === action.payload.id ? action.payload : h,
        ),
      };

    case "rejected":
      return { ...state, error: action.payload };

    case "clear/rejected":
      return { ...state, error: "" };

    default:
      throw new Error("Error unknown type");
  }
};

function AccountProvider({ children }) {
  const [
    {
      accounts,
      books,
      history,
      currentAccount,
      isAuthenticated,
      isLoading,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [submitSuccessful, setSubmitSuccessful] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    birthDate: "",
    phoneNumber: "",
    address: "",
    emailAddress: "",
    gender: "",
    year: "",
  });

  async function fetchAccounts() {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/accounts`);
      const data = await res.json();
      dispatch({ type: "account/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        error: "There was a problem fetching student data.",
      });
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchBooks() {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/books`);
      const data = await res.json();
      dispatch({ type: "book/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was a problem fetching books.",
      });
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchHistory() {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/borrow_history`);
      const data = await res.json();
      dispatch({ type: "history/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was a problem fetching borrow history.",
      });
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  async function refreshCurrentAccount() {
    if (!currentAccount?.id) return;
    try {
      const res = await fetch(`${BASE_URL}/accounts/${currentAccount.id}`);
      const data = await res.json();
      dispatch({ type: "account/logged-in", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Could not refresh current account",
      });
    }
  }

  async function createBook(newBook) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });
      const data = await res.json();
      dispatch({ type: "book/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was a problem adding the new book.",
      });
    }
  }

  async function deleteBook(bookId) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/books/${bookId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete book");

      dispatch({ type: "book/deleted", payload: bookId });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was a problem deleting the book.",
      });
    }
  }

  function updateBook(updatedBook) {
    dispatch({ type: "book/updated", payload: updatedBook });
  }

  async function createAccount(newAccount) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/accounts`, {
        method: "POST",
        body: JSON.stringify(newAccount),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "account/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        error: "There was a problem fetching student data.",
      });
    }
  }

  async function deleteAccount(id) {
    dispatch({ type: "loading" });

    try {
      // Delete from backend
      const res = await fetch(`${BASE_URL}/accounts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete account");

      // Update local state
      dispatch({
        type: "account/loaded",
        payload: accounts.filter((acc) => acc.id !== id),
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.message || "Could not delete account",
      });
    }
  }

  async function borrowBook(book) {
    if (!currentAccount) return;

    // create updated borrow array
    const updatedBorrow = [...(currentAccount.borrow || []), book];

    try {
      const res = await fetch(`${BASE_URL}/accounts/${currentAccount.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ borrow: updatedBorrow }),
      });

      if (!res.ok) throw new Error("Failed to borrow book");

      const updatedAccount = { ...currentAccount, borrow: updatedBorrow };

      // update context
      dispatch({ type: "account/logged-in", payload: updatedAccount });
      await fetchAccounts();
    } catch (err) {
      console.error("Could not update borrow list", err);
      dispatch({ type: "rejected", payload: "Could not update borrow list" });
    }
  }

  async function favoriteBook(book) {
    dispatch({ type: "loading" });

    // Add book to currentAccount's borrow array
    const updatedAccount = {
      ...currentAccount,
      favorite: [...currentAccount.favorite, book],
    };

    try {
      const res = await fetch(`${BASE_URL}/accounts/${currentAccount.id}`, {
        method: "PATCH",
        body: JSON.stringify({ favorite: updatedAccount.favorite }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to mark as favorite this book");

      dispatch({ type: "account/logged-in", payload: updatedAccount });
      await refreshCurrentAccount();
      await fetchAccounts();
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Could not update favorite list",
      });
    }
  }

  async function removeFavoriteBook(id) {
    dispatch({ type: "loading" });

    // Filter out the specific book to remove
    const updatedFavorite = currentAccount.favorite.filter(
      (book) => book.id !== id,
    );

    const updatedAccount = {
      ...currentAccount,
      favorite: updatedFavorite,
    };

    try {
      const res = await fetch(`${BASE_URL}/accounts/${currentAccount.id}`, {
        method: "PATCH",
        body: JSON.stringify({ favorite: updatedFavorite }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to remove favorite book");
      dispatch({ type: "account/logged-in", payload: updatedAccount });
      await fetchAccounts();
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Could not update favorite list",
      });
    }
  }

  async function removeBorrowedBook(id) {
    dispatch({ type: "loading" });

    // Filter out the specific book to remove
    const updatedBorrowed = currentAccount.borrow.filter(
      (book) => book.id !== id,
    );

    const updatedAccount = {
      ...currentAccount,
      borrow: updatedBorrowed,
    };

    try {
      const res = await fetch(`${BASE_URL}/accounts/${currentAccount.id}`, {
        method: "PATCH",
        body: JSON.stringify({ borrow: updatedBorrowed }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to remove borrowed book");

      dispatch({ type: "account/logged-in", payload: updatedAccount });
      await fetchAccounts();
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Could not update borrow list",
      });
    }
  }

  async function removeBookFromAllFavorites(bookId) {
    if (!Array.isArray(accounts)) return;

    // Find accounts that have this book in favorites
    const accountsWithBookInFavorite = accounts.filter(
      (acc) =>
        Array.isArray(acc.favorite) &&
        acc.favorite.some((b) => b.id === bookId),
    );

    const updatedAccounts = [...accounts]; // clone for updating local state

    // Loop through and PATCH each account
    for (const acc of accountsWithBookInFavorite) {
      const updatedFavorite = acc.favorite.filter((b) => b.id !== bookId);

      // PATCH to backend
      try {
        const res = await fetch(`${BASE_URL}/accounts/${acc.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ favorite: updatedFavorite }),
        });

        if (!res.ok) throw new Error("Failed to update favorites");

        // Update local clone
        const updatedAcc = { ...acc, favorite: updatedFavorite };
        const index = updatedAccounts.findIndex((a) => a.id === acc.id);
        updatedAccounts[index] = updatedAcc;

        // Also update currentAccount if it matches
        if (currentAccount?.id === acc.id) {
          dispatch({ type: "account/logged-in", payload: updatedAcc });
        }
      } catch (err) {
        console.error("Failed to update favorites for account", acc.id, err);
      }
    }

    // Update the accounts array in context
    dispatch({ type: "account/loaded", payload: updatedAccounts });
  }

  async function returnBook(book) {
    dispatch({ type: "loading" });

    try {
      // Keep borrowed and overdue as is
      const updatedBorrowed = currentAccount.borrowed;
      const updatedOverdue = currentAccount.overdue;

      // Add book to returning array (create if not exists)
      const updatedReturning = [
        ...(currentAccount.returning || []),
        {
          ...book,
          returningDate: new Date().toISOString(),
        },
      ];

      // PATCH update to server
      const res = await fetch(`${BASE_URL}/accounts/${currentAccount.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          borrowed: updatedBorrowed,
          overdue: updatedOverdue,
          returning: updatedReturning,
        }),
      });

      if (!res.ok) throw new Error("Failed to return book");

      const updatedAccount = {
        ...currentAccount,
        borrowed: updatedBorrowed,
        overdue: updatedOverdue,
        returning: updatedReturning,
      };

      dispatch({ type: "account/logged-in", payload: updatedAccount });
      await fetchAccounts();
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.message || "Could not return book",
      });
    }
  }

  async function toggleBookLost(book) {
    dispatch({ type: "loading" });

    const updatedBook = {
      ...book,
      isLost: !book.isLost,
    };

    try {
      const res = await fetch(`${BASE_URL}/books/${book.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });

      if (!res.ok) throw new Error("Failed to update book");

      dispatch({ type: "book/updated", payload: updatedBook });
      // await fetchAccounts();
      // await refreshCurrentAccount();
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.message || "Could not update book status",
      });
      return {
        success: false,
        message: "Failed to report the book as lost.",
      };
    }
  }

  async function reportLostBook(book) {
    dispatch({ type: "loading" });

    try {
      // Remove book from borrowed/overdue/returning if it exists there
      const updatedBorrowed = currentAccount.borrowed.filter(
        (b) => b.id !== book.id,
      );
      const updatedOverdue = currentAccount.overdue.filter(
        (b) => b.id !== book.id,
      );
      const updatedReturning = currentAccount.returning.filter(
        (b) => b.id !== book.id,
      );

      // Add book to lost array
      const updatedLost = [
        ...(currentAccount.lost || []),
        {
          ...book,
          // lostDate: new Date().toISOString(),
        },
      ];

      // PATCH update to server
      const res = await fetch(`${BASE_URL}/accounts/${currentAccount.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          borrowed: updatedBorrowed,
          overdue: updatedOverdue,
          returning: updatedReturning,
          lost: updatedLost,
        }),
      });

      if (!res.ok) throw new Error("Failed to report lost book");

      const updatedAccount = {
        ...currentAccount,
        borrowed: updatedBorrowed,
        overdue: updatedOverdue,
        returning: updatedReturning,
        lost: updatedLost,
      };

      dispatch({ type: "account/logged-in", payload: updatedAccount });
      await fetchAccounts();
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.message || "Could not report a lost book",
      });
    }
  }

  // old
  // async function lendBookToStudent(id, book) {
  //   dispatch({ type: "loading" });

  //   try {
  //     // Find the student by studentNumber
  //     const student = accounts.find((acc) => acc.id === id);
  //     if (!student) throw new Error("Student not found");

  //     const today = new Date().toISOString(); // current date as ISO string

  //     // Remove the book from the borrow array
  //     const updatedBorrow = student.borrow.filter((b) => b.id !== book.id);

  //     // Add the book to borrowed array with lentDate property
  //     const historyEntry = {
  //       id: generateTransactionId(),
  //       studentId: student.studentNumber,
  //       bookId: book.id,
  //       fullname: student.fullname,
  //       year: !student.year
  //         ? student.role
  //         : student.year === "Shs"
  //         ? "Senior High School"
  //         : student.year,
  //       bookTitle: book.title,
  //       lentDate: formattedDateTime(today),
  //       returnDate: null,
  //       approvedBy: currentAccount?.role === "Admin" && currentAccount.fullname,
  //     };

  //     const updatedBorrowed = [
  //       ...student.borrowed,
  //       {
  //         ...book,
  //         lentDate: today,
  //         transactionId: historyEntry.id,
  //       },
  //     ];

  //     const updatedHistory = [
  //       ...student.history,
  //       {
  //         ...book,
  //       },
  //     ];

  //     await fetch(`${BASE_URL}/borrow_history`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(historyEntry),
  //     }).then(async (res) => {
  //       const newHistory = await res.json();
  //       dispatch({ type: "history/added", payload: newHistory });
  //     });

  //     // PATCH updated borrow and borrowed arrays to server
  //     const res = await fetch(`${BASE_URL}/accounts/${student.id}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         borrow: updatedBorrow,
  //         borrowed: updatedBorrowed,
  //         history: updatedHistory,
  //       }),
  //     });

  //     if (!res.ok) throw new Error("Failed to update student data");

  //     const updatedStudent = await res.json();

  //     // Update accounts state locally
  //     dispatch({
  //       type: "account/loaded",
  //       payload: accounts.map((acc) => (acc.id === id ? updatedStudent : acc)),
  //     });
  //     await refreshCurrentAccount();
  //   } catch (err) {
  //     dispatch({
  //       type: "rejected",
  //       payload: err.message || "Failed to lend book",
  //     });
  //   }
  // }

  // new
  async function lendBookToStudent(id, book) {
    dispatch({ type: "loading" });

    try {
      const student = accounts.find((acc) => acc.id === id);
      if (!student) throw new Error("Student not found");

      const bookRes = await fetch(`${BASE_URL}/books/${book.id}`);
      if (!bookRes.ok) throw new Error("Failed to fetch book");

      const liveBook = await bookRes.json();

      if (liveBook.availableQuantity <= 0) {
        throw new Error("No available copies left");
      }

      const today = new Date().toISOString();

      const updatedBook = {
        availableQuantity: liveBook.availableQuantity - 1,
      };

      const updatedBookRes = await fetch(`${BASE_URL}/books/${book.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });

      if (!updatedBookRes.ok) {
        throw new Error("Failed to update book quantity");
      }

      const updatedBookData = await updatedBookRes.json();

      dispatch({
        type: "book/updated",
        payload: {
          ...liveBook,
          availableQuantity: updatedBookData.availableQuantity,
        },
      });

      const updatedBorrow = student.borrow.filter((b) => b.id !== book.id);

      const transactionId = generateTransactionId();

      const updatedBorrowed = [
        ...student.borrowed,
        {
          ...book,
          lentDate: today,
          transactionId,
        },
      ];

      const historyEntry = {
        id: transactionId,
        studentId: student.studentNumber,
        bookId: book.id,
        fullname: student.fullname,
        year: !student.year
          ? student.role
          : student.year === "Shs"
            ? "Senior High School"
            : student.year,
        bookTitle: book.title,
        lentDate: formattedDateTime(today),
        returnDate: null,
        approvedBy:
          currentAccount?.role === "Admin" ? currentAccount.fullname : null,
      };

      const historyRes = await fetch(`${BASE_URL}/borrow_history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historyEntry),
      });

      const newHistory = await historyRes.json();
      dispatch({ type: "history/added", payload: newHistory });

      const accountRes = await fetch(`${BASE_URL}/accounts/${student.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          borrow: updatedBorrow,
          borrowed: updatedBorrowed,
          history: [...student.history, book],
        }),
      });

      if (!accountRes.ok) throw new Error("Failed to update student");

      const updatedStudent = await accountRes.json();

      dispatch({
        type: "account/loaded",
        payload: accounts.map((acc) => (acc.id === id ? updatedStudent : acc)),
      });

      await refreshCurrentAccount();
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.message || "Failed to lend book",
      });
    }
  }

  // async function removeBookFromLists(studentId, book) {
  //   const account = accounts.find((acc) => acc.id === studentId);
  //   if (!account) return;

  //   const bookId = String(book.id);
  //   const today = new Date().toISOString(); // current date as ISO string

  //   const updatedAccount = {
  //     ...account,
  //     borrowed: account.borrowed?.filter((b) => String(b.id) !== bookId) || [],
  //     overdue: account.overdue?.filter((b) => String(b.id) !== bookId) || [],
  //     returning:
  //       account.returning?.filter((b) => String(b.id) !== bookId) || [],
  //     borrow: account.borrow?.filter((b) => String(b.id) !== bookId) || [],
  //     lost: account.lost?.filter((b) => String(b.id) !== bookId) || [],
  //   };

  //   const res = await fetch(
  //     `${BASE_URL}/borrow_history/${book.transactionId}`,
  //     {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ returnDate: formattedDateTime(today) }),
  //     }
  //   );

  //   if (res.ok) {
  //     const updatedHistory = await res.json();
  //     dispatch({ type: "history/updated", payload: updatedHistory });
  //   }

  //   // Update accounts list
  //   dispatch({
  //     type: "account/loaded",
  //     payload: accounts.map((acc) =>
  //       acc.id === studentId ? updatedAccount : acc
  //     ),
  //   });

  //   // Update current account separately
  //   if (currentAccount?.id === studentId) {
  //     dispatch({
  //       type: "account/logged-in",
  //       payload: updatedAccount,
  //     });
  //   }

  //   // Persist changes
  //   try {
  //     await fetch(`${BASE_URL}/accounts/${studentId}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updatedAccount),
  //     });
  //   } catch (err) {
  //     console.error("Failed to update account:", err);
  //   }
  // }

  async function removeBookFromLists(studentId, book) {
    const account = accounts.find((acc) => acc.id === studentId);
    if (!account) return;

    const bookId = String(book.id);
    const today = new Date().toISOString();

    const updatedAccount = {
      ...account,
      borrowed: account.borrowed?.filter((b) => String(b.id) !== bookId) || [],
      overdue: account.overdue?.filter((b) => String(b.id) !== bookId) || [],
      returning:
        account.returning?.filter((b) => String(b.id) !== bookId) || [],
      borrow: account.borrow?.filter((b) => String(b.id) !== bookId) || [],
      lost: account.lost?.filter((b) => String(b.id) !== bookId) || [],
    };

    const historyRes = await fetch(
      `${BASE_URL}/borrow_history/${book.transactionId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          returnDate: formattedDateTime(today),
        }),
      },
    );

    if (historyRes.ok) {
      const updatedHistory = await historyRes.json();
      dispatch({ type: "history/updated", payload: updatedHistory });
    }

    const bookRes = await fetch(`${BASE_URL}/books/${bookId}`);
    if (!bookRes.ok) return;

    const liveBook = await bookRes.json();

    const updatedBookRes = await fetch(`${BASE_URL}/books/${bookId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        availableQuantity: liveBook.availableQuantity + 1,
      }),
    });

    if (!updatedBookRes.ok) {
      throw new Error("Failed to update book quantity");
    }

    const updatedBookData = await updatedBookRes.json();

    dispatch({
      type: "book/updated",
      payload: {
        ...liveBook,
        availableQuantity: updatedBookData.availableQuantity,
      },
    });

    // await fetch(`${BASE_URL}/books/${bookId}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     availableQuantity: liveBook.availableQuantity + 1,
    //   }),
    // });

    dispatch({
      type: "account/loaded",
      payload: accounts.map((acc) =>
        acc.id === studentId ? updatedAccount : acc,
      ),
    });

    if (currentAccount?.id === studentId) {
      dispatch({
        type: "account/logged-in",
        payload: updatedAccount,
      });
    }

    try {
      await fetch(`${BASE_URL}/accounts/${studentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAccount),
      });
    } catch (err) {
      console.error("Failed to update account:", err);
    }
  }

  async function removeBookFromReturning(studentId, book) {
    const account = accounts.find((acc) => acc.id === studentId);
    if (!account) return;

    const bookId = String(book.id);

    const updatedAccount = {
      ...account,
      returning:
        account.returning?.filter((b) => String(b.id) !== bookId) || [],
    };

    // Update accounts list
    dispatch({
      type: "account/loaded",
      payload: accounts.map((acc) =>
        acc.id === studentId ? updatedAccount : acc,
      ),
    });

    // Update current account separately
    if (currentAccount?.id === studentId) {
      dispatch({
        type: "account/logged-in",
        payload: updatedAccount,
      });
    }

    // Persist changes
    try {
      await fetch(`${BASE_URL}/accounts/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAccount),
      });
    } catch (err) {
      console.error("Failed to update account:", err);
    }
  }

  async function checkAndUpdateOverdueBooks() {
    dispatch({ type: "loading" });
    try {
      let updatedAccounts = [...accounts]; // clone current accounts

      // Loop over all accounts and process overdue books
      for (const student of accounts) {
        if (!Array.isArray(student.borrowed)) continue; // skip if no borrowed array

        // Separate borrowed books into still borrowed and overdue
        const stillBorrowed = student.borrowed.filter(
          (book) => !isOverdue(book.lentDate),
        );
        const overdueBooks = student.borrowed.filter((book) =>
          isOverdue(book.lentDate),
        );

        if (overdueBooks.length > 0) {
          // Safely append overdue books to student's existing overdue array or empty array
          const updatedOverdue = [...(student.overdue || []), ...overdueBooks];

          // PATCH the updated borrowed and overdue arrays
          const res = await fetch(`${BASE_URL}/accounts/${student.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              borrowed: stillBorrowed,
              overdue: updatedOverdue,
            }),
          });

          if (!res.ok) throw new Error("Failed to update overdue books");

          const updatedStudent = await res.json();

          // Update the local accounts array with the updated student info
          updatedAccounts = updatedAccounts.map((acc) =>
            acc.id === student.id ? updatedStudent : acc,
          );
        }
      }

      // Dispatch updated accounts after processing all students
      dispatch({ type: "account/loaded", payload: updatedAccounts });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.message || "Failed to update overdue books",
      });
    }
  }

  async function updateAccountDetails(updatedFields) {
    dispatch({ type: "loading" });

    const updatedAccount = {
      ...currentAccount,
      ...updatedFields,
    };

    try {
      const res = await fetch(`${BASE_URL}/accounts/${currentAccount.id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedFields),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to update account details");

      dispatch({ type: "account/logged-in", payload: updatedAccount });
      setSubmitSuccessful(true); // Optional: if you're showing success UI
      await fetchAccounts();
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Could not update account information",
      });
    }
  }

  async function approveAdminRequest(id) {
    dispatch({ type: "loading" });
    try {
      const account = accounts.find((acc) => acc.id === id);
      if (!account) throw new Error("Account not found");

      const updatedAccount = {
        ...account,
        role: "Admin",
        requestingForAdmin: false,
      };

      const res = await fetch(`${BASE_URL}/accounts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "Admin",
          requestingForAdmin: false,
        }),
      });

      if (!res.ok) throw new Error("Failed to approve admin request");

      dispatch({
        type: "account/loaded",
        payload: accounts.map((acc) => (acc.id === id ? updatedAccount : acc)),
      });

      await fetchAccounts();
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.message || "Could not approve admin request",
      });
    }
  }

  async function rejectAdminRequest(id) {
    dispatch({ type: "loading" });
    try {
      const account = accounts.find((acc) => acc.id === id);
      if (!account) throw new Error("Account not found");

      const updatedAccount = {
        ...account,
        role: "Student",
        requestingForAdmin: false, // just clear request
      };

      const res = await fetch(`${BASE_URL}/accounts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "Student",
          requestingForAdmin: false,
        }),
      });

      if (!res.ok) throw new Error("Failed to reject admin request");

      dispatch({
        type: "account/loaded",
        payload: accounts.map((acc) => (acc.id === id ? updatedAccount : acc)),
      });

      await fetchAccounts();
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.message || "Could not reject admin request",
      });
    }
  }

  // const login = async (studentNumber, password) => {
  //   dispatch({ type: "loading" });

  //   try {
  //     const res = await fetch(
  //       `${BASE_URL}/accounts?studentNumber=${studentNumber}&password=${password}`,
  //     );
  //     const data = await res.json();

  //     if (data.length > 0) {
  //       dispatch({ type: "account/logged-in", payload: data[0] });
  //     } else {
  //       dispatch({
  //         type: "rejected",
  //         payload: "Invalid student number or password",
  //       });
  //     }
  //   } catch (err) {
  //     dispatch({
  //       type: "rejected",
  //       payload: "Something went wrong while logging in",
  //     });
  //   }
  // };

  const login = async (studentNumber, password) => {
    dispatch({ type: "loading" });

    const dummyAccounts = [
      // 👨‍💼 Admin
      {
        id: "us3rdem0",
        studentNumber: "00000000000",
        firstname: "Admin",
        lastname: "Demo User",
        fullname: "Admin Demo User",
        image: "/assets/images/unknown.png",
        birthDate: "January 01, 2000",
        address: "lorem ipsum dolor",
        phoneNumber: "09998887741",
        emailAddress: "loremipsum@yahoo.com",
        password: "admin",
        gender: "Male",
        year: "",
        borrow: [],
        borrowed: [],
        overdue: [],
        favorite: [],
        returning: [],
        lost: [],
        history: [],
        role: "Admin",
        requestingForAdmin: true,
      },

      // Student 1
      {
        id: "std001",
        studentNumber: "10000000000",
        firstname: "Juan",
        lastname: "Dela Cruz",
        fullname: "Juan Dela Cruz",
        image: "/assets/images/unknown.png",
        birthDate: "March 15, 2004",
        address: "Makati City",
        phoneNumber: "09123456789",
        emailAddress: "juan@example.com",
        password: "123456",
        gender: "Male",
        year: "College",
        borrow: [],
        borrowed: [],
        overdue: [],
        favorite: [],
        returning: [],
        lost: [],
        history: [],
        role: "Student",
        requestingForAdmin: false,
      },

      // Student 2
      {
        id: "std002",
        studentNumber: "200000000000",
        firstname: "Maria",
        lastname: "Santos",
        fullname: "Maria Santos",
        image: "/assets/images/unknown.png",
        birthDate: "July 22, 2005",
        address: "Taguig City",
        phoneNumber: "09987654321",
        emailAddress: "maria@example.com",
        password: "123456",
        gender: "Female",
        year: "Shs",
        borrow: [],
        borrowed: [],
        overdue: [],
        favorite: [],
        returning: [],
        lost: [],
        history: [],
        role: "Student",
        requestingForAdmin: false,
      },
    ];

    const foundDummy = dummyAccounts.find(
      (acc) => acc.studentNumber === studentNumber && acc.password === password,
    );

    if (foundDummy) {
      dispatch({ type: "account/logged-in", payload: foundDummy });
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/accounts?studentNumber=${studentNumber}&password=${password}`,
      );
      const data = await res.json();

      if (data.length > 0) {
        dispatch({ type: "account/logged-in", payload: data[0] });
      } else {
        dispatch({
          type: "rejected",
          payload: "Invalid student number or password",
        });
      }
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Something went wrong while logging in",
      });
    }
  };

  const logout = () => {
    dispatch({ type: "account/logged-out" });
    window.location.reload();
  };

  const clearError = () => {
    dispatch({ type: "clear/rejected" });
  };

  return (
    <AccountContext.Provider
      value={{
        accounts,
        books,
        history,
        createBook,
        deleteBook,
        updateBook,
        currentAccount,
        isAuthenticated,
        isLoading,
        error,
        clearError,
        createAccount,
        deleteAccount,
        userDetails,
        setUserDetails,
        login,
        logout,
        submitSuccessful,
        setSubmitSuccessful,
        borrowBook,
        favoriteBook,
        updateAccountDetails,
        removeFavoriteBook,
        removeBorrowedBook,
        lendBookToStudent,
        removeBookFromLists,
        removeBookFromReturning,
        checkAndUpdateOverdueBooks,
        removeBookFromAllFavorites,
        returnBook,
        toggleBookLost,
        reportLostBook,
        approveAdminRequest,
        rejectAdminRequest,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

function useAccounts() {
  const context = useContext(AccountContext);
  if (context === undefined)
    throw new Error("AccountContext is used outside the AccountProvider");
  return context;
}

export { AccountProvider, useAccounts };
