import React, { useState } from "react";
import styles from "./module.module.css";
import Teachers from "./teachers/teachers.component";
import CreateComponent from "./teachers/create_teachers/create.component";
import Inactivos from "./teachers/teachers_inactivos/inactivos.component";

const TeachersProgramModule = () => {
    const [selectedOption, setSelectedTab] = useState("teachers");

    const handleTeacherCreated = () => {
        setSelectedTab("teachers");
    };

    const handleCancelCreateTeacher = () => {
        setSelectedTab("teachers");
    };

    const renderContent = () => {
        switch (selectedOption) {
            case "teachers":
                return (
                    <div>
                        <Teachers />
                        <div className={styles.buttons}>
                            <button onClick={() => setSelectedTab("create-teachers")} >Crear docentes</button>
                            <button onClick={() => setSelectedTab("inactive-teachers")}>Ver docentes inactivos</button>
                        </div>
                    </div>
                );
            case "create-teachers":
                return <CreateComponent
                    onCreate={handleTeacherCreated}
                    onCancel={handleCancelCreateTeacher}
                />;
            case "inactive-teachers":
                return (
                    <div>
                        <Inactivos />
                        <div className={styles.buttonsBack}>
                            <button onClick={() => setSelectedTab("teachers")}>Volver</button>
                        </div>
                    </div>
                );
        };
    }

    return (
        <div className="main-div-style">
            <div>
                <header>
                    <h2 className={styles.title}>Modulo de gestion de docentes</h2>
                </header>
            </div>
            <div className={styles.tabs}>
                <button
                    className={selectedOption === "teachers" ? styles.active : ""}
                    onClick={() => setSelectedTab("teachers")}
                    hidden={selectedOption === "create-teachers" || selectedOption === "inactive-teachers"}
                >
                    Gestionar Docentes
                </button>
                <button
                    className={selectedOption === "create-teachers" || selectedOption === "inactive-teachers" ? styles.activeSub : ""}
                    hidden={selectedOption !== "create-teachers" && selectedOption !== "inactive-teachers"}
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