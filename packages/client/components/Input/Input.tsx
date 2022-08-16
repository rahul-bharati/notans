import Image from "next/image";

import styles from "./index.module.scss";
import ShowPasswordLogo from "../../images/show-password.svg";
import { ChangeEventHandler, useEffect, useState } from "react";

const Input = ({
  placeholder,
  type,
  icon,
  value,
  onChange,
}: {
  placeholder: string;
  type: string;
  icon?: any;
  value?: string;
  onChange?: ChangeEventHandler;
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
        value={value}
        onChange={onChange}
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
