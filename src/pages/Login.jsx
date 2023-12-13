import { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import styles from "../styles/Login.module.css";
import logoImage from "../assets/dtk.jpg";
import { useAuthenticate } from "../context/AuthenticateProvider";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { loginHandler } from "../utilities/functions";

const Login = () => {
  const [information, setInformation] = useState({
    username: "",
    password: "",
  });
  const [cookies, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const { dispatch } = useAuthenticate();

  useEffect(() => {
    cookies?.token && dispatch({ type: "AUTHENTICATE", payload: true });
  }, []);

  const { username, password } = information;

  return (
    <div className={styles.container}>
      <img
        className={styles.logoImage}
        src={logoImage}
        alt="درخشان توپال کارمانیا"
        loading="lazy"
      />
      <form
        onSubmit={(event) =>
          loginHandler({
            event,
            setCookies,
            navigate,
            setInformation,
            username,
            password,
            dispatch,
          })
        }
        className={styles.form}
      >
        <TextInput
          {...{
            value: username,
            name: "username",
            setInformation,
            type: "text",
            placeholder: "نام کاربری",
          }}
        />
        <TextInput
          {...{
            value: password,
            name: "password",
            setInformation,
            type: "password",
            placeholder: "کلمه عبور",
          }}
        />
        <button type="submit" className={styles.submitButton}>
          ورود
        </button>
      </form>
    </div>
  );
};

export default Login;
