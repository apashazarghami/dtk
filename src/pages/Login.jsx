import { useEffect, useState } from "react"
import TextInput from "../components/TextInput"
import axios from 'axios'
import styles from './Login.module.css'
import logoImage from '../assets/dtk.jpg'
import toast from "react-hot-toast"
import { useAuthenticate } from "../context/AuthenticateProvider"
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom"

export const notify = (message, isSuccess) => isSuccess ? toast.success(message) : toast.error(message)

const Login = () => {
    const [information, setInformation] = useState({
        username: '',
        password: ''
    })
    const [cookies, setCookies] = useCookies(['token'])
    const navigate = useNavigate()
    const { dispatch, state } = useAuthenticate();

    useEffect(() => {
        cookies?.token && dispatch({ type: 'AUTHENTICATE', payload: true })
    }, [])

    const { username, password } = information

    const changeHandler = event => {
        setInformation(prevInformation => ({
            ...prevInformation,
            [event.target.name] : event.target.value
        }))
    }

    const clickHandler = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.get(`http://dtk.edlant.ir/api/Token/GetToken/${username}/${password}`);
            const { isAuthenticated, token } = data;
            if(!isAuthenticated) return(notify('ورود شما با خطا مواجه شد'))
            dispatch({ type: 'AUTHENTICATE', payload: isAuthenticated })
            setCookies('token', token, { path: '/', maxAge: 3600 });
            navigate('dashboard', {
                replace: true
            })
            return notify('با موفقیت وارد شدید', true)
        } catch (err) {
            notify('ورود شما با خطا مواجه شد')
        } finally {
            setInformation({ username: '', password: '' })
        }
    }

    return(
        <div className={styles.container}>
            <img className={styles.logoImage} src={logoImage} alt="درخشان توپال کارمانیا" loading="lazy" />
            <form onSubmit={clickHandler} className={styles.form}>
                <TextInput {...{ value: username, name: 'username', setInformation, type: 'text', placeholder: 'نام کاربری' }}  />
                <TextInput {...{ value: password, name: 'password', setInformation, type: 'password', placeholder: 'کلمه عبور' }} />
                <button type="submit" className={styles.submitButton}>ورود</button>
            </form>
        </div>
    )
}

export default Login