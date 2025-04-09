// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Button from "../components/Button";
// const emailFormat = /^\S+@\S+\.\S+$/;

// function SignupForm({
//   error,
//   setError,
//   setSubmitSuccessful,
//   setNewUserDetails,
// }) {
//   const [showError, setShowError] = useState(false);
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [birthDate, setBirthDate] = useState("2000-01-01");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [address, setAddress] = useState("");
//   const [emailAddress, setEmailAddress] = useState("");

//   useEffect(() => {
//     if (error.length > 0) {
//       setShowError(true);
//       const timeout = setTimeout(() => {
//         setShowError(false);
//       }, 7000); // 7s

//       return () => clearTimeout(timeout);
//     }
//   }, [error]);

//   const handleSubmitAccount = (e) => {
//     e.preventDefault();
//     let newErrors = []; // Collect errors before updating state
//     setFormSubmitted(true);

//     if (!firstname) newErrors.push("First name is required");
//     if (!lastname) newErrors.push("Last name is required");
//     if (!birthDate) newErrors.push("Birth date is required");
//     if (!address) newErrors.push("Address is required");

//     if (!phoneNumber) {
//       newErrors.push("Phone number is required");
//     } else if (!/^\d{11}$/.test(phoneNumber)) {
//       newErrors.push("Phone number must consist of exactly 11 digits");
//     }

//     if (!emailAddress) {
//       newErrors.push("Email address is required");
//     } else if (!emailFormat.test(emailAddress)) {
//       newErrors.push("Invalid email address (ex: loremipsum12@yahoo.com)");
//     }

//     setError(newErrors); // Update error state only once

//     if (newErrors.length === 0) {
//       setNewUserDetails({
//         firstname,
//         lastname,
//         birthDate,
//         phoneNumber,
//         address,
//         emailAddress,
//       });

//       setSubmitSuccessful(true);
//     }
//   };
//   return (
//     <form
//       className={`transition-all duration-500 ease-in-out transform grid grid-cols-1 md:grid-cols-2 w-full md:w-[55vw] gap-5 text-xs rounded p-6 shadow-lg bg-white/100 backdrop-blur-sm`}
//       onSubmit={handleSubmitAccount}
//     >
//       <div className="text-center md:col-span-2">
//         <h1 className="mb-2 text-5xl font-poppins font-semibold text-blue900">
//           Sign Up
//         </h1>
//         <p>
//           Already have an account? <br />
//           <Link className="text-blue600 hover:text-blue400" to="/login">
//             Login
//           </Link>
//         </p>
//       </div>
//       {/* Error Messages */}
//       {error.length > 0 && (
//         <div
//           className={`transition-all duration-300 linear ${
//             showError
//               ? "opacity-100 max-h-[500px] p-3"
//               : "opacity-0 max-h-0 p-0"
//           } md:col-span-2 bg-red-100 text-red-600 rounded overflow-hidden`}
//         >
//           {error.map((errMsg, index) => (
//             <p key={index}>⚠ {errMsg}</p>
//           ))}
//         </div>
//       )}
//       <div className="flex flex-col">
//         <label className="text-xs">First name:</label>
//         <input
//           className={`outline-none bg-transparent p-2 text-sm border ${
//             !firstname && formSubmitted ? "border-red-500" : "border-black500"
//           } transition-[border-radius]`}
//           type="text"
//           value={firstname}
//           onChange={(e) => setFirstname(e.target.value)}
//         />
//       </div>
//       <div className="flex flex-col">
//         <label className="text-xs">Last name:</label>
//         <input
//           className={`outline-none bg-transparent p-2 text-sm border ${
//             !lastname && formSubmitted ? "border-red-500" : "border-black500"
//           } transition-[border-radius]`}
//           type="text"
//           value={lastname}
//           onChange={(e) => setLastname(e.target.value)}
//         />
//       </div>
//       <div className="flex flex-col">
//         <label className="text-xs">Birth date:</label>
//         <input
//           className={`outline-none bg-transparent p-2 text-sm border ${
//             !birthDate && formSubmitted ? "border-red-500" : "border-black500"
//           } transition-[border-radius]`}
//           type="date"
//           max={new Date().toISOString().split("T")[0]}
//           value={birthDate}
//           onChange={(e) => setBirthDate(e.target.value)}
//         />
//       </div>
//       <div className="flex flex-col">
//         <label className="text-xs">Phone number:</label>
//         <input
//           className={`outline-none bg-transparent p-2 text-sm border ${
//             phoneNumber.length <= 10 && formSubmitted
//               ? "border-red-500"
//               : "border-black500"
//           } transition-[border-radius]`}
//           type="tel"
//           value={phoneNumber}
//           onChange={(e) => {
//             const value = e.target.value;
//             if (/^\d{0,11}$/.test(value)) setPhoneNumber(value);
//           }}
//         />
//       </div>
//       {/* This should only span 2 columns in md screens */}
//       <div className="flex flex-col md:col-span-2">
//         <label className="text-xs">Address:</label>
//         <input
//           className={`outline-none bg-transparent p-2 text-sm border ${
//             !address && formSubmitted ? "border-red-500" : "border-black500"
//           } transition-[border-radius]`}
//           type="text"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//       </div>
//       <div className="flex flex-col md:col-span-2">
//         <label className="text-xs">Email Address:</label>
//         <input
//           className={`outline-none bg-transparent p-2 text-sm border ${
//             formSubmitted && (!emailAddress || !emailFormat.test(emailAddress))
//               ? "border-red-500"
//               : "border-black500"
//           } transition-[border-radius]`}
//           type="text"
//           value={emailAddress}
//           onChange={(e) => setEmailAddress(e.target.value)}
//         />
//       </div>
//       <div className="flex flex-col w-full text-center md:col-span-2">
//         <Button type="btn1" padding="padding2" hover="hover1">
//           Submit
//         </Button>
//       </div>
//     </form>
//   );
// }

