import { useState } from "react";
import styles from "./module.module.css"

const CompetenciasRAAsignatureModule = () => {
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
                        {/* <Competencias /> */}
                        <div className={styles.buttons}>
                            <button onClick={() => setSelectedTab("create-competencias")} >Crear competencia</button>
                            <button onClick={() => setSelectedTab("inactive-competencias")}>Ver competencias inactivas</button>
                        </div>
                    </div>
                );
            case "create-competencias":
            // return <CreateComponent
            //     onCreate={handleCompetenciaCreated}
            //     onCancel={handleCancelCreateCompetencia}
            // />;
            case "inactive-competencias":
                return (
                    <div>
                        {/* <Inactivas /> */}
                        <div className={styles.buttonsBack}>
                            <button onClick={() => setSelectedTab("competencias")}>Volver</button>
                        </div>
                    </div>
                );
            case "ra":
                return (
                    <div>
                        {/* <RA /> */}
                        <div className={styles.buttons}>
                            <button onClick={() => setSelectedTab("create-ra")} >Crear resultado de aprendizaje</button>
                            <button onClick={() => setSelectedTab("inactive-ra")}>Ver resultados de aprendizaje inactivos</button>
                        </div>
                    </div>
                );
            case "create-ra":
            // return <CreateRaComponent
            //     onCreate={handleRaCreated}
            //     onCancel={handleCancelCreateRa}
            // />
            case "inactive-ra":
                return (
                    <div>
                        {/* <InactivasRA /> */}
                        <div className={styles.buttonsBack}>
                            <button onClick={() => setSelectedTab("ra")}>Volver</button>
                        </div>
                    </div>
                );
        };
    }

    return (
        <div className="main-div-style">
            <div>
                <header>
                    <h2 className={styles.title}>Modulo de gestion de competencias y resultados de aprendizaje de asignatura</h2>
                </header>
            </div>
            <div className={styles.tabs}>
                <button
                    className={selectedOption === "competencias" ? styles.active : ""}
                    onClick={() => setSelectedTab("competencias")}
                    hidden={selectedOption === "create-competencias" || selectedOption === "inactive-competencias"}
                >
                    Gestionar Competencias
                </button>
                <button
                    className={selectedOption === "create-competencias" || selectedOption === "inactive-competencias" ? styles.activeSub : ""}
                    hidden={selectedOption !== "create-competencias" && selectedOption !== "inactive-competencias"}
                >
                    Gestionar Competencias
                </button>
                <button
                    className={selectedOption === "ra" ? styles.active : ""}
                    onClick={() => setSelectedTab("ra")}
                    hidden={selectedOption === "create-ra" || selectedOption === "inactive-ra"}
                >
                    Resultados de Aprendizaje
                </button>
                <button
                    className={selectedOption === "create-ra" || selectedOption === "inactive-ra" ? styles.activeSub : ""}
                    hidden={selectedOption !== "create-ra" && selectedOption !== "inactive-ra"}
                >
                    Resultados de Aprendizaje
                </button>
            </div>
            <div>
                {renderContent()}
            </div>
        </div>
    );
}

export default CompetenciasRAAsignatureModule;