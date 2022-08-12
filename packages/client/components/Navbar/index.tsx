import { useRouter } from "next/router";

import Link from "next/link";
import Image from "next/image";

import styles from "./index.module.scss";
import NotansLogoWhite from "../../images/notans-logo-white.png";
import NotansLogoGradient from "../../images/notans-logo-gradient.png";
import FilledButton from "../Button/FilledButton";
import OutlineButton from "./../Button/OutlineButton";

const Navbar = () => {
  const router = useRouter();
  const { asPath } = router;
  const isHome = asPath === "/";

  const goToLogin = () => {
    router.push("/login");
  };

  const goToSignup = () => {
    router.push("/sign-up");
  };

  return (
    <div className="container mx-auto px-5">
      <nav className={styles.navbar}>
        <Link href="/" passHref>
          <a className="flex items-center">
            <Image src={NotansLogoWhite} alt="Notans" height={60} width={54} />
            <span
              className={`${styles["navbar-brand"]} ${styles["navbar-brand-white"]}`}
            >
              Notans
            </span>
          </a>
        </Link>
        <ul className={`list-none flex items-center ${styles["navbar-list"]}`}>
          {isHome && (
            <>
              <li>
                <Link href="/login" passHref>
                  <a className={styles["navbar-link"]}>Login</a>
                </Link>
              </li>
              <li>
                <FilledButton title="Sign Up" onClick={goToSignup} />
              </li>
            </>
          )}
          {asPath === "/login" && (
            <li>
              <FilledButton title="Sign Up" onClick={goToSignup} />
            </li>
          )}
          {asPath === "/sign-up" && (
            <li>
              <FilledButton title="Login" onClick={goToLogin} />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
