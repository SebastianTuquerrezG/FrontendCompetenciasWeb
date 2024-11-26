import React, { useState } from "react";
import styles from "./module.module.css";
import Teachers from "./teachers/teachers.component";
//import RA from "./RA/ra.component";

const TeachersProgramModule = () => {
    const [selectedOption, setSelectedTab] = useState("teachers");

    const renderContent = () => {
        switch (selectedOption) {
            case "teachers":
                return <Teachers />
        }
    }

    return (
        <div className="main-div-style">
            <div>
                <header>
                    <h2 className={styles.title}>Modulo de gestion de docentes </h2>
                </header>
            </div>
            <div className={styles.tabs}>
                <button
                    className={selectedOption === "teachers" ? styles.active : ""}
                    onClick={() => setSelectedTab("teachers")}
                >
                    Gestionar Docentes
                </button>
            
                

            </div>
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default TeachersProgramModule;