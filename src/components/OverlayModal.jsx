import { useEffect } from "react";
import closeIcon from "../assets/icons/close.png";

function OverlayModal({ children, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="absolute top-5 right-5 cursor-pointer" onClick={onClose}>
        <img src={closeIcon} alt="close" className="w-6" />
      </div>
      {children}
    </div>
  );
}

export default OverlayModal;