// export default SignupForm;

import { Link, useNavigate } from "react-router-dom";
import { useNewStudent } from "../states/NewStudentContext";
import { useEffect, useState } from "react";
import Button from "../components/Button";
const emailFormat = /^\S+@\S+\.\S+$/;

function SignupForm() {
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const [showError, setShowError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const { setSubmitSuccessful, setUserDetails } = useNewStudent();
  useEffect(() => {
    if (error.length > 0) {
      setShowError(true);
      const timeout = setTimeout(() => {
        setShowError(false);
      }, 7000); // 7s

      return () => clearTimeout(timeout);
    }
  }, [error]);

  const handleSubmitAccount = (e) => {
    e.preventDefault();
    let newErrors = []; // Collect errors before updating state
    setFormSubmitted(true);

    if (!firstname) newErrors.push("First name is required");
    if (!lastname) newErrors.push("Last name is required");
    if (!birthDate) newErrors.push("Birth date is required");
    if (!address) newErrors.push("Address is required");

    if (!phoneNumber) {
      newErrors.push("Phone number is required");
    } else if (!/^\d{11}$/.test(phoneNumber)) {
      newErrors.push("Phone number must consist of exactly 11 digits");
    }

    if (!emailAddress) {
      newErrors.push("Email address is required");
    } else if (!emailFormat.test(emailAddress)) {
      newErrors.push("Invalid email address (ex: loremipsum12@yahoo.com)");
    }

    setError(newErrors); // Update error state only once

    if (newErrors.length === 0) {
      setUserDetails({
        firstname,
        lastname,
        birthDate,
        phoneNumber,
        address,
        emailAddress,
      });

      setSubmitSuccessful(true);
      navigate("new-user");
    }
  };
  return (
    <form
      className={`transition-all duration-500 ease-in-out transform grid grid-cols-1 md:grid-cols-2 w-full md:w-[55vw] gap-5 text-xs rounded p-6 shadow-lg bg-white/100 backdrop-blur-sm`}
      onSubmit={handleSubmitAccount}
    >
      <div className="text-center md:col-span-2">
        <h1 className="mb-2 text-5xl font-poppins font-semibold text-blue900">
          Sign Up
        </h1>
        <p>
          Already have an account? <br />
          <Link className="text-blue600 hover:text-blue400" to="/login">
            Login
          </Link>
        </p>
      </div>
      {/* Error Messages */}
      {error.length > 0 && (
        <div
          className={`transition-all duration-300 linear ${
            showError
              ? "opacity-100 max-h-[500px] p-3"
              : "opacity-0 max-h-0 p-0"
          } md:col-span-2 bg-red-100 text-red-600 rounded overflow-hidden`}
        >
          {error.map((errMsg, index) => (
            <p key={index}>⚠ {errMsg}</p>
          ))}
        </div>
      )}
      <div className="flex flex-col">
        <label className="text-xs">First name:</label>
        <input
          className={`outline-none bg-transparent p-2 text-sm border ${
            !firstname && formSubmitted ? "border-red-500" : "border-black500"
          } transition-[border-radius]`}
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs">Last name:</label>
        <input
          className={`outline-none bg-transparent p-2 text-sm border ${
            !lastname && formSubmitted ? "border-red-500" : "border-black500"
          } transition-[border-radius]`}
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs">Birth date:</label>
        <input
          className={`outline-none bg-transparent p-2 text-sm border ${
            !birthDate && formSubmitted ? "border-red-500" : "border-black500"
          } transition-[border-radius]`}
          type="date"
          max={new Date().toISOString().split("T")[0]}
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs">Phone number:</label>
        <input
          className={`outline-none bg-transparent p-2 text-sm border ${
            phoneNumber.length <= 10 && formSubmitted
              ? "border-red-500"
              : "border-black500"
          } transition-[border-radius]`}
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,11}$/.test(value)) setPhoneNumber(value);
          }}
        />
      </div>
      {/* This should only span 2 columns in md screens */}
      <div className="flex flex-col md:col-span-2">
        <label className="text-xs">Address:</label>
        <input
          className={`outline-none bg-transparent p-2 text-sm border ${
            !address && formSubmitted ? "border-red-500" : "border-black500"
          } transition-[border-radius]`}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="flex flex-col md:col-span-2">
        <label className="text-xs">Email Address:</label>
        <input
          className={`outline-none bg-transparent p-2 text-sm border ${
            formSubmitted && (!emailAddress || !emailFormat.test(emailAddress))
              ? "border-red-500"
              : "border-black500"
          } transition-[border-radius]`}
          type="text"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full text-center md:col-span-2">
        <Button type="btn1" padding="padding2" hover="hover1">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default SignupForm;
