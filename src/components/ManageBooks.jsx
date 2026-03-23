import { useState } from "react";
import ManageAddBooks from "./ManageAddBooks";
import ManageRemoveEditBooks from "./ManageRemoveEditBooks";

function ManageBooks() {
  const [isOpen, setIsOpen] = useState("add");

  function handleManageBook(item) {
    setIsOpen((prev) => (prev === item ? prev : item));
  }

  const buttons = [
    { label: "Add Book", key: "add" },
    { label: "Remove / Edit Book", key: "remove-edit" },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-5 justify-center">
        {buttons.map((button) => (
          <button
            key={button.key}
            className={`p-3 rounded-lg text-xs ${
              isOpen === button.key
                ? "bg-blue900 text-white"
                : "border border-blue900 text-blue500"
            }`}
            onClick={() => handleManageBook(button.key)}
          >
            {button.label}
          </button>
        ))}
      </div>
      <div>
        {isOpen === "add" && <ManageAddBooks />}
        {isOpen === "remove-edit" && <ManageRemoveEditBooks />}
      </div>
    </div>
  );
}

export default ManageBooks;
