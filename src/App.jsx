import { AccountProvider } from "./contexts/AccountsContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import BookScanner from "./pages/scanner/BookScanner";
import ScannedBook from "./pages/scanner/ScannedBook";
import ScannerLayout from "./pages/scanner/ScannerLayout";
import Library from "./pages/LibraryLayout";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPanel";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Signup from "./pages/Signup";
import SignupForm from "./components/SignupForm";
import NewUserForm from "./components/NewUserForm";
import ViewBook from "./components/ViewBook";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import LentBooks from "./components/admin/LentBooks";
import LostBooks from "./components/admin/LostBooks";
import RequestingForAdmin from "./components/admin/RequestingForAdmin";
import TransactionHistory from "./components/admin/TransactionHistory";
import StudentBorrowHistory from "./components/StudentBorrowHistory";
import UserRequest from "./components/admin/UserRequest";
import ManageBooks from "./components/ManageBooks";

import "./App.css";

function App() {
  return (
    <Router basename="/vite-school-library/">
      <Routes>
        <Route index element={<Homepage />} />

        <Route
          path="scan"
          element={
            <ProtectedRoute>
              <ScannerLayout />
            </ProtectedRoute>
          }
        >
          {/* default route shows the scanner */}
          <Route index element={<BookScanner />} />

          {/* optional: navigate to book-found after scan */}
          <Route path="book-scan" element={<BookScanner />} />
          <Route path="book-found" element={<ScannedBook />} />
        </Route>
        <Route
          path="library"
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        >
          <Route path=":id" element={<ViewBook />} />
        </Route>
        <Route
          path="account"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="panel" element={<AdminPanel />} />
          <Route path="admin-request" element={<RequestingForAdmin />} />
          <Route path="manage" element={<ManageBooks />} />
          <Route path="request" element={<UserRequest />} />
          <Route path="lent" element={<LentBooks />} />
          <Route path="lost" element={<LostBooks />} />
          <Route path="history" element={<TransactionHistory />} />
          <Route path="borrow-history" element={<StudentBorrowHistory />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />}>
          <Route index element={<SignupForm />} />
          <Route path="new-user" element={<NewUserForm />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

// import { Routes, Route, Navigate } from "react-router-dom";
// import Homepage from "./pages/Homepage";
// import BookScanner from "./pages/scanner/BookScanner";
// import ScannedBook from "./pages/scanner/ScannedBook";
// import ScannerLayout from "./pages/scanner/ScannerLayout";
// import Library from "./pages/LibraryLayout";
// import Login from "./pages/Login";
// import DashboardLayout from "./pages/DashboardLayout";
// import Dashboard from "./components/Dashboard";
// import AdminPanel from "./components/AdminPanel";
// import Profile from "./components/Profile";
// import Settings from "./components/Settings";
// import Signup from "./pages/Signup";
// import SignupForm from "./components/SignupForm";
// import NewUserForm from "./components/NewUserForm";
// import ViewBook from "./components/ViewBook";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PageNotFound from "./pages/PageNotFound";
// import LentBooks from "./components/admin/LentBooks";
// import LostBooks from "./components/admin/LostBooks";
// import TransactionHistory from "./components/admin/TransactionHistory";
// import UserRequest from "./components/admin/UserRequest";
// import ManageBooks from "./components/ManageBooks";

// import "./App.css";

// function App() {
//   return (
//     <Routes>
//       <Route index element={<Homepage />} />

//       <Route
//         path="scan"
//         element={
//           <ProtectedRoute>
//             <ScannerLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<BookScanner />} />
//         <Route path="book-scan" element={<BookScanner />} />
//         <Route path="book-found" element={<ScannedBook />} />
//       </Route>

//       <Route
//         path="library"
//         element={
//           <ProtectedRoute>
//             <Library />
//           </ProtectedRoute>
//         }
//       >
//         <Route path=":id" element={<ViewBook />} />
//       </Route>

//       <Route
//         path="account"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Navigate replace to="dashboard" />} />
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="settings" element={<Settings />} />
//         <Route path="panel" element={<AdminPanel />} />
//         <Route path="manage" element={<ManageBooks />} />
//         <Route path="request" element={<UserRequest />} />
//         <Route path="lent" element={<LentBooks />} />
//         <Route path="lost" element={<LostBooks />} />
//         <Route path="history" element={<TransactionHistory />} />
//       </Route>

//       <Route path="login" element={<Login />} />
//       <Route path="signup" element={<Signup />}>
//         <Route index element={<SignupForm />} />
//         <Route path="new-user" element={<NewUserForm />} />
//       </Route>
//       <Route path="*" element={<PageNotFound />} />
//     </Routes>
//   );
// }

// export default App;
