import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "../styles/AssetGroup.module.css";
import Asset from "./Asset";
import { displayHandler } from "../utilities/functions";

const AssetGroup = ({ assetGroup }) => {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <div className={styles.container}>
      <div
        className={styles.assetGroup}
        onClick={() => displayHandler(setIsDisplay)}
      >
        <span>{assetGroup.name}</span>
        <IoIosArrowDown
          className={isDisplay ? styles.upArrow : styles.downArrow}
        />
      </div>
      <Asset id={assetGroup.id} isDisplay={isDisplay} />
    </div>
  );
};

export default AssetGroup;
