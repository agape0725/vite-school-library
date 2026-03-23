import { useAccounts } from "../contexts/AccountsContext";
import unknownImage from "../assets/images/unknown.png";
import UserAvatar from "./UserAvatar";

const backendUrl = "http://localhost:7000";

function Profile() {
  const { currentAccount } = useAccounts();

  function formatDate(dateString) {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return dateString; // fallback if invalid date
    return dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue100 to-blue200 p-10 text-gray-900 font-sans rounded-xl">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center text-blue900 mb-10">
        Student Profile
      </h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Left Profile Card */}
        <div className="bg-white rounded-xl p-5 shadow-lg flex flex-col items-center">
          {/* <img
            className=""
            src={
              currentAccount.image !== "/assets/images/unknown.png"
                ? currentAccount.image
                : unknownImage
            }
            alt="avatar"
          /> */}
          <UserAvatar className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-3" />
          <h2 className="text-lg font-semibold mb-1">
            {currentAccount.firstname} {currentAccount.lastname}
          </h2>
          <div className="text-sm text-gray-600 text-center">
            <p>
              <strong>USN:</strong> {currentAccount.studentNumber}
            </p>
            {currentAccount.role === "Admin" ? (
              <strong>Admin</strong>
            ) : (
              <p>
                <strong>Year:</strong> {currentAccount.year}
              </p>
            )}
          </div>
        </div>

        {/* General Information */}
        <div className="bg-white rounded-xl p-5 shadow-lg col-span-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📋</span> General Information
          </h3>
          <table className="w-full text-sm table-auto">
            <tbody>
              <InfoRow label="First name" value={currentAccount.firstname} />
              <InfoRow label="Last name" value={currentAccount.lastname} />
              <InfoRow
                label="Birth Date"
                value={formatDate(currentAccount.birthDate)}
              />
              <InfoRow label="Address" value={currentAccount.address} />
              <InfoRow
                label="Phone Number"
                value={currentAccount.phoneNumber}
              />
              <InfoRow
                label="Email Address"
                value={currentAccount.emailAddress}
              />
              <InfoRow label="Gender" value={currentAccount.gender} />
            </tbody>
          </table>
        </div>

        {/* Other Information */}
        {/* <div className="bg-white rounded-xl p-5 shadow-lg md:col-span-3">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span>📝</span> Other Information
          </h3>
          <p className="text-sm text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div> */}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <tr className="border-t border-gray-200">
      <td className="py-2 pr-4 font-medium w-1/3">{label}</td>
      <td className="py-2 px-1">:</td>
      <td className="py-2 text-gray-600">{value || "—"}</td>
    </tr>
  );
}

export default Profile;
