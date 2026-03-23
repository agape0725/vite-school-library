import PageNav from "../components/PageNav";
import Books from "../components/Books";
import { Outlet } from "react-router-dom";
import stackBookImage from "../assets/images/open-book.png";

function Library() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <PageNav bgColor="bg-orange100" fontColor="text-white" />

      <main className="relative flex-1">
        {/* Background image */}
        <div
          className="absolute bottom-2 right-14 w-[80vh] h-[50vh] bg-no-repeat bg-right-bottom opacity-10 lg:opacity-20 z-[-1]"
          style={{
            backgroundImage: `url(${stackBookImage})`,
            backgroundSize: "contain",
          }}
        />

        {/* Main content */}
        <Books />
        <Outlet />
      </main>
    </div>
  );
}

export default Library;
