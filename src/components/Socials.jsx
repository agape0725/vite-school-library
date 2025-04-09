import styles from "./Socials.module.css";
import facebook from "../assets/icons/facebook.png";
import instagram from "../assets/icons/instagram.png";
import twitter from "../assets/icons/twitter.png";

function Socials() {
  return (
    <ul className={styles.socials}>
      <li>
        <a href="#">
          <img src={facebook} alt="facebook" />
        </a>
      </li>
      <li>
        <a href="#">
          <img src={instagram} alt="instagram" />
        </a>
      </li>
      <li>
        <a href="#">
          <img src={twitter} alt="twitter" />
        </a>
      </li>
    </ul>
  );
}

export default Socials;
