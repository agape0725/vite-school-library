import { useEffect } from "react";
import Button from "./Button";
import iconSuccess from "../assets/icons/success.png";
import iconQuestion from "../assets/icons/question.png";
import iconCancel from "../assets/icons/cancel.png";
import iconSad from "../assets/icons/sad.png";
import iconInfo from "../assets/icons/info.png";
import iconNoResult from "../assets/icons/no-results.png";
import styles from "./ModalAnimation.module.css";

const icons = {
  success: iconSuccess,
  cancel: iconCancel,
  question: iconQuestion,
  sad: iconSad,
  info: iconInfo,
  "no-result": iconNoResult,
};

function AlertMessageModal({ children, icon = "success", onCloseMessage }) {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white p-6 rounded-2xl flex flex-col items-center gap-4 w-1/3 shadow-lg ${styles.modal}`}
      >
        <img
          className="w-20 mb-3"
          src={icons[icon] || ""}
          alt={`icon-${icon}`}
        />

        <h1 className="text-sm text-center text-gray-500 font-poppins whitespace-pre-line">
          {children}
        </h1>

        <Button
          className="bg-blue900 hover:bg-blue900/90 text-white py-2 px-3 text-xs"
          onClick={onCloseMessage}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default AlertMessageModal;

// function AlertMessageModal({ children, icon = "success", onCloseMessage }) {
//   useEffect(() => {
//     function handleKeyDown(e) {
//       if (e.key === "Escape") {
//         onCloseMessage();
//       }
//     }
//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [onCloseMessage]);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-2xl flex flex-col items-center gap-4 w-1/3 shadow-lg">
//         <img
//           className="w-20 mb-3"
//           src={icons[icon] || ""}
//           alt={`icon-${icon}`}
//         />

//         <h1 className="text-sm text-center font-sans whitespace-pre-line">
//           {children}
//         </h1>
//         <Button
//           className="bg-blue900 hover:bg-blue900/90 text-white py-2 px-3 text-xs"
//           onClick={onCloseMessage}
//         >
//           Confirm
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default AlertMessageModal;
