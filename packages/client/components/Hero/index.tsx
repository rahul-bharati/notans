import { NextComponentType } from "next";
import styles from "./index.module.scss";
import FilledButton from "./../Button/FilledButton";
import Navbar from "../Navbar";

const Hero: NextComponentType = () => {
  return (
    <div className="Hero min-h-[100vh]">
      <Navbar />
      <div className="container-fluid h-full min-h-[60vh] flex items-center justify-center">
        <div className="hero-container max-w-[970px] flex flex-col items-center h-4/5">
          <h2 className={`${styles["hero-heading"]} text-white text-center`}>
            No More Copying and Pasting of Long Adresses
          </h2>
          <span className={`${styles["hero-sub-head"]} text-center`}>
            Create a an ID that allows anyone to easily send you tokens
          </span>
          <div className={`${styles["input-container"]} text-center`}>
            <span className={`${styles["link-input"]}`}>
              https://notans.me/
            </span>
            <input
              type="text"
              placeholder="username"
              className={`${styles["username-input"]}`}
            />
            <FilledButton title="Get Started" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
