import { useEffect } from "react";
import Button from "./Button";
import iconSuccess from "../assets/icons/success.png";
import iconQuestion from "../assets/icons/question.png";
import iconCancel from "../assets/icons/cancel.png";
import styles from "./ModalAnimation.module.css";

const icons = {
  success: iconSuccess,
  cancel: iconCancel,
  question: iconQuestion,
};

function ConfirmMessageModal({ children, icon, onCloseMessage, onClick }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onCloseMessage();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseMessage]);

  const isQuestion = icon === "question";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white p-6 rounded-2xl flex flex-col items-center gap-5 w-80 shadow-lg ${styles.modal}`}
      >
        <img
          style={{
            filter: isQuestion
              ? "invert(19%) sepia(13%) saturate(2232%) hue-rotate(157deg) brightness(92%) contrast(93%)"
              : "",
          }}
          className="w-20 mb-3"
          src={icons[icon] || ""}
          alt={`icon-${icon}`}
        />
        <h1 className="text-sm text-center text-gray-500 font-poppins">
          {children}
        </h1>
        <div className="flex gap-3 w-full justify-center">
          <Button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 text-xs"
            onClick={onClick}
          >
            Confirm
          </Button>

          <Button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 text-xs"
            onClick={onCloseMessage}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmMessageModal;
