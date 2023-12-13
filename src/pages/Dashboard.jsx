import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useAuthenticate } from '../context/AuthenticateProvider'
import styles from './Dashboard.module.css'
import { notify } from './Login'
import axios from 'axios'
import { useEffect } from 'react'
import AddAsset from '../components/AddAsset'
import { useAssets } from '../context/AssetsProvider'
import AssetsGroups from '../components/AssetsGroups'
import Loader from '../components/Loader'

const Dashboard = () => {
    const [cookies, , removeCookie] = useCookies(['token']);
    const { dispatch } = useAuthenticate()
    const navigate = useNavigate();
    const { dispatch: dispatchAssets, state } = useAssets();
    
    useEffect(() => {
        const fetchAssetsGroups = async () => {
            dispatchAssets({ type: 'PENDING'})
            try {
                const { data: assetGroupData } = await axios.get('http://dtk.edlant.ir/api/AssetGroups/GetAll', {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    }
                })
    
                const { data: assetData } = await axios.get('http://dtk.edlant.ir/api/Assets/GetAll', {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    }
                })
                dispatchAssets({ type: 'FULFILLED', payload: { assetsGroupsData: assetGroupData.data, assetsData: assetData.data }})
            } catch(err) {
                dispatchAssets({ type: 'REJECTED', payload: err.message })
                notify('خطا در داده‌های دریافتی')
            }
        }
        fetchAssetsGroups()
    }, [])

    const clickHandler = () => {
        removeCookie('token', { path: '/' });
        dispatch({ type: "AUTHENTICATE", payload: false })
        notify('با موفقیت خارج شدید', true)
        navigate('/', {
            replace: true,
        })
    }
    if(state.isLoading) return <Loader />

    return(
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                        <button className={styles.logoutButton} onClick={clickHandler}>خروج</button>
                    </div>
                    <AddAsset />
                    <AssetsGroups />
        </div>
    )
}

export default Dashboard