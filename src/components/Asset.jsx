import { useAssets } from "../context/AssetsProvider";
import styles from './Asset.module.css'

const Asset = ({ id, isDisplay }) => {
    const { state } = useAssets();
    const assets = state.assetsData.filter(item => item.groupId === id)
    return(
        <div>
            {
                assets.length ?
                assets?.map(item =>(
                    <div className={`${isDisplay ? styles.blockDisplay : styles.noneDisplay}`} key={item.id}>{item.name}</div>
                )) :
                <div className={`${isDisplay ? styles.blockDisplay : styles.noneDisplay}`}>دارایی برای نمایش وجود ندارد</div>
            }
        </div>
    )
}

export default Asset;