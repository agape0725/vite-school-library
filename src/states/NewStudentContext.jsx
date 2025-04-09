import { createContext, useContext, useState } from "react";

const NewStudentContext = createContext();

function NewStudentProvider({ children }) {
  const [submitSuccessful, setSubmitSuccessful] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    birthDate: "2000-01-01",
    phoneNumber: "",
    address: "",
    emailAddress: "",
  });
  return (
    <NewStudentContext.Provider
      value={{
        userDetails,
        setUserDetails,
        submitSuccessful,
        setSubmitSuccessful,
      }}
    >
      {children}
    </NewStudentContext.Provider>
  );
}

function useNewStudent() {
  const context = useContext(NewStudentContext);
  if (context === undefined)
    throw new Error("NewStudentContext is used outisde the NewStudentProvider");
  return context;
}

export { NewStudentProvider, useNewStudent };
