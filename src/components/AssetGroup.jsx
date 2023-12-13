import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import styles from './AssetGroup.module.css'
import { useAssets } from "../context/AssetsProvider"
import Asset from "./Asset"

const AssetGroup = ({ assetGroup }) => {
    const [isDisplay, setIsDisplay] = useState(false)
    const displayAssetsGroup = () => setIsDisplay(is => !is)
    return(
        <div className={styles.container} onClick={displayAssetsGroup}>
            <div className={styles.assetGroup}>
                <span>{assetGroup.name}</span>
                <IoIosArrowDown className={isDisplay ? styles.upArrow : styles.downArrow} />
            </div>
            <Asset id={assetGroup.id} isDisplay={isDisplay} />
        </div>
    )
}

export default AssetGroup