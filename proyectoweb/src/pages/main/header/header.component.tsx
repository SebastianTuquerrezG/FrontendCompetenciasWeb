import React from "react";
import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    return (
        <header className={styles.header}>
            <img src="/assets/icon/logo.png" alt="logo" className={styles.logo}/>
            <a href="/main" aria-hidden><h1>SISGECO</h1></a>
            <FontAwesomeIcon icon={faHome} className={styles.icon}/>
        </header>
    );
};

export default Header;