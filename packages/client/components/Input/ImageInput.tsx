import Image from "next/image";
import styles from "./index.module.scss";

import ProfileImage from "../../images/default-profile.png";
import { ChangeEventHandler, useEffect, useState } from "react";

const ImageInput = ({
  isEdit = false,
  value,
  onChange,
}: {
  isEdit?: boolean;
  value?: any;
  onChange?: ChangeEventHandler;
}) => {
  const [imageUrl, setImageUrl] = useState<undefined | any>(undefined);
  const [file, setFile] = useState();
  useEffect(() => {
    if (isEdit && value) setImageUrl(value);
  }, []);

  useEffect(() => {
    handleImageChange();
  }, [value]);

  const handleImageChange = () => {
    if (value) {
      setImageUrl(URL.createObjectURL(value));
      setFile(value);
    } else {
      setImageUrl(undefined);
    }
  };
  return (
    <label className={`${styles["input-image-container"]}`}>
      <div className={`${styles["image-container"]}`}>
        <Image
          src={imageUrl ? imageUrl : ProfileImage}
          height={166}
          width={166}
          alt="profile"
          objectFit="cover"
        />
      </div>
      <div className={`${styles["image-input-text"]}`}>
        {isEdit ? "Change Photo" : "Add photo"}
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </label>
  );
};
export default ImageInput;
