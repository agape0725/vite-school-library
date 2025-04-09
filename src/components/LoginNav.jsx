import Button from "./Button";
import { Link } from "react-router-dom";
function LoginNav() {
  return (
    <div className="flex flex-col items-center md:flex-row gap-2 mt-10 md:mt-0">
      <Link to="/login">
        <Button type="btn2" padding="padding1" hover="hover2">
          LOG IN
        </Button>
      </Link>
      <Link to="/signup">
        <Button type="btn1" padding="padding1" hover="hover1">
          SIGN UP
        </Button>
      </Link>
    </div>
  );
}

export default LoginNav;
