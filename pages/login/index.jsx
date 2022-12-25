import styles from "../../styles/login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store/cart";
import axios from "axios";
const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios(`${process.env.BACKEND_URL}/login`, {
        method: "post",
        data: {
          username,
          password,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(adminActions.setAdmin(true));
      router.replace("/admin");
    } catch (err) {
      console.log(err);
      setError("Invalid credentials");
    }
  };
  return (
    <div className={styles.container}>
      <h1>Login to access admin dashboard</h1>
      <div className={styles.loginItem}>
        <label htmlFor="username">Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          type="text"
        ></input>
      </div>
      <div className={styles.loginItem}>
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="text"
        ></input>
      </div>

      <div className={styles.loginItem}>
        <button onClick={submitHandler}>SUBMIT</button>
      </div>

      {error && (
        <div className={styles.errorBox}>
          <p>{error}❗</p>
        </div>
      )}
      <p>Credentials: username: admin, password: 1234</p>
    </div>
  );
};

export default LoginPage;
