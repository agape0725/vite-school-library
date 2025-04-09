import { useState } from "react";
import { useAccounts } from "../states/AccountsContext";
import { useNewStudent } from "../states/NewStudentContext";
import Button from "../components/Button";
import AccountInput from "./AccountInput";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion

function NewUserForm() {
  const { accounts, setAccounts } = useAccounts();
  const { userDetails } = useNewStudent();
  const [newStudentNumber, setNewStudentNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Track success message visibility

  console.log(accounts);
  const navigate = useNavigate();

  const formatter = (name) => {
    return name
      .toLowerCase()
      .split(" ")
      .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
      .join("");
  };

  const returnHome = () => {
    setTimeout(() => {
      navigate("/"); // After 2 seconds, navigate back home
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingStudent = accounts.some(
      (acc) => acc.studentNumber === newStudentNumber
    );

    if (existingStudent) {
      setShowError(true);
    } else {
      setShowError(false);
      const newAccount = {
        studentNumber: newStudentNumber,
        firstname: formatter(userDetails.firstname),
        lastname: formatter(userDetails.lastname),
        birthDate: userDetails.birthDate,
        phoneNumber: userDetails.phoneNumber,
        address: userDetails.address,
        emailAddress: userDetails.emailAddress,
        password: newPassword,
      };

      setAccounts((prevAcc) => [...prevAcc, newAccount]);
      setNewStudentNumber("");
      setNewPassword("");

      // Show success message and trigger transition
      setShowSuccessMessage(true);

      // Trigger returnHome after success message display
      setTimeout(returnHome, 1000); // Navigate after the success message is shown for 2 seconds
    }
  };

  return (
    <AccountInput
      userText="Enter your student number"
      passText="Enter new password"
      studentNumber={newStudentNumber}
      onChangeStudentNum={setNewStudentNumber}
      password={newPassword}
      onChangeStudentPass={setNewPassword}
      onSubmit={handleSubmit}
      showSuccessMessage={showSuccessMessage}
    >
      <div className="flex flex-col gap-3 text-center">
        <Button type="btn1" padding="padding2" hover="hover1">
          CONFIRM
        </Button>
      </div>

      {/* Error Message */}
      <div
        className={`m-auto md:col-span-2 bg-red-100 text-red-600 rounded overflow-hidden`}
      >
        {showError && <p className="p-3">Student number already existed</p>}
      </div>

      {/* Success Message with framer-motion transition */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSuccessMessage ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="bg-green-100 text-green-600 rounded p-3 mt-3"
        style={{ display: showSuccessMessage ? "block" : "none" }}
      >
        <p>Account successfully created!</p>
      </motion.div>
    </AccountInput>
  );
}

export default NewUserForm;
