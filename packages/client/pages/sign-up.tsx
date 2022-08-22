import type { NextPage } from "next";
import Link from "next/link";

import Input from "../components/Input/Input";

import EmailLogo from "./../images/email.svg";
import PasswordLogo from "./../images/lock.svg";
import FilledButton from "../components/Button/FilledButton";
import SocialButton from "../components/Button/SocialButton";

import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { validateEmail } from "./../utils/index";
import Loader from "../components/Loader";
import { signUp } from "./../services/firebase";
import { getErrorMessage } from "./../utils/auth";
import { useDispatch } from "react-redux";
import { setUserState } from "../store/userStore";
import { useRouter } from "next/router";
import { setAuthState } from "../store/authStore";
import { UtilContext } from "../context/UtilContext";

const SignUp: NextPage = () => {
  const { storeAuth } = useContext(UtilContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const validateForm = () => {
    const errors = [];
    if (!validateEmail(email)) {
      errors.push(1);
      setEmailError("Please enter a valid email");
    } else if (email.length === 0) {
      errors.push(1);
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
    if (password.length === 0) {
      errors.push(1);
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      errors.push(1);
      setPasswordError("Password must be atlease 6 characters long");
    } else {
      setPasswordError("");
    }
    return errors.length === 0;
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    const isValid = validateForm();
    try {
      if (isValid) {
        const user = await signUp(email, password);
        storeAuth(user);
        router.push("/dashboard");
      }
    } catch (error: any) {
      const errorCode = error.code;
      setAuthError(getErrorMessage(errorCode));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="container-fluid">
        <div className="container mx-auto mt-large">
          <div className="form-container">
            <h2 className="heading__primary text-center">Sign Up</h2>
            <div className="auth-container mx-auto">
              <div className={`input-container md:my-[10px] lg:my-[16px]`}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  icon={EmailLogo}
                  value={email}
                  onChange={(e) =>
                    setEmail((e.target as HTMLInputElement)?.value)
                  }
                />
                <div className="text-red-400">{emailError && emailError}</div>
              </div>
              <div
                className={`input-container md:my-[10px] lg:my-[16px] md:mb-[30px] lg:mb-[40px]`}
              >
                <Input
                  type="password"
                  placeholder="Enter your password"
                  icon={PasswordLogo}
                  value={password}
                  onChange={(e) =>
                    setPassword((e.target as HTMLInputElement)?.value)
                  }
                />
                <div className="text-red-400">
                  {passwordError && passwordError}
                </div>
                <div className="text-red-400">{authError && authError}</div>
              </div>
              <FilledButton
                title="Continue with email"
                type="full"
                onClick={handleSignUp}
              />
            </div>
            <p className="already-text mt-[32px]">
              Already have an account?{" "}
              <Link href="/login" passHref>
                <a className="already-link">Login</a>
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
    </>
  );
};

export default SignUp;
