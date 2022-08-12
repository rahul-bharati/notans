import { MouseEventHandler } from "react";
import styles from "./index.module.scss";

const FilledButton = ({
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
          ? `${styles["filled-button-full"]}`
          : `${styles["filled-button"]}`
      }
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default FilledButton;
