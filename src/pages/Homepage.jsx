import PageNav from "../components/PageNav";
import HeroSection from "../components/HeroSection";
import LibraryStats from "../components/LibraryStats";
import Books from "../components/Books";
import BorrowStats from "../components/BorrowStats";
import Steps from "../components/Steps";
import Accordion from "../components/Accordion";
import Events from "../components/Events";
import Chatbot from "../components/Chatbot";
import Footer from "../components/Footer";
import { useAccounts } from "../contexts/AccountsContext";

function Homepage() {
  const { isAuthenticated } = useAccounts();

  return (
    <div className="flex flex-col min-h-screen">
      <PageNav />
      <HeroSection />
      <LibraryStats />
      <Books shadowStyle="shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,0.25)]" />
      <BorrowStats />
      <Steps />
      <Events id="events" />
      <Accordion />
      {isAuthenticated && <Chatbot />}

      <Footer className="mt-auto" />
    </div>
  );
}

export default Homepage;
