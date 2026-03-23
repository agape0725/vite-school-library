import { motion } from "framer-motion";
import { useAccounts } from "../../contexts/AccountsContext";
import { useState } from "react";
import Section from "./Section";
import Button from "../Button";
import AlertMessageModal from "../AlertMessageModal";
import ConfirmMessageModal from "../ConfirmMessageModal";

function RequestingForAdmin() {
  const { accounts, approveAdminRequest, rejectAdminRequest } = useAccounts();

  const [alertMessage, setAlertMessage] = useState({
    message: "",
    icon: "",
  });

  const [confirmMessage, setConfirmMessage] = useState({
    message: "",
    icon: "",
    onConfirm: null,
  });

  const requestingForAdminOnly = Array.isArray(accounts)
    ? accounts.filter(
        (acc) => acc.role === "Student" && acc.requestingForAdmin === true
      )
    : [];

  const handleApprove = (user) => {
    setConfirmMessage({
      message: (
        <>
          <span className="text-green-500 font-semibold">Approve</span>{" "}
          {user.firstname} {user.lastname} as admin?
        </>
      ),
      icon: "question",
      onConfirm: () => {
        approveAdminRequest(user.id);
        setAlertMessage({
          message: `Admin access has been successfully granted to ${user.firstname} ${user.lastname}.`,
          icon: "success",
        });
      },
    });
  };

  const handleReject = (user) => {
    setConfirmMessage({
      message: (
        <>
          <span className="text-red-400 font-semibold">Decline</span>{" "}
          {user.firstname} {user.lastname} as admin?
        </>
      ),
      icon: "question",
      onConfirm: () => {
        rejectAdminRequest(user.id);
        setAlertMessage({
          message: `Admin access request from ${user.firstname} ${user.lastname} has been declined.`,
          icon: "sad",
        });
      },
    });
  };

  const resetAlert = () =>
    setAlertMessage({
      message: "",
      icon: "",
    });

  const resetConfirm = () =>
    setConfirmMessage({
      message: "",
      icon: "",
      onConfirm: null,
    });

  return (
    <>
      {confirmMessage.message && confirmMessage.icon && (
        <ConfirmMessageModal
          icon={confirmMessage.icon}
          onClick={() => {
            if (confirmMessage.onConfirm) {
              confirmMessage.onConfirm();
            }
            resetConfirm();
          }}
          onCloseMessage={() => resetConfirm()}
        >
          {confirmMessage.message}
        </ConfirmMessageModal>
      )}

      {alertMessage.message && alertMessage.icon && (
        <AlertMessageModal
          icon={alertMessage.icon}
          onCloseMessage={() => resetAlert()}
        >
          {alertMessage.message}
        </AlertMessageModal>
      )}

      <Section title="Requesting for Admin Access">
        {requestingForAdminOnly.length > 0 ? (
          <Users
            users={requestingForAdminOnly}
            onHandleApprove={handleApprove}
            onHandleReject={handleReject}
          />
        ) : (
          <p className="text-center text-gray-500 text-sm mt-4">
            No users are currently requesting admin access.
          </p>
        )}
      </Section>
    </>
  );
}

function Users({ users, onHandleApprove, onHandleReject }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
      {users.map((user) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition"
        >
          <img
            src={`..${user.image}`}
            alt={user.fullname}
            className="w-20 h-20 object-cover rounded-full mb-3 border border-gray-300"
          />
          <h2 className="text-blue900 font-semibold text-lg">
            {user.fullname}
          </h2>
          <p className="text-sm text-gray-500">{user.emailAddress}</p>
          <p className="text-xs text-gray-400 mt-1">{user.studentNumber}</p>

          <div className="flex items-center gap-3 mt-4">
            <Button
              buttonStyleType="btn1"
              padding="padding2"
              hover="hover1"
              onClick={() => onHandleApprove(user)}
            >
              Approve
            </Button>
            <Button
              buttonStyleType="btn2"
              padding="padding2"
              hover="hover2"
              onClick={() => onHandleReject(user)}
            >
              Reject
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default RequestingForAdmin;
