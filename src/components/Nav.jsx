import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Nav({ fontSize, fontColor, flexDirection, margin }) {
  return (
    <ul
      className={`${styles.nav} ${fontSize} ${fontColor} ${flexDirection} ${margin}`}
    >
      <NavLink to="/">Home</NavLink>
      <NavLink to="/library">Books</NavLink>
      <HashLink smooth to="#events">
        Events
      </HashLink>
    </ul>
  );
}

export default Nav;
