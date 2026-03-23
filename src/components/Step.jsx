import { useState } from "react";
import styles from "./Step.module.css";
import { img } from "framer-motion/client";

function Step({ step }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${
        styles.steps
      } flex flex-row md:flex-col gap-4 p-3 rounded transition-all duration-300 ease-in-out shadow-inner ${
        isHovered ? "bg-orange200/80" : "bg-dirtyWhite/50"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between gap-1">
        <div
          className={`md:bg-orange100 w-full md:w-fit p-4 rounded-full flex items-center justify-center`}
        >
          <img
            className={`transition-transform duration-700 ease-in-out w-20 md:w-14 ${
              isHovered ? "md:scale-125" : "md:scale-75"
            }`}
<<<<<<< HEAD
            src={isHovered ? step.hoverIcon : step.icon}
            alt="steps"
=======
            style={{ willChange: "transform" }}
            src={`${import.meta.env.BASE_URL}${
              isHovered ? step.hoverIcon : step.icon
            }`}
            alt="step"
>>>>>>> d09e93e (Added dummy accounts for GitHub deployment)
          />
        </div>
        {/* <span className="text-3xl h-fit font-montserrat font-semibold text-blue900">
          0{step.id}
        </span> */}
      </div>
      <div className="flex flex-col gap-3 w-fit">
        <h1
          className={`text-sm font-semibold ${
            isHovered ? "text-dirtyWhite" : "text-blue900"
          }`}
        >
          {step.step}
        </h1>
        <p
          className={`text-xs ${
            isHovered ? "text-dirtyWhite" : "text-blue900"
          }`}
        >
          {step.instruction}
        </p>
      </div>
    </div>
  );
}

export default Step;
