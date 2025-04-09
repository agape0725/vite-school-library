import styles from "./Button.module.css";

function Button({ children, onClick, type, padding, hover }) {
  return (
    <div>
      <button
        className={`${styles.btn} ${styles[type]} ${styles[padding]} ${styles[hover]}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
