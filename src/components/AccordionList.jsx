import { useState } from "react";
import plus from "../assets/icons/plus.png";
import minus from "../assets/icons/minus.png";
import styles from "./AccordionList.module.css";

function AccordionList({ faq }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <li
      className={`${styles.accordion} ${showAnswer && `${styles.active}`}`}
      onClick={() => setShowAnswer((prev) => !prev)}
    >
      <div className="flex justify-between items-center">
        <h1 className={`${showAnswer && styles.active} `}>{faq.question}</h1>
        <img
          className={`${showAnswer && styles.active}`}
          src={showAnswer ? minus : plus}
          alt="icon"
        />
      </div>
      <p id="answer" className={`${showAnswer ? `${styles.active}` : ""}`}>
        {faq.answer}
      </p>
    </li>
  );
}

export default AccordionList;
