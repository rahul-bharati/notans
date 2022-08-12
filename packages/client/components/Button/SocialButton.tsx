import { MouseEventHandler } from "react";
import styles from "./index.module.scss";

const SocialButton = ({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: JSX.Element;
  onClick?: MouseEventHandler;
}) => {
  return (
    <button className={`${styles["social-button"]}`} onClick={onClick}>
      <div className={`${styles["icon-container"]}`}>{icon}</div>
      <div className={`${styles["text-container"]}`}>{title}</div>
    </button>
  );
};

export default SocialButton;
