import { createContext, useContext, useState } from "react";
import data from "../../data/db.json";

const AccountContext = createContext();

function AccountProvider({ children }) {
  const [accounts, setAccounts] = useState(data.accounts);

  return (
    <AccountContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </AccountContext.Provider>
  );
}

function useAccounts() {
  const context = useContext(AccountContext);
  if (context === undefined)
    throw new Error("AccountContext is used outside the AccountProvider");
  return context;
}

export { AccountProvider, useAccounts };
