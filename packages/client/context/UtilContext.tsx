import { useRouter } from "next/router";
import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRoutes } from "../constants";
import { selectAuthState, setAuthState } from "../store/authStore";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface Props {
  children: JSX.Element;
}

interface IUtilContext {
  connectWallet: Function;
  storeAuth: Function;
  getAuth: Function;
}

export const UtilContext = createContext<IUtilContext>({
  connectWallet: () => {},
  storeAuth: () => {},
  getAuth: () => {},
});

export const UtilContextProvider = ({ children }: Props) => {
  const dispath = useDispatch();

  const router = useRouter();
  const authState = useSelector(selectAuthState);

  const { asPath } = router;

  const connectWallet = () => {};
  const storeAuth = (token: string) => {
    localStorage.setItem("token", token);
  };

  const getAuth = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const token = getAuth();
    if (token) {
      dispath(setAuthState(true));
    } else {
      dispath(setAuthState(false));
    }
  }, [dispath]);

  useEffect(() => {
    if (ProtectedRoutes.includes(asPath) && !getAuth()) {
      router.push("/login");
    }
  }, [asPath, router, authState]);

  return (
    <UtilContext.Provider value={{ connectWallet, storeAuth, getAuth }}>
      {children}
    </UtilContext.Provider>
  );
};
