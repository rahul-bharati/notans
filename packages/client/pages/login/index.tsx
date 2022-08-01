import type { NextPage } from "next";
import Navbar from "./../../components/Navbar/index";
import Input from "./../../components/Input/Input";

import styles from "./index.module.scss";

import EmailLogo from "../../images/email.svg";
import PasswordLogo from "../../images/lock.svg";
import FilledButton from "../../components/Button/FilledButton";

const Login: NextPage = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container mx-auto mt-large">
        <h2 className="heading__primary text-center">Login</h2>
        <div className="auth-container mx-auto">
          <div className={`${styles["input-container"]} my-[16px]`}>
            <Input
              type="email"
              placeholder="Enter your email"
              icon={EmailLogo}
            />
          </div>
          <div className={`${styles["input-container"]} my-[16px] mb-[40px]`}>
            <Input
              type="password"
              placeholder="Enter your password"
              icon={PasswordLogo}
            />
          </div>
          <FilledButton title="Login" type="full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
