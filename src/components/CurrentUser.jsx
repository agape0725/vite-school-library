import { Link } from "react-router-dom";
import { useAccounts } from "../contexts/AccountsContext";
import { useEffect, useState } from "react";

function CurrentUser({ handleClickNav, visibility, onHandleLogout, menuRef }) {
  const { currentAccount, accounts } = useAccounts();
  const [requestsCount, setRequestsCount] = useState(null);

  useEffect(() => {
    if (currentAccount.role === "Admin") {
      const borrowUserCount = accounts.reduce(
        (total, acc) => total + (acc.borrow.length > 0 || 0),
        0
      );
      const returnUserCount = accounts.reduce(
        (total, acc) => total + (acc.returning.length > 0 || 0),
        0
      );
      setRequestsCount(Number(borrowUserCount) + Number(returnUserCount));
    }
  }, [accounts, currentAccount]);

  return (
    <div
      ref={menuRef}
      className={`md:absolute ${visibility} md:flex-col md:gap-2 md:right-4 md:top-16 md:bg-white md:shadow-lg md:rounded-md md:w-52 z-50 p-2`}
    >
      <div className="hidden md:flex flex-col text-center">
        <span className="text-sm text-orange200 font-semibold">
          {currentAccount.firstname} {currentAccount.lastname}
        </span>
        {currentAccount.year && (
          <span className="text-xs font-light italic text-gray-500">
            {currentAccount.year === "Shs" ? "Senior High School" : "College"}
          </span>
        )}
      </div>
      <hr className="hidden md:block" />
      <ul className="md:text-gray-800 text-center md:text-left">
        <Link to="/account/dashboard" onClick={handleClickNav}>
          <Nav>Dashboard</Nav>
        </Link>
        <Link to="/account/borrow-history" onClick={handleClickNav}>
          <Nav>Your Borrow History</Nav>
        </Link>
        <Link to="/account/profile" onClick={handleClickNav}>
          <Nav>Profile</Nav>
        </Link>
        <Link to="/account/settings" onClick={handleClickNav}>
          <Nav>Settings</Nav>
        </Link>

        {currentAccount.role === "Admin" && (
          <Link to="/account/panel" onClick={handleClickNav}>
            <Nav>Admin Panel</Nav>
          </Link>
        )}
        {currentAccount.role === "Admin" && (
          <Link to="/account/admin-request" onClick={handleClickNav}>
            <Nav>Requesting for admin</Nav>
          </Link>
        )}
        {currentAccount.role === "Admin" && (
          <Link to="/account/manage" onClick={handleClickNav}>
            <Nav>Manage Books</Nav>
          </Link>
        )}
        {currentAccount.role === "Admin" && (
          <Link to="/account/request" onClick={handleClickNav}>
            <Nav>
              <div className="relative inline-flex items-center space-x-1">
                <span>User Request</span>

                {requestsCount > 0 && (
                  <div className="py-0.5 px-1.5 bg-orange200 rounded-full text-xs font-bold text-white">
                    {requestsCount}
                  </div>
                )}
              </div>
            </Nav>
          </Link>
        )}
        {currentAccount.role === "Admin" && (
          <Link to="/account/lent" onClick={handleClickNav}>
            <Nav>Borrowed Books</Nav>
          </Link>
        )}
        {currentAccount.role === "Admin" && (
          <Link to="/account/lost" onClick={handleClickNav}>
            <Nav>Lost Books</Nav>
          </Link>
        )}

        {currentAccount.role === "Admin" && (
          <Link to="/account/history" onClick={handleClickNav}>
            <Nav>Users Borrow History</Nav>
          </Link>
        )}
        <Nav onClick={onHandleLogout}>Logout</Nav>
      </ul>
    </div>
  );
}

function Nav({ onClick, children }) {
  return (
    <li
      className="relative text-sm md:px-4 py-2 md:hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </li>
  );
}

export default CurrentUser;
