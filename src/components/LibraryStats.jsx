import { useAccounts } from "../contexts/AccountsContext";
import userIcon from "../assets/icons/user-2.png";
import bookIcon from "../assets/icons/stack-book-4.png";
import librarianIcon from "../assets/icons/librarian-2.png";
import { useState } from "react";

function Stats() {
  const { accounts, books } = useAccounts();

  const studentsCount = accounts?.filter(
    (acc) => acc.role === "Student"
  ).length;

  const adminCount = accounts?.filter((acc) => acc.role === "Admin").length;
  const bookCount = books.length;

  return (
    <div
      className={`mx-4 md:mx-10 py-5 grid grid-cols-1 sm:grid-cols-2 ${
        studentsCount > 0 ? "lg:grid-cols-3" : "lg:grid-cols-2"
      } gap-5`}
    >
      {studentsCount > 0 && (
        <Box quantity={studentsCount} label="Students" icon={userIcon}>
          Total students registered in the library
        </Box>
      )}
      <Box quantity={adminCount} label="Librarian" icon={librarianIcon}>
        Active librarians managing the library
      </Box>
      <Box quantity={bookCount} label="Books" icon={bookIcon}>
        Number of books available to borrow
      </Box>
    </div>
  );
}

function Box({ quantity, label, icon, children }) {
  const [onHover, setOnHover] = useState(false);

  return (
    <div
      className="p-5 bg-gradient-to-r from-yellow-400/30 via-yellow-300/30 to-yellow-100/20 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow relative overflow-hidden"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <div
        className={`absolute left-0 -bottom-10 w-32 h-48 bg-no-repeat bg-cover opacity-30 md:opacity-20 transform transition-transform duration-300`}
        style={{
          backgroundImage: `url(${icon})`,
          filter: `invert(74%) sepia(6%) saturate(523%) hue-rotate(114deg) brightness(92%) contrast(87%)`,
          transform: `scaleX(-1) ${onHover ? "scale(1.2)" : "scale(1)"}`,
        }}
      />

      <div className="flex flex-col items-center gap-1 font-poppins">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-600">
          {quantity}
        </h1>
        <p className="text-sm sm:text-base font-semibold text-yellow-800">
          {label}
        </p>
      </div>
      {children && <p className="mt-2 text-xs text-yellow-500">{children}</p>}
    </div>
  );
}

export default Stats;
