import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useAuthenticate } from '../context/AuthenticateProvider'
import styles from './Dashboard.module.css'
import { notify } from './Login'
import axios from 'axios'
import { useEffect } from 'react'

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
        const { data } = await axios.get('http://dtk.edlant.ir/api/AssetGroups/GetAll', {
            headers: {
                Authorization: `Bearer ${cookies.token}`,
            }
        })

        console.log(data)
    }

    return(
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                <button className={styles.logoutButton} onClick={clickHandler}>خروج</button>
                <button className={styles.logoutButton} onClick={receiveHandler}>دریافت</button>
            </div>
        </div>
    )
}

export default Dashboard