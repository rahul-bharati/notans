import Image from "next/image";
import { useRouter } from "next/router";
import FilledButton from "../components/Button/FilledButton";
import Input from "../components/Input/Input";

import defaultProfile from "../images/default-profile.jpg";

const Pay = () => {
  const router = useRouter();
  const { username } = router.query;
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
                  alt={username as string}
                />
              </div>
              <div className="profile-name">Rahul</div>
              <div className="profile-username">{username}</div>
            </div>
            <div className={`input-container md:my-[10px]`}>
              <Input type="text" placeholder="Enter amount in USDC" />
            </div>
            <FilledButton title="Send" type="full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
