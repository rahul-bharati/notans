import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import FilledButton from "../components/Button/FilledButton";
import Loader from "../components/Loader";
import { UtilContext } from "../context/UtilContext";

import { fetchRecord } from "../services/firebase";
import { shortenAddress } from "../utils/shortenAddress";

const Dashboard = () => {
  const { getAuth, getNotansContract, walletAddress, connectWallet } =
    useContext(UtilContext);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>();
  const [address, setAddress] = useState("");
  const [profileUri, setProfileUri] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const fetchUserdata = async () => {
    setIsLoading(true);
    try {
      const { username } = (await fetchRecord(user?.uid)) as any;
      const notansContract = getNotansContract();
      const contractUser = await notansContract.get_user_address(username);
      setAddress(contractUser.recipient_address);
      setUsername(contractUser.username);
      setProfileUri(contractUser.profile_uri);
      setName(contractUser.name);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const authJson = getAuth();
    if (authJson) {
      setUser(JSON.parse(authJson));
    }
  }, [getAuth]);

  useEffect(() => {
    if (user?.uid && walletAddress) {
      fetchUserdata();
    }
  }, [user, walletAddress]);

  useEffect(() => {
    if (!walletAddress) {
      connectWallet();
    }
  }, [walletAddress, connectWallet]);

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
                    alt={name}
                  />
                </div>
                <div className="profile-name">{name}</div>
                <div className="profile-username profile-mb-small">
                  @{username}
                </div>
              </div>
              <div className={`input-container md:my-[10px]`}>
                <div className="title-text">Your Wallet address</div>
                <div className="text-wallet-address">
                  {shortenAddress(address)}
                </div>
              </div>
              <FilledButton title="Share" type="full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
