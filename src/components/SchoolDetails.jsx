import Logo from "./Logo";
import styles from "./SchoolDetails.module.css";
import location from "../assets/icons/location.png";
import phone from "../assets/icons/phone.png";
import email from "../assets/icons/email.png";

function SchoolDetails() {
  return (
    <div className={`${styles.schoolDetailsContainer}`}>
      <Logo widthSize="w-24" />

      <ul>
        <li>
          <img src={location} alt="location" />
          <span>2578 Legarda St, Sampaloc, Manila, 1008 Metro Manila</span>
        </li>
        <li>
          <img src={phone} alt="phone" />
          <span>(02) 8736 2894</span>
        </li>
        <li>
          <img src={email} alt="email" />
          <span>abemanila@ama.com</span>
        </li>
      </ul>
    </div>
  );
}

export default SchoolDetails;
