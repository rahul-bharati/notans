import Image from "next/image";

import styles from "./index.module.scss";
import ShowPasswordLogo from "../../images/show-password.svg";
import { useEffect, useState } from "react";

const Input = ({
  placeholder,
  type,
  icon,
}: {
  placeholder: string;
  type: string;
  icon?: any;
}) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleShowPassword = () => {
    setPasswordIsVisible(!passwordIsVisible);
  };

  useEffect(() => {
    passwordIsVisible && type === "password"
      ? setInputType("text")
      : setInputType(type);
  }, [passwordIsVisible, type]);

  return (
    <div className={styles["input-container"]}>
      {icon && (
        <span className={styles["input-logo"]}>
          <Image src={icon} alt={type} height={28} width={28} />
        </span>
      )}
      <input
        type={inputType}
        placeholder={placeholder}
        className={styles["input"]}
      />
      <span
        className={`${styles["input-logo"]} ${type !== "password" && "hidden"}`}
        style={{ cursor: "pointer" }}
        onClick={handleShowPassword}
      >
        <Image src={ShowPasswordLogo} alt={type} height={28} width={28} />
      </span>
    </div>
  );
};

export default Input;
