import Link from "next/link";
import Image from "next/image";

import styles from "./index.module.scss";
import NotansLogoWhite from "../../images/notans-logo-white.png";
import FilledButton from "../Button/FilledButton";

const Navbar = () => {
  return (
    <div className="container mx-auto">
      <nav className={styles.navbar}>
        <Link href="/" passHref>
          <a className="flex items-center">
            <Image src={NotansLogoWhite} alt="Notans" height={60} width={54} />
            <span className={styles["navbar-brand"]}>Notans</span>
          </a>
        </Link>
        <ul className={`list-none flex items-center ${styles["navbar-list"]}`}>
          <li>
            <Link href="/" passHref>
              <a className={styles["navbar-link"]}>Login</a>
            </Link>
          </li>
          <li>
            <FilledButton title="Sign Up" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
