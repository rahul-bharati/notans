import type { NextPage } from "next";
import Link from "next/link";

import { getErrorMessage, validateEmail } from "../utils";
import { setAuthState } from "../store/authStore";
import { setUserState } from "../store/userStore";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UtilContext } from "../context/UtilContext";

import Input from "./../components/Input/Input";

import EmailLogo from "./../images/email.svg";
import PasswordLogo from "./../images/lock.svg";
import FilledButton from "./../components/Button/FilledButton";
import SocialButton from "./../components/Button/SocialButton";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "../services/firebase";
import Loader from "../components/Loader";

const Login: NextPage = () => {
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

  const handleSignIn = async () => {
    setIsLoading(true);
    const isValid = validateForm();
    try {
      if (isValid) {
        const user = await signIn(email, password);
        dispatch(setUserState({ email: user.email, uid: user.uid }));
        dispatch(setAuthState(true));
        storeAuth(await user.getIdToken());
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
            <h2 className="heading__primary text-center">Login</h2>
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
              <FilledButton title="Login" type="full" onClick={handleSignIn} />
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
    </>
  );
};

export default Login;
