import styles from "./index.module.scss";

const OutlineButton = ({ title }: { title: string }) => {
  return <button className={`${styles["outline-button"]}`}>{title}</button>;
};

export default OutlineButton;
