import library from "../assets/images/library.jpg";
import Overlay from "./Overlay";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useAccounts } from "../contexts/AccountsContext";

function HeroSection() {
  const { isAuthenticated } = useAccounts();

  return (
    <header
      className="relative h-[500px] flex items-center justify-center text-center text-white bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url('${library}')` }}
    >
      <Overlay opacity="bg-opacity-70" />
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold">
          Welcome to <span className="text-orange100">Our Library</span>
        </h1>
        <p className="mt-4 mb-10 text-white text-sm md:text-1xl">
          Discover, Learn, and Explore a World of Knowledge
        </p>
        <Link to={`${isAuthenticated ? "/library" : "/login"}`}>
          <Button buttonStyleType="btn3" padding="padding2" hover="hover3">
            Explore Books
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default HeroSection;
