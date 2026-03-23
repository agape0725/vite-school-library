// import { useState } from "react";
// import { useAccounts } from "../contexts/AccountsContext";
// import Button from "./Button";

// function Settings() {
//   const { currentAccount } = useAccounts();

//   return (
//     <div className="font-sans">
//       <div>
//         <h1 className="text-2xl font-bold text-blue900 mb-5">Student Info</h1>
//         <ul className="flex flex-col gap-3">
//           <InfoInput
//             label="First name"
//             labelKey="firstname"
//             detail={currentAccount.firstname}
//             id={currentAccount.id}
//           />
//           <InfoInput
//             label="Last name"
//             labelKey="lastname"
//             detail={currentAccount.lastname}
//             id={currentAccount.id}
//           />
//           <InfoInput
//             label="Birth date"
//             labelKey="birthDate"
//             detail={currentAccount.birthDate}
//             id={currentAccount.id}
//           />
//           <InfoInput
//             label="Address"
//             labelKey="address"
//             detail={currentAccount.address}
//             id={currentAccount.id}
//           />
//           <InfoInput
//             label="Phone Number"
//             labelKey="phoneNumber"
//             detail={currentAccount.phoneNumber}
//             id={currentAccount.id}
//           />
//           <InfoInput
//             label="Email Address"
//             labelKey="emailAddress"
//             detail={currentAccount.emailAddress}
//             id={currentAccount.id}
//           />
//           <InfoInput
//             label="Gender"
//             labelKey="gender"
//             detail={currentAccount.gender}
//             id={currentAccount.id}
//           />
//           <InfoInput
//             label="Year"
//             labelKey="year"
//             detail={currentAccount.year}
//             id={currentAccount.id}
//           />
//         </ul>
//       </div>
//     </div>
//   );
// }

// function InfoInput({ label, labelKey, detail }) {
//   const { updateAccountDetails } = useAccounts();
//   const [isEditing, setIsEditing] = useState(false);
//   const [inputValue, setInputValue] = useState(detail);

//   function handleSave() {
//     updateAccountDetails({ [labelKey]: inputValue });
//     setIsEditing(false);
//   }

//   return (
//     <li className="flex items-center gap-5 max-w-xl justify-between border-b border-gray-300 last:border-b-0 py-4">
//       <div>
//         <h1 className="text-xs font-semibold">{label}</h1>
//         {isEditing ? (
//           <input
//             className="border p-1 text-sm w-full"
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//           />
//         ) : (
//           <p className="text-sm !font-poppins">{detail}</p>
//         )}
//       </div>
//       {isEditing ? (
//         <Button
//           type="btn2"
//           padding="padding3"
//           hover="hover2"
//           onClick={handleSave}
//         >
//           Save
//         </Button>
//       ) : (
//         <Button
//           type="btn2"
//           padding="padding3"
//           hover="hover2"
//           onClick={() => setIsEditing(true)}
//         >
//           Update
//         </Button>
//       )}
//     </li>
//   );
// }

// export default Settings;

// old

// import { useState } from "react";
// import { useAccounts } from "../contexts/AccountsContext";
// import Button from "./Button";

// function Settings() {
//   const { currentAccount } = useAccounts();

//   return (
//     <div className="font-sans">
//       <div>
//         <h1 className="text-2xl font-bold text-blue900 mb-5">Student Info</h1>
//         <ul className="flex flex-col gap-3">
//           <Info
//             label="First name"
//             labelKey="firstname"
//             detail={currentAccount.firstname}
//             id={currentAccount.id}
//           />
//           <Info
//             label="Last name"
//             labelKey="lastname"
//             detail={currentAccount.lastname}
//             id={currentAccount.id}
//           />
//           <Info
//             label="Birth date"
//             labelKey="birthDate"
//             detail={currentAccount.birthDate}
//             id={currentAccount.id}
//           />
//           <Info
//             label="Image"
//             labelKey="image"
//             detail={currentAccount.image}
//             id={currentAccount.id}
//           />
//           <Info
//             label="Address"
//             labelKey="address"
//             detail={currentAccount.address}
//             id={currentAccount.id}
//           />
//           <Info
//             label="Phone Number"
//             labelKey="phoneNumber"
//             detail={currentAccount.phoneNumber}
//             id={currentAccount.id}
//           />
//           <Info
//             label="Email Address"
//             labelKey="emailAddress"
//             detail={currentAccount.emailAddress}
//             id={currentAccount.id}
//           />
//           <Info
//             label="Gender"
//             labelKey="gender"
//             detail={currentAccount.gender}
//             id={currentAccount.id}
//           />
//           {currentAccount.role !== "Admin" && (
//             <Info
//               label="Year"
//               labelKey="year"
//               detail={currentAccount.year}
//               id={currentAccount.id}
//             />
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }

