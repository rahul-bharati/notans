import Image from "next/image";
import FilledButton from "../components/Button/FilledButton";
import Input from "../components/Input/Input";

import defaultProfile from "../images/default-profile.jpg";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="container mx-auto mt-large">
        <div className="form-container pay-container">
          <div className="auth-container mx-auto profile-margin">
            <div className="profile-container">
              <div className="image-container">
                <Image
                  src={defaultProfile}
                  height={166}
                  width={166}
                  objectFit="cover"
                  alt="Rahul"
                />
              </div>
              <div className="profile-name">Rahul</div>
              <div className="profile-username profile-mb-small">@rahul</div>
            </div>
            <div className={`input-container md:my-[10px]`}>
              <div className="title-text">Your Wallet address</div>
              <div className="text-wallet-address">
                kkwa13jihb4kvisb r39vbwqbe4jwc65kvwc
              </div>
            </div>
            <FilledButton title="Share" type="full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
