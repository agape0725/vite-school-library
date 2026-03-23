import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import stackBookImage from "../assets/images/stack-book-1.png";
import { Outlet } from "react-router-dom";
import Chatbot from "../components/Chatbot";
import { useAccounts } from "../contexts/AccountsContext";

function DashboardLayout() {
  const { isAuthenticated } = useAccounts();

  return (
    <div className="flex flex-col min-h-screen relative">
      <PageNav />

      <main className="relative flex-1">
        <div
          className="absolute top-0 right-0 w-full h-full bg-no-repeat bg-right bg-fixed opacity-10 bg-cover md:bg-contain z-[-1]"
          style={{ backgroundImage: `url(${stackBookImage})` }}
        />

        <div className="relative z-10 m-8">
          <Outlet />
        </div>
      </main>
      {isAuthenticated && <Chatbot />}
      <Footer />
    </div>
  );
}

export default DashboardLayout;
