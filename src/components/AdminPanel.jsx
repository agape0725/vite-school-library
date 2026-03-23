import { useState } from "react";
import { useAccounts } from "../contexts/AccountsContext";
import Button from "./Button";
import closeIcon from "../assets/icons/close.png";
import infoIcon from "../assets/icons/info.png";
import noResultsIcon from "../assets/icons/no-results.png";
import unknownImage from "../assets/images/unknown.png";
import { useNavigate } from "react-router-dom";
import AlertMessageModal from "./AlertMessageModal";
import ConfirmMessageModal from "./ConfirmMessageModal";
import OverlayModal from "./OverlayModal";

const backendUrl = "http://localhost:7000";

function AdminPanel() {
  return (
    <div className="bg-gradient-to-r from-blue100 to-blue200 rounded-xl">
      <div className="flex flex-col gap-5 p-5">
        <AccountsByRole role="Admin" />
        <AccountsByRole role="Student" />
      </div>
    </div>
  );
}

function AccountsByRole({ role }) {
  const {
    accounts,
    currentAccount,
    deleteAccount,
    approveAdminRequest,
    rejectAdminRequest,
    logout,
  } = useAccounts();
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    icon: "",
  });
  const [confirmMessage, setConfirmMessage] = useState({
    message: "",
    icon: "",
    onConfirm: null,
  });
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const filteredAccounts = (accounts || [])
    .filter((acc) => acc.role === role)
    .filter((acc) =>
      searchBy === "name"
        ? acc.fullname.toLowerCase().includes(query.toLowerCase())
        : acc.studentNumber.includes(query)
    );

  function handleRemoveAccount() {
    if (!selectedAccount) return;

    const haveBookBorrowed =
      selectedAccount.borrowed.length !== 0 ||
      selectedAccount.returning.length !== 0 ||
      selectedAccount.overdue.length !== 0;

    if (haveBookBorrowed) {
      setAlertMessage({
        message: `Account cannot be deleted until all borrowed books are returned by this user.`,
        icon: "cancel",
      });

      setSelectedAccount(null);
      return;
    }

    const haveLostBook = selectedAccount.lost.length !== 0;

    if (haveLostBook) {
      setAlertMessage({
        message: `Account deletion is not allowed until all lost book(s) are retrieved or replaced by the user.`,
        icon: "cancel",
      });

      setSelectedAccount(null);
      return;
    }

    const isSameUser = selectedAccount.id === currentAccount.id;

    setConfirmMessage({
      message: isSameUser
        ? `Are you sure you want to delete your own account?`
        : `Are you sure you want to delete ${selectedAccount.firstname} ${selectedAccount.lastname}?`,
      icon: "question",
      onConfirm: () => handleConfirmDelete(),
    });
  }

  function handleConfirmDelete() {
    if (!selectedAccount) return;

    const isSameUser = selectedAccount.id === currentAccount.id;

    deleteAccount(selectedAccount.id);
    setSelectedAccount(null);
    setConfirmMessage({ message: "", icon: "", onConfirm: null });
    if (isSameUser) {
      setIsLocked(true);
      setTimeout(() => {
        logout();
        navigate("/");
      }, 1700);
    } else {
      setAlertMessage({
        message: "Account removed successfully.",
        icon: "success",
      });
    }
  }

  function handleStudentToAdmin() {
    const isStudent = selectedAccount.role === "Student";

    if (!isStudent) return;

    setConfirmMessage({
      message: `Are you sure you want to make ${selectedAccount.firstname} ${selectedAccount.lastname} as Admin?`,
      icon: "question",
      onConfirm: () => approveAdminRequest(selectedAccount.id),
    });
  }

  function handleRemoveFromAdmin() {
    const isAdmin = selectedAccount.role === "Admin";
    const isSameUser = selectedAccount.id === currentAccount.id;

    if (!isAdmin) return;

    setConfirmMessage({
      message: !isSameUser
        ? `Are you sure you want to remove ${selectedAccount.firstname} ${selectedAccount.lastname} from Admin?`
        : `Are you sure you want to remove your account from admin?`,
      icon: "question",
      onConfirm: () => {
        rejectAdminRequest(selectedAccount.id);
        if (isSameUser) {
          setIsLocked(true);
          setTimeout(() => {
            logout();
            navigate("/");
          }, 1700);
        }
        setConfirmMessage({ message: "", icon: "", onConfirm: null });
        setSelectedAccount(null);
      },
    });
  }

  const resetAlert = () => setAlertMessage({ message: "", icon: "" });
  const resetConfirm = () =>
    setConfirmMessage({ message: "", icon: "", onConfirm: null });

  return (
    <div
      className={`${
        isLocked && "pointer-events-none"
      } bg-white p-5 rounded-xl relative`}
    >
      {isLocked && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-[200] transition-opacity duration-500">
          <h2 className="text-white text-2xl font-semibold animate-pulse mb-2">
            Logging out...
          </h2>
          <p className="text-gray-300 text-sm">Please wait a moment</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <h1 className="text-2xl font-semibold">{`${role}s`}</h1>
        <Search
          query={query}
          onQuery={setQuery}
          searchBy={searchBy}
          onSearchBy={setSearchBy}
        />
      </div>

      {filteredAccounts.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {filteredAccounts.map((detail) => (
            <Accounts
              key={detail.studentNumber}
              detail={detail}
              onSelect={() => setSelectedAccount(detail)}
            />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 m-10">
          <span className="text-gray-500 text-sm">No student found!</span>
          <img
            className="w-20 reverse"
            src={noResultsIcon}
            alt="icon-no-found"
          />
        </div>
      )}

      {/* Alert message */}
      {alertMessage.message && (
        <AlertMessageModal
          icon={alertMessage.icon}
          onCloseMessage={() => resetAlert()}
        >
          {alertMessage.message}
        </AlertMessageModal>
      )}

      {confirmMessage.message && (
        <ConfirmMessageModal
          icon={confirmMessage.icon}
          onCloseMessage={() => {
            resetConfirm();
            setSelectedAccount(null);
          }}
          onClick={() => {
            if (confirmMessage.onConfirm) confirmMessage.onConfirm();
            resetConfirm();
            setSelectedAccount(null);
          }}
        >
          {confirmMessage.message}
        </ConfirmMessageModal>
      )}

      {selectedAccount && !confirmMessage.message && !alertMessage.message && (
        <OverlayModal onClose={() => setSelectedAccount(null)}>
          <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-2xl w-full max-w-md sm:max-w-lg shadow-lg font-inter mx-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 border-b pb-2">
              <img src={infoIcon} alt="icon-info" className="w-5 h-5" />
              <h1 className="text-lg font-semibold text-blue900">
                General Information
              </h1>
            </div>

            {/* Details */}
            <div className="divide-y divide-gray-200 text-sm">
              <SelectedAccountDetails
                title="First name"
                detail={selectedAccount.firstname}
              />
              <SelectedAccountDetails
                title="Last name"
                detail={selectedAccount.lastname}
              />
              <SelectedAccountDetails
                title="USN"
                detail={selectedAccount.studentNumber}
              />
              {selectedAccount.role !== "Admin" && (
                <SelectedAccountDetails
                  title="Year"
                  detail={selectedAccount.year}
                />
              )}
              <SelectedAccountDetails
                title="Gender"
                detail={selectedAccount.gender}
              />
              <SelectedAccountDetails
                title="Birth Date"
                detail={selectedAccount.birthDate}
              />
              <SelectedAccountDetails
                title="Phone Number"
                detail={selectedAccount.phoneNumber}
              />
              <SelectedAccountDetails
                title="Email Address"
                detail={selectedAccount.emailAddress}
              />
              <SelectedAccountDetails
                title="Address"
                detail={selectedAccount.address}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 items-center justify-center mt-12">
              <Button
                className="bg-red-400 hover:bg-red-600 active:bg-red-700 text-white p-3 text-xs rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
                onClick={handleRemoveAccount}
              >
                Delete User
              </Button>
              {selectedAccount.role !== "Admin" ? (
                <Button
                  className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white p-3 text-xs rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
                  onClick={handleStudentToAdmin}
                >
                  Make this user admin
                </Button>
              ) : (
                <Button
                  className="bg-red-400 hover:bg-red-500 active:bg-red-700 text-white p-3 text-xs rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
                  onClick={handleRemoveFromAdmin}
                >
                  Remove this user as admin
                </Button>
              )}
            </div>
          </div>
        </OverlayModal>
      )}
    </div>
  );
}

function SelectedAccountDetails({ title, detail }) {
  return (
    <div className="flex justify-between py-2">
      <span className="text-gray-600 text-xs">{title} :</span>
      <span className="font-medium text-gray-900">{detail}</span>
    </div>
  );
}

function Accounts({ detail, onSelect }) {
  return (
    <li className="flex flex-col items-center text-sm text-center p-4 border border-gray-500/40 rounded-lg hover:shadow-md transition">
      <img
        className="w-28 h-28 rounded-full shadow-md border-4 border-white mb-3"
        src={
          detail.image === "/assets/images/unknown.png"
            ? unknownImage
            : `${backendUrl}${detail.image}`
        }
        alt="avatar"
      />
      <div className="mb-2 flex flex-col gap-3">
        <div>
          <h1 className="text-sm font-poppins">
            {detail.firstname} {detail.lastname}
          </h1>
          <p className="text-xs italic font-light text-gray-500/70">
            Full name
          </p>
        </div>
        <div>
          <h1 className="text-sm font-poppins">{detail.studentNumber}</h1>
          <p className="text-xs italic font-light text-gray-500/70">
            {detail.role !== "Admin" ? "Student" : "Admin"} Number
          </p>
        </div>
      </div>
      <Button
        buttonStyleType="btn2"
        padding="padding3"
        hover="hover2"
        onClick={onSelect}
      >
        Select
      </Button>
    </li>
  );
}

function Search({ query, onQuery, searchBy, onSearchBy }) {
  const [showSearch, setShowSearch] = useState(false);

  function handleCloseQuery() {
    setShowSearch(false);
    onQuery("");
    onSearchBy("name");
  }

  return showSearch ? (
    <div className="flex gap-2 items-center">
      <input
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        className="p-2 text-sm border border-gray-500/50 rounded-lg"
        type="text"
        placeholder={`Search by ${searchBy}`}
      />
      <select
        className="p-2 rounded-lg text-center text-sm bg-white border border-gray-500/50"
        value={searchBy}
        onChange={(e) => onSearchBy(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="usn">USN</option>
      </select>
      <img
        className="w-5 cursor-pointer"
        src={closeIcon}
        alt="icon-close"
        onClick={handleCloseQuery}
      />
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

export default AdminPanel;
