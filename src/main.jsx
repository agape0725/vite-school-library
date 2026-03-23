import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AccountProvider } from "./contexts/AccountsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AccountProvider>
      <App />
    </AccountProvider>
  </StrictMode>
);

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { HashRouter } from "react-router-dom"; // <-- import HashRouter
// import "./index.css";
// import App from "./App.jsx";
// import { AccountProvider } from "./contexts/AccountsContext";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AccountProvider>
//       <HashRouter>
//         <App />
//       </HashRouter>
//     </AccountProvider>
//   </StrictMode>
// );
