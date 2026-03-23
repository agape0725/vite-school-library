import unknownImage from "../assets/images/unknown.png";
import { useAccounts } from "../contexts/AccountsContext";

const backendUrl = "http://localhost:7000";
function UserAvatar({
  onClick,
  className = "hidden md:block cursor-pointer rounded-full w-9 h-9 border-2 border-white shadow-md",
}) {
  const { currentAccount } = useAccounts();

  return (
    <div>
      <img
        className={className}
        src={
          currentAccount.image !== "/assets/images/unknown.png"
            ? `${backendUrl}${currentAccount.image}`
            : unknownImage
        }
        alt="avatar"
        onClick={onClick}
      />
    </div>
  );
}

export default UserAvatar;
