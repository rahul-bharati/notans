import type { NextPage } from "next";
import Link from "next/link";

import Input from "../components/Input/Input";

import FilledButton from "../components/Button/FilledButton";
import ImageInput from "./../components/Input/ImageInput";

const Create: NextPage = () => {
  return (
    <div className="container-fluid">
      <div className="container mx-auto mt-large">
        <div className="form-container">
          <h2 className="heading__primary text-center">Create your page</h2>
          <div className="auth-container mx-auto">
            <div className={`input-container md:my-[10px] mx-auto`}>
              <ImageInput />
            </div>
            <div className={`input-container md:my-[10px]`}>
              <Input type="text" placeholder="Enter your name" />
            </div>
            <div className={`input-container md:my-[10px]`}>
              <Input type="text" placeholder="Create an username" />
            </div>
            <div
              className={`input-container md:my-[10px] md:mb-[30px] lg:mb-[40px]`}
            >
              <Input type="text" placeholder="Enter your wallet" />
            </div>
            <FilledButton title="Continue" type="full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
