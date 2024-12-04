import { useState } from "react";
import styles from "./rubricas.module.css";
import CreateRubrica from "./create_rubrica/create.component";
import Rubricas from "./rubricas/rubricas.component";
import InactivasRubricas from "./deactivate/inactivas.component";
import CriterioModule from "./criterio/criterio.component";
import NivelModule from "./nivel/nivel.component";

const RubricasModule = () => {
    const [selectedOption, setSelectedTab] = useState("rubricas");

    const handleTeacherCreated = () => {
        setSelectedTab("rubricas");
    };

    const handleCancelCreateTeacher = () => {
        setSelectedTab("rubricas");
    };

    const renderContent = () => {
        switch (selectedOption) {
            case "rubricas":
                return (
                    <div>
                        <Rubricas />
                        <div className={styles.buttons}>
                            <button onClick={() => setSelectedTab("create-rubricas")} >Crear Rubrica</button>
                            <button onClick={() => setSelectedTab("inactive-rubricas")}>Ver rubricas inactivas</button>
                        </div>
                    </div>
                );
            case "create-rubricas":
                return <CreateRubrica
                    onCreate={handleTeacherCreated}
                    onCancel={handleCancelCreateTeacher}
                />;
            case "inactive-rubricas":
                return (
                    <div>
                        <InactivasRubricas />
                        <div className={styles.buttonsBack}>
                            <button onClick={() => setSelectedTab("rubricas")}>Volver</button>
                        </div>
                    </div>
                );
            case "criterio":
                return (
                    <div>
                        <CriterioModule />
                        <div className={styles.buttonsBack}>
                            <button onClick={() => setSelectedTab("rubricas")}>Volver</button>
                        </div>
                    </div>
                );
            case "nivel":
                return (
                    <div>
                        <NivelModule />
                        <div className={styles.buttonsBack}>
                            <button onClick={() => setSelectedTab("rubricas")}>Volver</button>
                        </div>
                    </div>
                );
        };
    }

    return (
        <div className="main-div-style">
            <div>
                <header>
                    <h2 className={styles.title}>Modulo de gestion de rúbricas</h2>
                </header>
            </div>
            <div className={styles.tabs}>
                <button
                    className={selectedOption === "rubricas" ? styles.active : ""}
                    onClick={() => setSelectedTab("rubricas")}
                    hidden={selectedOption === "create-rubricas" || selectedOption === "inactive-rubricas"}
                >
                    Gestionar Rubricas
                </button>
                <button
                    className={selectedOption === "create-rubricas" || selectedOption === "inactive-rubricas" ? styles.activeSub : ""}
                    hidden={selectedOption !== "create-rubricas" && selectedOption !== "inactive-rubricas"}
                >
                    Gestionar Rubricas
                </button>
                <button
                    className={selectedOption === "criterio" ? styles.active : ""}
                    onClick={() => setSelectedTab("criterio")}
                >
                    Criterio de Evaluación
                </button>
                <button
                    className={selectedOption === "nivel" ? styles.active : ""}
                    onClick={() => setSelectedTab("nivel")}
                >
                    Nivel de Desempeño
                </button>
            </div>
            <div>
                {renderContent()}
            </div>
        </div>
    );
}

export default RubricasModule;