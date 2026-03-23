import { Outlet } from "react-router-dom";
import Forms from "../components/Forms";
import BackButton from "../components/BackButton";

function Signup() {
  return (
    <Forms>
      <div className="p-3 absolute z-50">
        <BackButton />
      </div>
      <div className="grid place-items-center h-screen mx-5">
        <Outlet />
      </div>
    </Forms>
  );
}

export default Signup;
