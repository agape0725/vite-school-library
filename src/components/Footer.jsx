import SchoolDetails from "./SchoolDetails";
import Socials from "./Socials";
import Nav from "./Nav";
import Copyright from "./Copyright";

function Footer() {
  return (
    <footer>
      <div className="flex flex-col gap-3 md:flex-row items-center justify-between bg-orange200 py-2 px-10">
        <SchoolDetails />
        <Socials />
      </div>
      <div className="bg-blue700 py-1 flex flex-col justify-center items-center gap-2.5">
        <Nav
          fontSize="text-sm"
          fontColor="text-dirtyWhite"
          flexDirection="flex-row"
          margin="mt-2"
        />
        <Copyright />
      </div>
    </footer>
  );
}

export default Footer;
