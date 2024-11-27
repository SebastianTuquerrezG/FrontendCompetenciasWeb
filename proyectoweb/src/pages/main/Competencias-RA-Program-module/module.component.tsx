import React, { useState } from "react";
import styles from "./module.module.css";
import Competencias from "./competencias/competencias.component";
import RA from "./RA/ra.component";
import CreateComponent from "./competencias/create competencias/create.component";
import CreateRaComponent from "./RA/create_ra/create.component";

const CompetenciasRAProgramModule = () => {
    const [selectedOption, setSelectedTab] = useState("competencias");

    const handleCompetenciaCreated = () => {
        setSelectedTab("competencias");
    };

    const handleCancelCreateCompetencia = () => {
        setSelectedTab("competencias");
    };

    const handleRaCreated = () => {
        setSelectedTab("ra");
    };

    const handleCancelCreateRa = () => {
        setSelectedTab("ra");
    };

    const renderContent = () => {
        switch (selectedOption) {
            case "competencias":
                return (
                    <div>
                        <Competencias />
                        <div className={styles.buttons}>
                            <button onClick={() => setSelectedTab("create-competencias")} >Crear competencia</button>
                            <button >Ver competencias inactivas</button>
                        </div>
                    </div>
                );
            case "create-competencias":
                return <CreateComponent
                    onCreate={handleCompetenciaCreated}
                    onCancel={handleCancelCreateCompetencia}
                />;
            case "ra":
                return (
                    <div>
                        <RA />
                        <div className={styles.buttons}>
                            <button onClick={() => setSelectedTab("create-ra")} >Crear resultado de aprendizaje</button>
                            <button >Ver resultados de aprendizaje inactivos</button>
                        </div>
                    </div>
                );
            case "create-ra":
                return <CreateRaComponent
                    onCreate={handleRaCreated}
                    onCancel={handleCancelCreateRa}
                    />
        };
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