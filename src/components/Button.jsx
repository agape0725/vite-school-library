import styles from "./Button.module.css";

function Button({
  children,
  onClick,
  type = "button",
  buttonStyleType,
  padding,
  hover,
  className = "",
}) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[buttonStyleType]} ${styles[padding]} ${styles[hover]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
