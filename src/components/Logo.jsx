import logo from "../assets/images/library-logo.png";
import { Link } from "react-router-dom";

function Logo({ widthSize }) {
  return (
    <Link to="/">
      <img className={`${widthSize}`} src={logo} alt="logo" />
    </Link>
  );
}

export default Logo;
