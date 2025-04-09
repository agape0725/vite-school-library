import { useEffect, useState } from "react";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import Nav from "./Nav";
import LoginNav from "./LoginNav";
import BurgerIcon from "./BurgerIcon";
import Overlay from "./Overlay";
import rightArrow from "../assets/icons/right-arrow.png";

function PageNav() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    if (openNav) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = ""; // Reset overflow on close
    }

    return () => {
      document.body.style.overflow = ""; // Ensure overflow is reset when the component unmounts
    };
  }, [openNav]);
  const openBurgerMenu = () => {
    setOpenNav(true);
  };

  const closeBurgerMenu = () => {
    setOpenNav(false);
  };

  return (
    <>
      {openNav && (
        <Overlay
          opacity={"opacity-80"}
          zIndex={"z-20"}
          onClick={closeBurgerMenu}
        />
      )}
      <div className={styles.nav}>
        <Logo widthSize="w-16" />
        <div
          className={`${
            openNav ? "w-64 translate-x-0" : "w-0 translate-x-full"
          }`}
        >
          <img src={rightArrow} alt="arrow-icon" onClick={closeBurgerMenu} />
          <ul className={`${openNav ? "block" : "hidden"} `}>
            <Nav
              fontSize="text-6xl md:text-xs"
              fontColor="text-black md:text-blue900"
              flexDirection="flex-col md:flex-row"
              to
            />
            <LoginNav />
          </ul>
        </div>
        <BurgerIcon openNav={openNav} onHandleNav={openBurgerMenu} />
      </div>
    </>
  );
}

export default PageNav;
