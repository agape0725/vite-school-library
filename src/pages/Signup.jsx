// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { CSSTransition } from "react-transition-group";
// import Forms from "../components/Forms";
// import Button from "../components/Button";
// import SignupForm from "../components/SignupForm";
// import NewUserForm from "../components/NewUserForm";

// function Signup() {
//   const navigate = useNavigate();
//   const [error, setError] = useState([]);
//   const [submitSuccessful, setSubmitSuccessful] = useState(false);
//   const [userDetails, setUserDetails] = useState({
//     firstname: "",
//     lastname: "",
//     birthDate: "2000-01-01",
//     phoneNumber: "",
//     address: "",
//     emailAddress: "",
//   });

//   const [transitionDelay, setTransitionDelay] = useState(false); // New state to handle the delay
//   const newUserFormRef = useRef(null);
//   const signupFormRef = useRef(null);

//   useEffect(() => {
//     if (submitSuccessful) {
//       // Delay the transition to show NewUserForm
//       const timer = setTimeout(() => {
//         setTransitionDelay(true); // After the delay, set the flag to transition
//       }, 1000); // Delay for 1 second (adjust as needed)

//       return () => clearTimeout(timer); // Clean up the timeout if the component unmounts
//     }
//   }, [submitSuccessful]);

//   return (
//     <Forms>
//       <div className="p-3 absolute z-50">
//         <Button onClick={() => navigate("/")} type="btn1" padding="padding2">
//           &larr; BACK
//         </Button>
//       </div>
//       <div className="grid place-items-center h-screen mx-5">
//         {/* Transition for NewUserForm */}
//         <CSSTransition
//           in={transitionDelay} // Trigger when transitionDelay is true
//           timeout={500}
//           classNames="fade"
//           unmountOnExit
//           nodeRef={newUserFormRef}
//         >
//           <div ref={newUserFormRef}>
//             <NewUserForm
//               submitSuccessful={submitSuccessful}
//               userDetails={userDetails}
//             />
//           </div>
//         </CSSTransition>

//         {/* Transition for SignupForm */}
//         <CSSTransition
//           in={error.length > 0 || !submitSuccessful}
//           timeout={500}
//           classNames="fade"
//           unmountOnExit
//           nodeRef={signupFormRef}
//         >
//           <div ref={signupFormRef}>
//             <SignupForm
//               error={error}
//               setError={setError}
//               setSubmitSuccessful={setSubmitSuccessful}
//               setNewUserDetails={setUserDetails}
//             />
//           </div>
//         </CSSTransition>
//       </div>
//     </Forms>
//   );
// }

// export default Signup;

import { Outlet, useNavigate } from "react-router-dom";
import Forms from "../components/Forms";
import Button from "../components/Button";

function Signup() {
  const navigate = useNavigate();

  return (
    <Forms>
      <div className="p-3 absolute z-50">
        <Button onClick={() => navigate("/")} type="btn1" padding="padding2">
          &larr; BACK
        </Button>
      </div>
      <div className="grid place-items-center h-screen mx-5">
        <Outlet />
      </div>
    </Forms>
  );
}

export default Signup;
