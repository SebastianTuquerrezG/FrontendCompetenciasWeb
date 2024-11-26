import React from "react";
import styles from "./home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
const Home = () => {
    return (
        <div className="main-div-style">
            <div className={styles.container}>
                <div className={styles.header}>
                    <FontAwesomeIcon icon={faHome} />
                    <h1>Inicio</h1>

                </div>
                <div className={styles.content}>
                    <img src="" alt="home_img" />
                    <p>Bienvenido ** a SISGECO</p>
                </div>
                <div className={styles.footer}>
                    <div>
                        <div className={styles.social}>
                            <FontAwesomeIcon icon={faTwitter} className={styles.icon}/>
                            <FontAwesomeIcon icon={faFacebook} className={styles.icon}/>
                            <FontAwesomeIcon icon={faInstagram} className={styles.icon}/>
                        </div>
                    </div>
                    <p>Desarrollado por: **</p>
                </div>
            </div>
        </div>
    );
};

export default Home;