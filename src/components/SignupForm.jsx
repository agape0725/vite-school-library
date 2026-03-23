import { Link, useNavigate } from "react-router-dom";
import { useAccounts } from "../contexts/AccountsContext";
import { useEffect, useState } from "react";
import Button from "../components/Button";
const emailFormat = /^\S+@\S+\.\S+$/;

function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    birthDate: "2000-01-01",
    phoneNumber: "",
    address: "",
    emailAddress: "",
    gender: "Male",
    year: "SHS",
    role: "Student",
    requestingForAdmin: false,
  });
  const [error, setError] = useState([]);
  const [showError, setShowError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { setSubmitSuccessful, setUserDetails } = useAccounts();
  useEffect(() => {
    if (error.length > 0) {
      setShowError(true);
      const timeout = setTimeout(() => {
        setShowError(false);
      }, 7000); // 7s

      return () => clearTimeout(timeout);
    }
  }, [error]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "phoneNumber" && !/^\d{0,11}$/.test(value)) return;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "phoneNumber" && !/^\d{0,11}$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitAccount = async (e) => {
    e.preventDefault();
    let newErrors = []; // Collect errors before updating state
    setFormSubmitted(true);

    if (!formData.firstname.trim()) newErrors.push("First name is required");
    if (!formData.lastname.trim()) newErrors.push("Last name is required");
    if (!formData.birthDate) newErrors.push("Birth date is required");
    if (!formData.address.trim()) newErrors.push("Address is required");
    if (!formData.gender) newErrors.push("Gender is required");
    if (!formData.year) newErrors.push("Year level is required");

    if (!formData.phoneNumber) {
      newErrors.push("Phone number is required");
    } else if (!/^\d{11}$/.test(formData.phoneNumber)) {
      newErrors.push(
        "Phone number must be exactly 11 digits (no dashes or spaces)"
      );
    }

    if (!formData.emailAddress) {
      newErrors.push("Email address is required");
    } else if (!emailFormat.test(formData.emailAddress)) {
      newErrors.push("Invalid email address (ex: loremipsum12@yahoo.com)");
    }

    setError(newErrors); // Update error state only once

    if (newErrors.length === 0) {
      try {
        await setUserDetails(formData);
        // await createAccount(formData);

        setSubmitSuccessful(true);
        navigate("new-user");
      } catch (err) {
        console.error(`"Failed to create account:" ${err}`);
      }
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
            !formData.firstname.trim() && formSubmitted
              ? "border-red-500"
              : "border-black500"
          } transition-[border-radius]`}
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs">Last name:</label>
        <input
          className={`outline-none bg-transparent p-2 text-sm border ${
            !formData.lastname.trim() && formSubmitted
              ? "border-red-500"
              : "border-black500"
          } transition-[border-radius]`}
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs">Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className={`border border-black outline-none bg-transparent p-2 text-sm`}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-xs">Year:</label>
        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          className={`border border-black outline-none bg-transparent p-2 text-sm`}
        >
          <option value="shs">SHS</option>
          <option value="college">College</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-xs">Birth date:</label>
        <input
          className={`outline-none bg-transparent p-2 text-sm border ${
            !formData.birthDate && formSubmitted
              ? "border-red-500"
              : "border-black500"
          } transition-[border-radius]`}
          type="date"
          max={new Date().toISOString().split("T")[0]}
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs">Phone number:</label>
        <input
          className={`outline-none bg-transparent p-2 text-sm border ${
            formData.phoneNumber.length <= 10 && formSubmitted
              ? "border-red-500"
              : "border-black500"
          } transition-[border-radius]`}
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>

      {/* This should only span 2 columns in md screens */}
      <div className="flex flex-col md:col-span-2">
        <label className="text-xs">Address:</label>
        <input
          className={`outline-none bg-transparent p-2 text-sm border ${
            !formData.address.trim() && formSubmitted
              ? "border-red-500"
              : "border-black500"
          } transition-[border-radius]`}
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col md:col-span-2">
        <label className="text-xs">Email Address:</label>
        <input
          className={`outline-none bg-transparent p-2 text-sm border ${
            formSubmitted &&
            (!formData.emailAddress || !emailFormat.test(formData.emailAddress))
              ? "border-red-500"
              : "border-black500"
          } transition-[border-radius]`}
          type="text"
          name="emailAddress"
          autoComplete="email"
          value={formData.emailAddress}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="requestingForAdmin"
          name="requestingForAdmin"
          checked={formData.requestingForAdmin}
          onChange={handleChange}
        />
        <label htmlFor="terms" className="text-sm">
          Requesting for admin?
        </label>
      </div>
      <div className="flex flex-col w-full text-center md:col-span-2">
        <Button
          type="submit"
          buttonStyleType="btn1"
          padding="padding2"
          hover="hover1"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default SignupForm;
