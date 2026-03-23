import { useState } from "react";
import { useAccounts } from "../../contexts/AccountsContext";
import Button from "../Button";
import closeIcon from "../../assets/icons/close.png";

export default function TransactionHistory() {
  const { history } = useAccounts();
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("usn");
  const [displayCount, setDisplayCount] = useState(15);

  const filteredHistory = history.filter((user) => {
    const q = query.toLowerCase();
    switch (searchBy) {
      case "usn":
        return user.studentId.includes(query);
      case "fullname":
        return user.fullname.toLowerCase().includes(q);
      case "year_role":
        return user.year?.toLowerCase().includes(q);
      case "book":
        return user.bookTitle.toLowerCase().includes(q);
      case "approved":
        return user.approvedBy.toLowerCase().includes(q);
      case "lent":
        return user.lentDate.toLowerCase().includes(q);
      case "returned":
        if (user.returnDate) {
          return user.returnDate.toLowerCase().includes(q);
        }
        return "not yet returned".includes(q);
      default:
        return false;
    }
  });

  function toISO(dateStr) {
    return new Date(dateStr.replace(" at ", " ")).toISOString();
  }

  return (
    <div className="p-4 space-y-5">
      <Search
        query={query}
        onQuery={setQuery}
        searchBy={searchBy}
        onSearchBy={setSearchBy}
      />

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <div className="min-w-full border border-gray-300 rounded-lg shadow-md">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-7 bg-gray-200 text-gray-800 font-semibold text-sm border-b border-gray-300">
            <div className="px-4 py-3 border-r border-b border-gray-300">
              Student Number
            </div>
            <div className="px-4 py-3 border-r border-b border-gray-300">
              Full Name
            </div>
            <div className="px-4 py-3 border-r border-b border-gray-300">
              Year / Role
            </div>
            <div className="px-4 py-3 border-r border-b border-gray-300">
              Borrowed Book
            </div>
            <div className="px-4 py-3 border-r border-b border-gray-300">
              Approved By
            </div>
            <div className="px-4 py-3 border-r border-b border-gray-300">
              Lent Date
            </div>
            <div className="px-4 py-3 border-b border-gray-300">
              Returned Date
            </div>
          </div>

          {/* Data Rows */}
          {[...filteredHistory]
            .sort(
              (a, b) =>
                new Date(toISO(b.lentDate)) - new Date(toISO(a.lentDate))
            )
            .slice(0, displayCount)
            .map((detail) => (
              <StudentHistory key={detail.id} detail={detail} />
            ))}
        </div>
        {filteredHistory.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No results found.
          </div>
        )}
        {displayCount < filteredHistory.length && (
          <div className="text-center my-4">
            <Button
              buttonStyleType="btn1"
              className="px-4 py-2"
              onClick={() => setDisplayCount(displayCount + 10)}
            >
              See More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function StudentHistory({ detail }) {
  return (
    <>
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-7 text-xs">
        <div className="px-4 py-2 border-r border-b border-gray-300">
          {detail.studentId}
        </div>
        <div className="px-4 py-2 border-r border-b border-gray-300">
          {detail.fullname}
        </div>
        <div className="px-4 py-2 border-r border-b border-gray-300">
          {detail.year}
        </div>
        <div className="px-4 py-2 border-r border-b border-gray-300">
          {detail.bookTitle}
        </div>
        <div className="px-4 py-2 border-r border-b border-gray-300">
          {detail.approvedBy}
        </div>
        <div className="px-4 py-2 border-r border-b border-gray-300">
          {detail.lentDate}
        </div>
        <div
          className={`px-4 py-2 border-b border-gray-300 ${
            !detail.returnDate && "text-red-500 font-medium"
          }`}
        >
          {!detail.returnDate ? "Not yet returned" : detail.returnDate}
        </div>
      </div>

      {/* Mobile Card */}
      <div className="md:hidden border-b border-gray-200 p-3 space-y-1 text-xs">
        <div>
          <span className="font-semibold text-gray-700">USN: </span>
          {detail.studentId}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Name: </span>
          {detail.fullname}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Year / Role: </span>
          {detail.year}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Book: </span>
          {detail.bookTitle}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Approved By: </span>
          {detail.approvedBy}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Lent: </span>
          {detail.lentDate}
        </div>
        <div className={!detail.returnDate ? "text-red-500 font-medium" : ""}>
          <span className="font-semibold text-gray-700">Returned: </span>
          {!detail.returnDate ? "Not yet returned" : detail.returnDate}
        </div>
      </div>
    </>
  );
}

function Search({ query, onQuery, searchBy, onSearchBy }) {
  const [showSearch, setShowSearch] = useState(false);

  function handleCloseQuery() {
    setShowSearch(false);
    onQuery("");
  }

  return showSearch ? (
    <div className="flex flex-col sm:flex-row gap-2 items-center">
      <input
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        className="flex-1 p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder={`Search by ${
          searchBy === "year_role" ? "year / role" : searchBy
        }`}
      />
      <div className="flex gap-2">
        <select
          className="p-2 rounded-lg text-sm bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400"
          value={searchBy}
          onChange={(e) => onSearchBy(e.target.value)}
        >
          <option value="usn">USN</option>
          <option value="fullname">Full name</option>
          <option value="year_role">Year / Role</option>
          <option value="book">Book</option>
          <option value="approved">Approved By</option>
          <option value="lent">Lent date</option>
          <option value="returned">Return date</option>
        </select>
        <img
          className="w-5 h-5 cursor-pointer"
          src={closeIcon}
          alt="icon-close"
          onClick={handleCloseQuery}
        />
      </div>
    </div>
  ) : (
    <Button
      buttonStyleType="btn1"
      padding="padding3"
      hover="hover1"
      onClick={() => setShowSearch(true)}
    >
      Search
    </Button>
  );
}
