import spinner from "../assets/svg/spinner.svg";

function Loader({ size = "w-12" }) {
  return <img className={`${size} mx-auto my-5`} src={spinner} alt="loading" />;
}

export default Loader;
