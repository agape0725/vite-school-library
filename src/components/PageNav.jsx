import { useEffect, useRef, useState } from "react";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import Nav from "./Nav";
import LoginNav from "./LoginNav";
import UserAvatar from "./UserAvatar";
import BurgerIcon from "./BurgerIcon";
import Overlay from "./Overlay";
import rightArrow from "../assets/icons/right-arrow.png";
import CurrentUser from "./CurrentUser";
import { useAccounts } from "../contexts/AccountsContext";
import { useMediaQuery } from "../contexts/useMediaQuery";
import { useNavigate } from "react-router-dom";

function PageNav({ bgColor = "bg-dirtyWhite", fontColor = "text-blue900" }) {
  const [openNav, setOpenNav] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isAuthenticated, logout } = useAccounts();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const navigate = useNavigate();
  const avatarRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (isMobile) {
      setShowUserMenu(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !avatarRef.current?.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    if (isAuthenticated) {
      logout();
      setShowUserMenu(false);
      navigate("login");
    }
  };

  const handleCloseNavAndMenu = () => {
    setOpenNav(false);
    setShowUserMenu(false);
  };

  return (
    <>
      {openNav && (
        <Overlay
          opacity={"opacity-80"}
          zIndex={"z-20"}
          onClick={() => setOpenNav(false)}
        />
      )}
      <div className={`${styles.nav} ${bgColor}`}>
        <Logo widthSize="w-12 md:w-16" />
        <div
          className={`${
            openNav ? "w-64 translate-x-0" : "w-0 translate-x-full"
          }`}
        >
          <img
            className="absolute w-5 md:hidden cursor-pointer left-3"
            src={rightArrow}
            alt="arrow-icon"
            onClick={() => setOpenNav(false)}
          />
          <ul className={`${openNav ? "block" : "hidden"}`}>
            <Nav
              fontSize="text-6xl md:text-xs"
              fontColor={`text-black md:${fontColor}`}
              flexDirection="flex-col md:flex-row"
              to
            />
            {isAuthenticated && (
              <CurrentUser
                handleClickNav={handleCloseNavAndMenu}
                visibility={"flex md:hidden"}
                onHandleLogout={handleLogout}
                menuRef={menuRef}
              />
            )}
            {isAuthenticated ? (
              <div ref={avatarRef}>
                <UserAvatar onClick={() => setShowUserMenu(!showUserMenu)} />
              </div>
            ) : (
              <LoginNav />
            )}
          </ul>
        </div>
        <BurgerIcon openNav={openNav} onHandleNav={() => setOpenNav(true)} />
      </div>
      {showUserMenu && isAuthenticated && (
        <CurrentUser
          handleClickNav={handleCloseNavAndMenu}
          visibility={"hidden md:flex"}
          onHandleLogout={handleLogout}
          menuRef={menuRef}
        />
      )}
    </>
  );
}

export default PageNav;
