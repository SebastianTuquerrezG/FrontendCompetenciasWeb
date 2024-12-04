import { useState } from "react";
import styles from "./asociacion.module.css";
import CreateAsociacion from "./create_asociacion/create.component";
import Asociaciones from "./asociaciones/asociaciones.component";

const AsociacionModule = () => {
    const [selectedOption, setSelectedTab] = useState("asociar");

    const handleTeacherCreated = () => {
        setSelectedTab("asociar");
    };

    const handleCancelCreateTeacher = () => {
        setSelectedTab("asociar");
    };

    const renderContent = () => {
        switch (selectedOption) {
            case "asociar":
                return (
                    <div>
                        <Asociaciones />
                        <div className={styles.buttons}>
                            <button onClick={() => setSelectedTab("create-asociar")} >Crear Asociación</button>
                        </div>
                    </div>
                );
            case "create-asociar":
                return <CreateAsociacion
                    onCreate={handleTeacherCreated}
                    onCancel={handleCancelCreateTeacher}
                />;
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
                    className={selectedOption === "asociar" ? styles.active : ""}
                    onClick={() => setSelectedTab("asociar")}
                    hidden={selectedOption === "create-asociar" || selectedOption === "inactive-asociar"}
                >
                    Gestionar Asociaciones
                </button>
                <button
                    className={selectedOption === "create-asociar" || selectedOption === "inactive-asociar" ? styles.activeSub : ""}
                    hidden={selectedOption !== "create-asociar" && selectedOption !== "inactive-asociar"}
                >
                    Gestionar Asociaciones
                </button>
            </div>
            <div>
                {renderContent()}
            </div>
        </div>
    );
}

export default AsociacionModule;