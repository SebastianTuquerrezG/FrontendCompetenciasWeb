// pages/login.tsx
import React, { useState } from "react";
import styles from "./login.module.css";
import { LoginForm, AuthenticateUser } from '../../components/index';
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/router";


const Login = () => {
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
        </div>
  );
};

export default Login;
