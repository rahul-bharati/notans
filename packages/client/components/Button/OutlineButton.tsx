import { MouseEventHandler } from "react";
import styles from "./index.module.scss";

const OutlineButton = ({
  title,
  type,
  onClick,
}: {
  title: string;
  type?: string;
  onClick?: MouseEventHandler;
}) => {
  return (
    <button
      className={
        type === "full"
          ? `${styles["outline-button-full"]}`
          : `${styles["outline-button"]}`
      }
    >
      {title}
    </button>
  );
};

export default OutlineButton;
