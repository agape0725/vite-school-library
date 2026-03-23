import { Link, useNavigate } from "react-router-dom";
import Forms from "../components/Forms";
import AccountInput from "../components/AccountInput";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { useAccounts } from "../contexts/AccountsContext";
import { useEffect, useState } from "react";

function Login() {
  const { login, isAuthenticated, error, clearError } = useAccounts();
  const [studentNumber, setStudentNumber] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentNumber.trim() || !studentPassword.trim()) return;
    login(studentNumber, studentPassword);
  };

  useEffect(() => {
    if (isAuthenticated) navigate(`/account/dashboard`, { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      clearError();
    }, 5000);

    return () => clearTimeout(timer);
  }, [error, clearError]);

  return (
    <Forms>
      <div className="p-3 absolute z-50">
        <BackButton />
      </div>

      <AccountInput
        userText="Student number"
        passText="Password"
        onChangeStudentNum={setStudentNumber}
        onChangeStudentPass={setStudentPassword}
        password={studentPassword}
        studentNumber={studentNumber}
        onSubmit={handleSubmit}
        style={"translate-y-0"}
      >
        <p
          className={`text-orange200 text-center transition-opacity duration-500 ${
            error ? "opacity-100" : "opacity-0"
          }`}
        >
          {error}
        </p>
        <div className="flex flex-col gap-3 text-center">
          <Button
            type="submit"
            buttonStyleType="btn1"
            padding="padding2"
            hover="hover1"
          >
            SIGN-IN
          </Button>
          <span className="text-xs font-light text-black">
            Don't have an account? <br />
            <Link className="text-blue600 hover:text-blue400" to="/signup">
              Sign up here
            </Link>
          </span>
        </div>
      </AccountInput>
    </Forms>
  );
}

export default Login;
