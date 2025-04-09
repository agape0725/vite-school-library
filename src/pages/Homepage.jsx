import PageNav from "../components/PageNav";
import HeroSection from "../components/HeroSection";
import Books from "../components/Books";
import Steps from "../components/Steps";
import Accordion from "../components/Accordion";
import Events from "../components/Events";
import Footer from "../components/Footer";

function Homepage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageNav />
      <HeroSection />
      <Books />
      <Steps />
      <Events id="events" />
      <Accordion />
      <Footer className="mt-auto" />
    </div>
  );
}

export default Homepage;
