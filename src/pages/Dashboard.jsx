import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useAuthenticate } from '../context/AuthenticateProvider'
import styles from './Dashboard.module.css'
import { notify } from './Login'
import axios from 'axios'
import { useEffect } from 'react'
import AddAsset from '../components/AddAsset'

const Dashboard = () => {
    const [cookies, , removeCookie] = useCookies(['token']);
    const { dispatch } = useAuthenticate()
    const navigate = useNavigate();
    
    useEffect(() => {
        // const fetchAssetsGroups = async () => {
        //     try {
        //         const { data } = await axios.get('http://dtk.edlant.ir/api/AssetGroups/GetAll', {
        //             headers: {
        //                 "Authorization": `Bearer ${cookies.token}`
        //             }
        //         })
        //         console.log(data)
        //     } catch(err) {
        //         console.log(err)
        //     }
        // }
        // fetchAssetsGroups()
    }, [])

    const clickHandler = () => {
        removeCookie('token', { path: '/' });
        dispatch({ type: "AUTHENTICATE", payload: false })
        notify('با موفقیت خارج شدید', true)
        navigate('/', {
            replace: true,
        })
    }

    const receiveHandler = async () => {
        try {
            const { data: assetGroup } = await axios.get('http://dtk.edlant.ir/api/AssetGroups/GetAll', {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                }
            })
            assetGroup.data.forEach(item => console.log(item))

            const { data: asset } = await axios.get('http://dtk.edlant.ir/api/Assets/GetAll', {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                }
            })
            asset.data.forEach(item => console.log(item))
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                <button className={styles.logoutButton} onClick={clickHandler}>خروج</button>
                <button className={styles.logoutButton} onClick={receiveHandler}>دریافت</button>
            </div>
            <AddAsset />
        </div>
    )
}

export default Dashboard