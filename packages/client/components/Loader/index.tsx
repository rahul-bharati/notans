import { NextComponentType } from "next";

import styles from "./index.module.scss";

const Loader: NextComponentType = () => {
  return (
    <div className={styles["loader-container"]}>
      <div className={styles["wrapper"]}>
        <span className={styles["dot"]}></span>
        <div className={styles["dots"]}>
          <span className={styles["point"]}></span>
          <span className={styles["point"]}></span>
          <span className={styles["point"]}></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
