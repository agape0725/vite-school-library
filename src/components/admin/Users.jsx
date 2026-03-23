import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import arrowUp from "../../assets/icons/arrow-up.png";
import arrowDown from "../../assets/icons/arrow-down.png";
import Books from "./Books";

function Users({ label, users, action }) {
  const [showButton, setShowButton] = useState(null);
  const [open, setOpen] = useState(false); // toggle entire section

  function handleShowButton(id) {
    setShowButton((prev) => (prev === id ? null : id));
  }

  return (
    <>
      {users?.length > 0 && (
        <div className="rounded-2xl p-2">
          {/* Click label to expand/collapse */}
          <div
            className="flex items-center gap-2 mb-4 cursor-pointer select-none group"
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="flex items-center">
              <h2 className="text-sm font-semibold text-gray-800 mr-1 group-hover:text-gray-900 transition-colors">
                {label}
              </h2>
              <span className="text-xs font-medium text-gray-500">
                ({users?.length})
              </span>
            </div>
            <img
              className="w-3 opacity-80 group-hover:opacity-100 transition-opacity"
              src={open ? arrowUp : arrowDown}
              alt="icon-arrow"
            />
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                key="student-list"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
                className="flex flex-col gap-4"
              >
                {users.map((user) => (
                  <User
                    key={user.id}
                    user={user}
                    isActive={showButton === user.studentNumber}
                    onShowBorrow={handleShowButton}
                    action={action}
                  />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

function User({ user, isActive, onShowBorrow, action }) {
  return (
    <>
      <li
        className={`rounded-xl p-4 transition-all duration-300 cursor-pointer border shadow-sm hover:shadow-md ${
          isActive
            ? "bg-gradient-to-r from-orange-50 via-white to-orange-50 border-orange-400 shadow-lg"
            : "bg-white border-gray-200 hover:border-orange-300"
        }`}
        onClick={() => onShowBorrow(user.studentNumber)}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between items-center text-xs">
          <div className="flex flex-col items-center md:items-start">
            <p>
              <span className="font-semibold text-gray-800">Full name:</span>{" "}
              <span className="text-gray-700">
                {user.firstname} {user.lastname}
              </span>
            </p>
            <p>
              <span className="font-semibold text-gray-800">USN:</span>{" "}
              <span className="text-gray-700">{user.studentNumber}</span>
            </p>
          </div>

          <p className="font-medium text-gray-700">
            <span className="font-semibold text-gray-800">Quantity:</span>{" "}
            {action === "borrowing"
              ? user.borrow.length
              : action === "borrowed"
              ? user.borrowed.length
              : action === "overdue"
              ? user.overdue.length
              : action === "lost"
              ? user.lost.length
              : user.returning.length}
          </p>
        </div>
      </li>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-4 md:pl-6 mt-3"
          >
            <Books
              books={
                action === "borrowing"
                  ? user.borrow
                  : action === "borrowed"
                  ? user.borrowed
                  : action === "overdue"
                  ? user.overdue
                  : action === "lost"
                  ? user.lost
                  : user.returning
              }
              studentId={user.id}
              action={action}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Users;
