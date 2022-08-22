import type { NextPage } from "next";

import Input from "../components/Input/Input";

import FilledButton from "../components/Button/FilledButton";
import ImageInput from "./../components/Input/ImageInput";
import { useContext, useEffect, useState } from "react";
import { UtilContext } from "../context/UtilContext";
import Loader from "../components/Loader";
import { jsonFile, makeGatewayURL, validateUsername } from "../utils";
import { StoragePrefix } from "../constants";
import { Filelike } from "web3.storage";
import { auth } from "../config/firebase";
import {
  checkIfUserExists,
  checkIfUserIsRegistered,
  createRecord,
} from "../services/firebase";
import { useRouter } from "next/router";

const Create: NextPage = () => {
  const {
    isWalletConnected,
    walletAddress,
    connectWallet,
    storageClient,
    getNotansContract,
    getAuth,
  } = useContext(UtilContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [imageVal, setImageVal] = useState("");

  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reqError, setReqError] = useState("");

  const [user, setUser] = useState<any>({});

  const router = useRouter();

  useEffect(() => {
    const authJson = getAuth();
    if (authJson) {
      setUser(JSON.parse(authJson));
    }
  }, [getAuth]);

  useEffect(() => {
    const checkuser = async () => {
      if (user && user.uid) {
        const userRegistered = await checkIfUserIsRegistered(user.uid);
        console.log({ userRegistered });

        if (userRegistered) {
          router.push("/dashboard");
        }
      }
    };
    checkuser();
  }, [user, router]);

  const validateForm = () => {
    const errors = [];
    if (username.length === 0) {
      errors.push(1);
      setUsernameError("Username is required");
    } else if (!validateUsername(username)) {
      errors.push(1);
      setUsernameError("Username can only contain letters and number");
    } else {
      setUsernameError("");
    }
    if (name.length === 0) {
      errors.push(1);
      setNameError("Name is required");
    } else {
      setNameError("");
    }
    return errors.length === 0;
  };

  const handleContinue = async () => {
    if (isWalletConnected) {
      const isValid = validateForm();
      if (isValid) {
        setIsLoading(true);
        try {
          const usernameTaken = await checkIfUserExists(username);
          if (usernameTaken) {
            return setReqError("username already taken!");
          }
          if (!usernameTaken) {
            const uploadName = [
              StoragePrefix,
              username,
              new Date().getTime(),
            ].join("-");
            const metadata = {
              file: (imageVal as unknown as File)?.name,
              username,
              owner: walletAddress,
            };
            const metadataFile = jsonFile("metadata.json", metadata);
            const fileCID = await storageClient?.put(
              [imageVal as unknown as Filelike, metadataFile],
              {
                name: uploadName,
              }
            );
            const metadataGatewayURL = makeGatewayURL(fileCID, "metadata.json");
            const profileGatewayURL = makeGatewayURL(
              fileCID,
              (imageVal as unknown as File)?.name
            );

            const notansContract = getNotansContract();
            const notansTransaction = await notansContract.create_user(
              name,
              username,
              profileGatewayURL
            );
            await notansTransaction.wait();
            await createRecord(user.uid, username, name);
            router.push("/dashboard");
          }
        } catch (error) {
          console.error(error);
          setReqError("Unknown error occured");
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      await connectWallet();
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="container-fluid">
        <div className="container mx-auto mt-large">
          <div className="form-container">
            <h2 className="heading__primary text-center">Create your page</h2>
            <div className="auth-container mx-auto">
              <div className={`input-container md:my-[10px] mx-auto`}>
                <ImageInput
                  value={imageVal}
                  onChange={(e: any) => setImageVal(e.target?.files[0])}
                />
              </div>
              <div className={`input-container md:my-[10px]`}>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    setName((e.target as HTMLInputElement)?.value)
                  }
                />
                <div className="text-red-400">{nameError && nameError}</div>
              </div>
              <div className={`input-container md:my-[10px]`}>
                <Input
                  type="text"
                  placeholder="Create an username"
                  value={username}
                  onChange={(e) =>
                    setUsername((e.target as HTMLInputElement)?.value)
                  }
                />
                <div className="text-red-400">
                  {usernameError && usernameError}
                </div>
              </div>
              <div
                className={`input-container md:my-[10px] md:mb-[30px] lg:mb-[40px]`}
              >
                <Input
                  type="text"
                  placeholder="Enter your wallet"
                  value={walletAddress}
                  disabled
                />
                <div className="text-red-400">{reqError && reqError}</div>
              </div>
              <FilledButton
                title={isWalletConnected ? "Continue" : "Connect Wallet"}
                type="full"
                onClick={handleContinue}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
