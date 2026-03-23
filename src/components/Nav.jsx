import styles from "./Nav.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useAccounts } from "../contexts/AccountsContext";

function Nav({ fontSize, fontColor, flexDirection, margin }) {
  const { isAuthenticated } = useAccounts();
  const location = useLocation();
  const path = location.pathname;

  const handleClick = (e) => {
    if (path === "/library") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <ul
      className={`${styles.nav} ${fontSize} ${fontColor} ${flexDirection} ${margin}`}
    >
      <NavLink to="/">Home</NavLink>
      <NavLink
        to={`${isAuthenticated ? "/library" : "/login"}`}
        onClick={handleClick}
      >
        Books
      </NavLink>
      {isAuthenticated && <NavLink to="/scan">Scan Book</NavLink>}
    </ul>
  );
}

export default Nav;
