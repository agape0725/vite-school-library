import { useEffect } from "react";
import { useAccounts } from "../contexts/AccountsContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAccounts();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;

// import { Navigate } from "react-router-dom";
// import { useAccounts } from "../contexts/AccountsContext";

// function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useAccounts();

//   if (!isAuthenticated) {
//     // Immediately redirect if not authenticated
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;