// function Info({ label, labelKey, detail }) {
//   const { updateAccountDetails } = useAccounts();
//   const [isEditing, setIsEditing] = useState(false);
//   const [inputValue, setInputValue] = useState(detail);

//   function handleSave() {
//     updateAccountDetails({ [labelKey]: inputValue });
//     setIsEditing(false);
//   }

//   const genderOptions = ["Male", "Female"];
//   const yearOptions = ["SHS", "College"];

//   const isSelect = labelKey === "gender" || labelKey === "year";
//   const isDate = labelKey === "birthDate";
//   const options = labelKey === "gender" ? genderOptions : yearOptions;
//   const image = labelKey === "image";
//   // Format date for display (when not editing)
//   function formatDate(dateString) {
//     if (!dateString) return "";
//     const dateObj = new Date(dateString);
//     if (isNaN(dateObj)) return dateString; // fallback if invalid date
//     return dateObj.toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });
//   }

//   return (
//     <li className="flex items-center gap-5 max-w-xl justify-between border-b border-gray-300 last:border-b-0 py-4">
//       <div className="w-full">
//         <h1 className="text-xs font-semibold">{label}</h1>

//         {isEditing ? (
//           isSelect ? (
//             <select
//               className="border p-2 text-sm w-full bg-transparent outline-none"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//             >
//               {options.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           ) : isDate ? (
//             <input
//               className="border p-2 text-sm w-full bg-transparent outline-none"
//               type="date"
//               max={new Date().toISOString().split("T")[0]}
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//             />
//           ) : image ? (
//             <input
//               className="border p-2 text-sm w-full bg-transparent outline-none"
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 if (file) {
//                   setInputValue(`/assets/images/${file.name}`);
//                 }
//                 // base64x //
//                 //                if (file) {
//                 //   const reader = new FileReader();
//                 //   reader.onloadend = () => {
//                 //     setInputValue(reader.result); // this will be a base64 string
//                 //   };
//                 //   reader.readAsDataURL(file);
//                 // }
//               }}
//             />
//           ) : (
//             <input
//               className="border p-1 text-sm w-full"
//               type="text"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//             />
//           )
//         ) : (
//           <p className="text-sm !font-poppins">
//             {isDate ? formatDate(detail) : detail}
//           </p>
//         )}
//       </div>

//       {isEditing ? (
//         <Button
//           type="btn2"
//           padding="padding3"
//           hover="hover2"
//           onClick={handleSave}
//         >
//           Save
//         </Button>
//       ) : (
//         <Button
//           type="btn2"
//           padding="padding3"
//           hover="hover2"
//           onClick={() => setIsEditing(true)}
//         >
//           Update
//         </Button>
//       )}
//     </li>
//   );
// }

// export default Settings;

// latest

// import { useState } from "react";
// import { useAccounts } from "../contexts/AccountsContext";
// import Button from "./Button";

// function Settings() {
//   const { currentAccount } = useAccounts();

//   return (
//     <div className="font-sans">
//       <div>
//         <h1 className="text-2xl font-bold text-blue900 mb-5">Student Info</h1>
//         <ul className="flex flex-col gap-3">
//           <Info
//             label="First name"
//             labelKey="firstname"
//             detail={currentAccount.firstname}
//             id={currentAccount.id}
//           />
//           <Info
//             label="Last name"
//             labelKey="lastname"
//             detail={currentAccount.lastname}
//             id={currentAccount.id}
//           />
//           <Info
//             label="Birth date"
//             labelKey="birthDate"
//             detail={currentAccount.birthDate}
//             id={currentAccount.id}
//           />
//           <Info
//             label="Image"
//             labelKey="image"
//             detail={currentAccount.image}
//             id={currentAccount.id}
//           />
//           <Info
//             label="Address"
//             labelKey="address"
//             detail={currentAccount.address}
//             id={currentAccount.id}
//           />
//           <Info
//             label="Phone Number"
//             labelKey="phoneNumber"
//             detail={currentAccount.phoneNumber}
//             id={currentAccount.id}
//           />
//           <Info
//             label="Email Address"
//             labelKey="emailAddress"
//             detail={currentAccount.emailAddress}
//             id={currentAccount.id}
//           />
//           <Info
//             label="Gender"
//             labelKey="gender"
//             detail={currentAccount.gender}
//             id={currentAccount.id}
//           />
//           {currentAccount.role !== "Admin" && (
//             <Info
//               label="Year"
//               labelKey="year"
//               detail={currentAccount.year}
//               id={currentAccount.id}
//             />
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }

