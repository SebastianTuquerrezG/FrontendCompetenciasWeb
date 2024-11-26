// pages/login.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./login.module.css";

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica de autenticación
        // Si la autenticación es exitosa, redirige a la página principal
        router.push("/main");
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <div className={styles.header}>
                <img src="/assets/icon/logo.png" alt="logo" className={styles.logo} />
                    <h2 className={styles.title}>SISGE<span className={styles.span}>CO</span></h2>
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
                    <button type="submit" className={styles.loginButton}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
