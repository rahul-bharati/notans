import { ethers } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import FilledButton from "../components/Button/FilledButton";
import Input from "../components/Input/Input";
import Loader from "../components/Loader";
import { UtilContext } from "../context/UtilContext";

import defaultProfile from "../images/default-profile.jpg";
import { validateAmount } from "../utils";

const Pay = () => {
  const router = useRouter();
  const { getNotansContract, walletAddress, connectWallet } =
    useContext(UtilContext);
  const { username } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [profileUri, setProfileUri] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");

  const fetchUserdata = async () => {
    setIsLoading(true);
    try {
      const notansContract = getNotansContract();
      const contractUser = await notansContract.get_user_address(username);
      console.log({ contractUser });
      setAddress(contractUser.recipient_address);
      setProfileUri(contractUser.profile_uri);
      setName(contractUser.name);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransfer = async () => {
    const isValid = validateForm();
    if (isValid) {
      setIsLoading(true);
      try {
        if (walletAddress && address) {
          const notansContract = getNotansContract();
          const notansTrans = await notansContract.send_token(
            ethers.utils.formatBytes32String("DAI"),
            parseInt(amount),
            address
          );
          await notansTrans.wait();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validateForm = () => {
    const errors = [];
    // if (amount < 0.01) {
    //   errors.push(1);
    //   setAmountError("Amount shoud be greater than 0");
    // } else if (!validateAmount(amount.toString())) {
    //   errors.push(1);
    //   setAmountError("Username can only contain letters and number");
    // } else {
    //   setAmountError("");
    // }
    return errors.length === 0;
  };

  useEffect(() => {
    if ((username as string)?.length > 0 && walletAddress) {
      fetchUserdata();
    }
  }, [username, walletAddress]);

  useEffect(() => {
    if (!walletAddress) {
      connectWallet();
    }
  }, [connectWallet, walletAddress]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="container-fluid">
        <div className="container mx-auto mt-large">
          <div className="form-container pay-container">
            <div className="auth-container mx-auto profile-margin">
              <div className="profile-container">
                <div className="image-container">
                  <Image
                    src={`https://res.cloudinary.com/demo/image/fetch/${profileUri}`}
                    height={166}
                    width={166}
                    objectFit="cover"
                    alt={username as string}
                  />
                </div>
                <div className="profile-name">{name}</div>
                <div className="profile-username">{name && username}</div>
              </div>
              <div className={`input-container md:my-[10px]`}>
                <Input
                  type="text"
                  placeholder="Enter amount in Matic"
                  value={amount.toString()}
                  onChange={(e) => {
                    setAmount((e.target as HTMLInputElement)?.value);
                  }}
                />
              </div>
              <FilledButton title="Send" type="full" onClick={handleTransfer} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pay;
