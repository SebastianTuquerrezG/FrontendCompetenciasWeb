import React from "react";
import styles from "./home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useUserContext } from "@/context/userContext";
const Home = () => {
    const {user} = useUserContext();
    return (
        <div className="main-div-style">
            <div className={styles.container}>
                <div className={styles.header}>
                    <FontAwesomeIcon icon={faHome} className={styles.icon} id="home-icon"/>
                    <h1>Inicio</h1>
                </div>
                <div className={styles.content}>
                    <img src="/assets/images/home_image.jpg" alt="home_img" className={styles.images}/>
                    <p>Bienvenido {user?.name} a SISGECO</p>
                </div>
                <div className={styles.footer}>
                    <div className={styles.social}>
                        <div >
                        <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
                        <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
                        <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
                        </div>
                            <p>Contactanos</p>
                        <div>
                        </div>
                    </div>
                    <div className={styles.social}>
                    </div>
                    <div className={styles.social}>
                        <span>SISGECO</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;