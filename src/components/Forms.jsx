import styles from "./Forms.module.css";

function Forms({ children }) {
  return <div className={`${styles.form}`}>{children}</div>;
}

export default Forms;
