import { useState } from "react";
import styles from "./Step.module.css";

function Step({ step }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${styles.steps} flex flex-row md:flex-col gap-4 p-3 shadow-inner rounded`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between gap-1">
        <div
          className={`transition-all duration-300 ease-in-out md:bg-orange100 w-full md:w-fit p-5 rounded-full flex items-center justify-center`}
        >
          <img
            className={`transition-all duration-100 ease-in-out w-20 md:w-14 md:p-1 ${
              isHovered ? "scale-150" : "scale-125"
            }`}
            src={isHovered ? step.hoverIcon : step.icon}
            alt="steps"
          />
        </div>
        {/* <span className="text-3xl h-fit font-montserrat font-semibold text-blue900">
          0{step.id}
        </span> */}
      </div>
      <div className="flex flex-col gap-3 w-fit">
        <h1 className="text-sm font-semibold text-blue900">{step.step}</h1>
        <p className="text-xs font-light text-gray-800">{step.instruction}</p>
      </div>
    </div>
  );
}

export default Step;
