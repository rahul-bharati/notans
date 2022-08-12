import type { NextPage } from "next";
import Navbar from "./../../components/Navbar/index";
import Input from "./../../components/Input/Input";

import styles from "./index.module.scss";

import EmailLogo from "../../images/email.svg";
import PasswordLogo from "../../images/lock.svg";
import FilledButton from "../../components/Button/FilledButton";
import Link from "next/link";

const Login: NextPage = () => {
  return (
    <div className="container-fluid">
      <div className="container mx-auto mt-large">
        <div className="form-container">
          <h2 className="heading__primary text-center">Login</h2>
          <div className="auth-container mx-auto">
            <div
              className={`${styles["input-container"]} md:my-[10px] lg:my-[16px]`}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                icon={EmailLogo}
              />
            </div>
            <div
              className={`${styles["input-container"]} md:my-[10px] lg:my-[16px] md:mb-[30px] lg:mb-[40px]`}
            >
              <Input
                type="password"
                placeholder="Enter your password"
                icon={PasswordLogo}
              />
            </div>
            <FilledButton title="Login" type="full" />
          </div>
          <span className="already-text">
            Already have an account?{" "}
            <Link href="/login" passHref>
              <a className="already-link">Login</a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
