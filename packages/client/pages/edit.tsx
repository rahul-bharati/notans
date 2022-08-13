import type { NextPage } from "next";
import Input from "../components/Input/Input";

import FilledButton from "../components/Button/FilledButton";
import ImageInput from "./../components/Input/ImageInput";
import OutlineButton from "./../components/Button/OutlineButton";

import defaultProfile from "../images/default-profile.jpg";

const Create: NextPage = () => {
  return (
    <div className="container-fluid">
      <div className="container mx-auto mt-large">
        <div className="form-container">
          <h2 className="heading__primary text-center">Edit your page</h2>
          <div className="auth-container mx-auto">
            <div className={`input-container md:my-[10px] mx-auto`}>
              <ImageInput isEdit={true} value={defaultProfile} />
            </div>
            <div className={`input-container md:my-[10px]`}>
              <Input type="text" placeholder="Enter your name" />
            </div>
            <div className={`input-container md:my-[10px]`}>
              <Input type="text" placeholder="Enter an username" />
            </div>
            <div className="flex items-center justify-space-between">
              <div className="w-1/2 mr-[10px]">
                <FilledButton title="Save" type="full" />
              </div>
              <div className="w-1/2">
                <OutlineButton title="Cancel" type="full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
