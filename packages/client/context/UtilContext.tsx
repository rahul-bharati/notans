import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Service, Web3Storage } from "web3.storage";
import { ProtectedRoutes } from "../constants";
import { selectAuthState, setAuthState } from "../store/authStore";
import { Web3torage_token } from "../utils";

import NotansContractAbi from "../abi/Notans.json";
import { ethers } from "ethers";

const NOTANS_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NOTANS_CONTRACT_ADDRESS;

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
  removeAuth: Function;
}

export const UtilContext = createContext<IUtilContext>({
  connectWallet: () => {},
  storeAuth: () => {},
  getAuth: () => {},
  removeAuth: () => {},
});

export const UtilContextProvider = ({ children }: Props) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");

  const storageClient = new Web3Storage({ token: Web3torage_token } as Service);
  const dispath = useDispatch();

  const isStorageClientValid = async () => {
    try {
      for await (const _ of storageClient.list({ maxResults: 1 })) {
        // any non-error response means the token is legit
        break;
      }
      return true;
    } catch (error: any) {
      // only return false for auth-related errors
      if (error.message.includes("401") || error.message.includes("403")) {
        console.log("invalid token", error.message);
        return false;
      }
    }
  };
  const router = useRouter();
  const authState = useSelector(selectAuthState);

  const { asPath } = router;

  const connectWallet = async () => {
    const { ethereum } = window;
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      setWalletConnected(true);
    } catch (error) {
      console.log(error);
      setCurrentAccount("");
      setWalletConnected(false);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum) {
      window.ethereum.on("disconnect", () => {
        setWalletConnected(false);
        setCurrentAccount("");
      });
    }
  }, []);

  const storeAuth = (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  };

  const getAuth = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
  };

  const removeAuth = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
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

  const getNotansContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      NOTANS_CONTRACT_ADDRESS as string,
      NotansContractAbi.abi,
      signer
    );
    return contract;
  };

  return (
    <UtilContext.Provider
      value={{ connectWallet, storeAuth, getAuth, removeAuth }}
    >
      {children}
    </UtilContext.Provider>
  );
};
