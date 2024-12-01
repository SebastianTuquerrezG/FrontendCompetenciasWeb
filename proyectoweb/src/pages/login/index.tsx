// pages/login.tsx
import React, { useState } from "react";
import styles from "./login.module.css";
import { LoginForm, AuthenticateUser } from '../../components/index';
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/router";


const Login = () => {
<<<<<<< HEAD
    const router = useRouter();
    const [reset, setReset] = useState(false);

    const {dataAuth} = useUserContext();

    const [credentials, setCredentials] = useState<{ username: string, password: string }>();

    const handleLogin = (username: string, password: string) => {
        setCredentials({ username, password });
    };

    if(dataAuth?.token){
        router.push("/main");
    }

    const handleReset = () => {
        setReset(true);
        if (reset) {
            setTimeout(() => {
                setCredentials(undefined);
                setReset(false);
            }, 5000);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <div className={styles.header}>
                    <img src="/assets/icon/logo.png" alt="logo" className={styles.logo} />
                    <h2 className={styles.title}>SISGE<span className={styles.span}>CO</span></h2>
                </div>
                <LoginForm onLogin={handleLogin} />
            </div>
            {credentials ? (
                <AuthenticateUser username={credentials.username} password={credentials.password} onReset={handleReset} />
            ) :
                (
                    <div></div>
                )
            }
=======
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFadingOut(true);
    setTimeout(() => {
      router.push("/main");
    }, 1000); 
  };

  return (
    <div className={`${styles.container} ${isFadingOut ? "fade-out" : ""}`}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <img src="/assets/icon/logo.png" alt="logo" className={styles.logo} />
          <h2 className={styles.title}>
            SISGE<span className={styles.span}>CO</span>
          </h2>
>>>>>>> 524bdab2de95a5fdbaecf9dd935c8a5df2da846d
        </div>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
