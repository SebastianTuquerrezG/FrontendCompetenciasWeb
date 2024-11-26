import React, { useState } from "react";
import styles from "./module.module.css";
import Competencias from "./competencias/competencias.component";
import RA from "./RA/ra.component";

const CompetenciasRAProgramModule = () => {
    const [selectedOption, setSelectedTab] = useState("competencias");

    const renderContent = () => {
        switch (selectedOption) {
            case "competencias":
                return <Competencias />
            case "ra":
                return <RA />
        }
    }

    return (
        <div className="main-div-style">
            <div>
                <header>
                    <h2 className={styles.title}>Modulo de gestion de competencias y resultados de aprendizaje de programa</h2>
                </header>
            </div>
            <div className={styles.tabs}>
                <button
                    className={selectedOption === "competencias" ? styles.active : ""}
                    onClick={() => setSelectedTab("competencias")}
                >
                    Gestionar Competencias
                </button>
                <button
                    className={selectedOption === "ra" ? styles.active : ""}
                    onClick={() => setSelectedTab("ra")}
                >
                    Resultados de Aprendizaje
                </button>
            </div>
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default CompetenciasRAProgramModule;