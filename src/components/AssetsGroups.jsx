import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "../styles/AssetsGroups.module.css";
import { useAssets } from "../context/AssetsProvider";
import AssetGroup from "./AssetGroup";
import { displayHandler } from "../utilities/functions";

const AssetsGroups = () => {
  const [isDisplay, setIsDisplay] = useState(false);
  const { state } = useAssets();
  return (
    <div className={styles.container}>
      <div className={styles.assetContainer}>
        <div
          className={styles.assetTitle}
          onClick={() => displayHandler(setIsDisplay)}
        >
          <span>نمایش گروه‌های دارایی‌ها</span>
          <IoIosArrowDown
            className={isDisplay ? styles.upArrow : styles.downArrow}
          />
        </div>
        <div className={`${isDisplay ? styles.divFlex : styles.divNone}`}>
          {state.assetsGroupsData.map((item) => (
            <AssetGroup key={item.id} assetGroup={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetsGroups;
