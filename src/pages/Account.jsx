import { useNavigate, Link } from "react-router-dom";
import styles from "./Account.module.css";
import Button from "../components/Button";
import Login from "./Login";
import Signup from "./Signup";

function Account() {
  const navigate = useNavigate();

  return (
    <div className={`${styles.account}`}>
      <div className="p-3 absolute">
        <Button onClick={() => navigate("/")} type="btn1" padding="padding2">
          &larr; BACK
        </Button>
      </div>
      <h1>helloworlds</h1>
      {/* <Login />
      <Signup /> */}
      <Link to="login">Login</Link>
    </div>
  );
}

export default Account;
