import Button from "../components/Button";
import Forms from "../components/Forms";
import { useNavigate, Link } from "react-router-dom";
import AccountInput from "../components/AccountInput";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [studentNumber, setStudentNumber] = useState("");
  const [studentPassword, setStudentPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <Forms>
      <div className="p-3 absolute z-50">
        <Button onClick={() => navigate("/")} type="btn1" padding="padding2">
          &larr; BACK
        </Button>
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
        <div className="flex flex-col gap-3 text-center">
          <Button type="btn1" padding="padding2" hover="hover1">
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
