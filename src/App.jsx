import { AccountProvider } from "./states/AccountsContext";
import { NewStudentProvider } from "./states/NewStudentContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Library from "./pages/LibraryLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupForm from "./components/SignupForm";
import NewUserForm from "./components/NewUserForm";
import ViewBook from "./components/ViewBook";
import PageNotFound from "./pages/PageNotFound";
import "./App.css";

function App() {
  return (
    <AccountProvider>
      <Router basename="/vite-school-library/">
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="library" element={<Library />}>
            <Route path=":id" element={<ViewBook />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route
            path="signup"
            element={
              <NewStudentProvider>
                <Signup />
              </NewStudentProvider>
            }
          >
            <Route index element={<SignupForm />} />
            <Route path="new-user" element={<NewUserForm />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </AccountProvider>
  );
}

export default App;