// function Info({ label, labelKey, detail }) {
//   const { updateAccountDetails } = useAccounts();
//   const [isEditing, setIsEditing] = useState(false);
//   const [inputValue, setInputValue] = useState(detail);

//   function handleSave() {
//     updateAccountDetails({ [labelKey]: inputValue });
//     setIsEditing(false);
//   }

//   function handleCancel() {
//     setInputValue(detail);
//     setIsEditing(false);
//   }

//   const genderOptions = ["Male", "Female"];
//   const yearOptions = ["SHS", "College"];

//   const isSelect = labelKey === "gender" || labelKey === "year";
//   const isDate = labelKey === "birthDate";
//   const options = labelKey === "gender" ? genderOptions : yearOptions;
//   const image = labelKey === "image";
//   const number = labelKey === "phoneNumber";
//   // Format date for display (when not editing)
//   function formatDate(dateString) {
//     if (!dateString) return "";
//     const dateObj = new Date(dateString);
//     if (isNaN(dateObj)) return dateString; // fallback if invalid date
//     return dateObj.toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });
//   }

//   return (
//     <li className="flex items-center gap-5 max-w-xl justify-between border-b border-gray-300 last:border-b-0 py-4">
//       <div className="w-full">
//         <h1 className="text-xs font-montserrat font-semibold">{label}</h1>

