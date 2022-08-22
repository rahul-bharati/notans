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
  isWalletConnected: boolean;
  walletAddress: string;
  storageClient: Web3Storage | null;
  getNotansContract: Function;
  isStorageClientValid: Function;
}

export const UtilContext = createContext<IUtilContext>({
  connectWallet: () => {},
  storeAuth: () => {},
  getAuth: () => {},
  removeAuth: () => {},
  isWalletConnected: false,
  walletAddress: "",
  storageClient: null,
  getNotansContract: () => {},
  isStorageClientValid: () => {},
});

export const UtilContextProvider = ({ children }: Props) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");

  const storageClient = new Web3Storage({ token: Web3torage_token } as Service);

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
      setIsWalletConnected(true);
    } catch (error) {
      console.log(error);
      setCurrentAccount("");
      setIsWalletConnected(false);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum) {
      window.ethereum.on("disconnect", () => {
        setIsWalletConnected(false);
        setCurrentAccount("");
      });
    }
  }, []);

  const storeAuth = (userdata: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("notan_user", JSON.stringify(userdata));
    }
  };

  const getAuth = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("notan_user");
    }
  };

  const removeAuth = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("notan_user");
    }
  };

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
      value={{
        connectWallet,
        storeAuth,
        getAuth,
        removeAuth,
        isWalletConnected,
        walletAddress: currentAccount,
        getNotansContract,
        isStorageClientValid,
        storageClient,
      }}
    >
      {children}
    </UtilContext.Provider>
  );
};
