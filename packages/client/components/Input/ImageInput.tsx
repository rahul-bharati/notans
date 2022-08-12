import Image from "next/image";
import styles from "./index.module.scss";

import ProfileImage from "../../images/default-profile.png";
import { useState } from "react";

const ImageInput = () => {
  const [imageUrl, setImageUrl] = useState<undefined | any>(undefined);
  const handleOnChange = (e: any) => {
    if (e.target?.files && e.target?.files.length > 0) {
      setImageUrl(URL.createObjectURL(e.target?.files[0]));
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
      <div className={`${styles["image-input-text"]}`}>Add photo</div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleOnChange(e)}
      />
    </label>
  );
};
export default ImageInput;