//         {isEditing ? (
//           isSelect ? (
//             <select
//               className="border p-2 text-sm w-full bg-transparent outline-none"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//             >
//               {options.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           ) : isDate ? (
//             <input
//               className="border p-2 text-sm w-full bg-transparent outline-none"
//               type="date"
//               max={new Date().toISOString().split("T")[0]}
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//             />
//           ) : image ? (
//             <input
//               className="border p-2 text-sm w-full bg-transparent outline-none"
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 if (file) {
//                   setInputValue(`/assets/images/${file.name}`);
//                 }
//                 // base64x //
//                 //                if (file) {
//                 //   const reader = new FileReader();
//                 //   reader.onloadend = () => {
//                 //     setInputValue(reader.result); // this will be a base64 string
//                 //   };
//                 //   reader.readAsDataURL(file);
//                 // }
//               }}
//             />
//           ) : number ? (
//             <input
//               className="border p-1 text-sm w-full"
//               type="tel"
//               maxLength={11}
//               value={inputValue}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, "").slice(0, 11);
//                 setInputValue(value);
//               }}
//             />
//           ) : (
//             <input
//               className="border p-1 text-sm w-full"
//               type="text"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//             />
//           )
//         ) : (
//           <p className="text-sm !font-poppins">
//             {isDate ? formatDate(detail) : detail}
//           </p>
//         )}
//       </div>

//       {isEditing ? (
//         <div className="flex gap-2">
//           <Button
//             className="text-xs font-semibold bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-700 transition-colors shadow-sm min-w-16"
//             onClick={handleSave}
//           >
//             Save
//           </Button>
//           <Button
//             className="text-xs font-semibold bg-red-500 text-white rounded-lg py-2 hover:bg-red-700 transition-colors shadow-sm min-w-16"
//             onClick={handleCancel}
//           >
//             Cancel
//           </Button>
//         </div>
//       ) : (
//         <Button
//           buttonStyleType="btn2"
//           padding="padding3"
//           hover="hover2"
//           onClick={() => setIsEditing(true)}
//         >
//           Update
//         </Button>
//       )}
//     </li>
//   );
// }

// export default Settings;

import { useState } from "react";
import { useAccounts } from "../contexts/AccountsContext";
import Button from "./Button";

function Settings() {
  const { currentAccount } = useAccounts();

  return (
    <div className="font-sans flex justify-center items-start py-10 min-h-screen">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Student Info
        </h1>
        <ul className="flex flex-col gap-4">
          <Info
            label="First name"
            labelKey="firstname"
            detail={currentAccount.firstname}
            id={currentAccount.id}
          />
          <Info
            label="Last name"
            labelKey="lastname"
            detail={currentAccount.lastname}
            id={currentAccount.id}
          />
          <Info
            label="Birth date"
            labelKey="birthDate"
            detail={currentAccount.birthDate}
            id={currentAccount.id}
          />
          <Info
            label="Image"
            labelKey="image"
            detail={currentAccount.image}
            id={currentAccount.id}
          />
          <Info
            label="Address"
            labelKey="address"
            detail={currentAccount.address}
            id={currentAccount.id}
          />
          <Info
            label="Phone Number"
            labelKey="phoneNumber"
            detail={currentAccount.phoneNumber}
            id={currentAccount.id}
          />
          <Info
            label="Email Address"
            labelKey="emailAddress"
            detail={currentAccount.emailAddress}
            id={currentAccount.id}
          />
          <Info
            label="Gender"
            labelKey="gender"
            detail={currentAccount.gender}
            id={currentAccount.id}
          />
          {currentAccount.role !== "Admin" && (
            <Info
              label="Year"
              labelKey="year"
              detail={currentAccount.year}
              id={currentAccount.id}
            />
          )}
        </ul>
      </div>
    </div>
  );
}

function Info({ label, labelKey, detail }) {
  const { updateAccountDetails } = useAccounts();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(detail);

  function handleSave() {
    updateAccountDetails({ [labelKey]: inputValue });
    setIsEditing(false);
  }

  function handleCancel() {
    setInputValue(detail);
    setIsEditing(false);
  }

  const genderOptions = ["Male", "Female"];
  const yearOptions = ["SHS", "College"];
  const isSelect = labelKey === "gender" || labelKey === "year";
  const isDate = labelKey === "birthDate";
  const options = labelKey === "gender" ? genderOptions : yearOptions;
  const image = labelKey === "image";
  const number = labelKey === "phoneNumber";

  function formatDate(dateString) {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return dateString;
    return dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <li className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-200 pb-4 last:border-b-0">
      <div className="w-full md:w-2/3">
        <h1 className="text-sm font-semibold text-gray-600 mb-1">{label}</h1>

        {isEditing ? (
          isSelect ? (
            <select
              className="border rounded-md p-2 text-sm w-full focus:ring-2 focus:ring-blue-300 outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : isDate ? (
            <input
              className="border rounded-md p-2 text-sm w-full focus:ring-2 focus:ring-blue-300 outline-none"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          ) : image ? (
            <input
              className="border rounded-md p-2 text-sm w-full focus:ring-2 focus:ring-blue-300 outline-none"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setInputValue(`/assets/images/${file.name}`);
                }
              }}
            />
          ) : number ? (
            <input
              className="border rounded-md p-2 text-sm w-full focus:ring-2 focus:ring-blue-300 outline-none"
              type="tel"
              maxLength={11}
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 11);
                setInputValue(value);
              }}
            />
          ) : (
            <input
              className="border rounded-md p-2 text-sm w-full focus:ring-2 focus:ring-blue-300 outline-none"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )
        ) : (
          <p className="text-sm text-gray-800">
            {isDate ? formatDate(detail) : detail}
          </p>
        )}
      </div>

      <div className="flex gap-2 md:gap-3 mt-2 md:mt-0">
        {isEditing ? (
          <>
            <Button
              className="text-xs font-semibold bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-colors shadow-sm"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              className="text-xs font-semibold bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-700 transition-colors shadow-sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            buttonStyleType="btn2"
            padding="padding3"
            hover="hover2"
            onClick={() => setIsEditing(true)}
          >
            Update
          </Button>
        )}
      </div>
    </li>
  );
}

export default Settings;
