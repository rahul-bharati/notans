import { useRouter } from "next/router";

import Link from "next/link";
import Image from "next/image";

import styles from "./index.module.scss";
import NotansLogoWhite from "../../images/notans-logo-white.png";
import NotansLogoGradient from "../../images/notans-logo-gradient.png";
import FilledButton from "../Button/FilledButton";
import OutlineButton from "./../Button/OutlineButton";
import { useContext, useEffect, useState } from "react";
import { UtilContext } from "../../context/UtilContext";
import { useDispatch } from "react-redux";
import { setUserState } from "../../store/userStore";
import { setAuthState } from "../../store/authStore";

const Navbar = () => {
  const { getAuth, removeAuth } = useContext(UtilContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const { asPath } = router;
  const isHome = asPath === "/";
  const [isAuthenticated, setIsAuthenticated] = useState("");

  useEffect(() => {
    setIsAuthenticated(getAuth());
  }, [getAuth]);

  const goToLogin = () => {
    router.push("/login");
  };

  const goToSignup = () => {
    router.push("/sign-up");
  };

  const handleLogout = () => {
    removeAuth();
    dispatch(setUserState({ email: "", uid: "" }));
    dispatch(setAuthState(true));
    router.push("/login");
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
          {isHome && isAuthenticated && (
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
          {asPath === "/login" && !isAuthenticated && (
            <li>
              <FilledButton title="Sign Up" onClick={goToSignup} />
            </li>
          )}
          {asPath === "/sign-up" && !isAuthenticated && (
            <li>
              <FilledButton title="Login" onClick={goToLogin} />
            </li>
          )}

          {isAuthenticated && (
            <li>
              <FilledButton title="Log out" onClick={handleLogout} />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
