import type { NextPage } from "next";
import Link from "next/link";

import Input from "./../components/Input/Input";

import EmailLogo from "./../images/email.svg";
import PasswordLogo from "./../images/lock.svg";
import FilledButton from "./../components/Button/FilledButton";
import SocialButton from "./../components/Button/SocialButton";

import { FcGoogle } from "react-icons/fc";

const Login: NextPage = () => {
  return (
    <div className="container-fluid">
      <div className="container mx-auto mt-large">
        <div className="form-container">
          <h2 className="heading__primary text-center">Login</h2>
          <div className="auth-container mx-auto">
            <div className={`input-container md:my-[10px] lg:my-[16px]`}>
              <Input
                type="email"
                placeholder="Enter your email"
                icon={EmailLogo}
              />
            </div>
            <div
              className={`input-container md:my-[10px] lg:my-[16px] md:mb-[30px] lg:mb-[40px]`}
            >
              <Input
                type="password"
                placeholder="Enter your password"
                icon={PasswordLogo}
              />
            </div>
            <FilledButton title="Login" type="full" />
          </div>
          <p className="already-text mt-[32px]">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" passHref>
              <a className="already-link">Sign Up</a>
            </Link>
          </p>
          <div className="or-div">
            <div className="divider"></div>
            <span className="or-text">OR</span>
            <div className="divider"></div>
          </div>
          <div className="social-icons-container">
            <SocialButton title="Continue with Google" icon={<FcGoogle />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
