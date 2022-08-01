import styles from "./index.module.scss";

const FilledButton = ({ title, type }: { title: string; type?: string }) => {
  return (
    <button
      className={
        type === "full"
          ? `${styles["filled-button-full"]}`
          : `${styles["filled-button"]}`
      }
    >
      {title}
    </button>
  );
};

export default FilledButton;
