import burgerIcon from "../assets/icons/burger-bar.png";

function BurgerIcon({ openNav, onHandleNav }) {
  return (
    <menu onClick={onHandleNav} className="block md:hidden cursor-pointer">
      {!openNav && (
        <img className="w-6" src={!openNav && burgerIcon} alt="burger-icon" />
      )}
    </menu>
  );
}

export default BurgerIcon;
