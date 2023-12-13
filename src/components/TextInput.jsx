import styles from "../styles/TextInput.module.css";
const TextInput = ({ name, value, type, placeholder, setInformation }) => {
  const changeHandler = (event) => {
    setInformation((prevInformation) => ({
      ...prevInformation,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <input
      className={styles.textIinput}
      name={name}
      value={value}
      onChange={changeHandler}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
