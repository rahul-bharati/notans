import styles from "./index.module.scss";

const FilledButton = ({ title }: { title: string }) => {
  return <button className={`${styles["filled-button"]}`}>{title}</button>;
};

export default FilledButton;
