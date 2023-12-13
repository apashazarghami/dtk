import styles from './TextInput.module.css';
const TextInput = ({ name, value, changeHandler, type, placeholder }) => {
    return(
        <input className={styles.textIinput} name={name} value={value} onChange={changeHandler} type={type} placeholder={placeholder} />
    )
}

export default TextInput;