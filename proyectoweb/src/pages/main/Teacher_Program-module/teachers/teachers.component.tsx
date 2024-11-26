import React, { useState } from "react";
import styles from "./teachers.module.css";

const Teachers = () => {
    const [showModal, setShowModal] = useState(false);

    const handleAddTeacher = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.main}>
            <div>
                <h3>Docentes</h3>
                <button onClick={handleAddTeacher}>Agregar Docente</button>
            </div>

            {}
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tipo de identificación</th>
                            <th>Tipo de Docente</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Identificación</th>
                            <th>Título</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Cédula de Ciudadanía</td>
                            <td>Cátedra</td>
                            <td>Edwin Orlando</td>
                            <td>Restrepo</td>
                            <td>104621011358</td>
                            <td>Doctor</td>
                            <td>
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {}
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Agregar Docente</h3>
                        <form>
                            <div>
                                <label className={styles.label}>Tipo de Identificación:</label>
                                <input className={styles.input} type="text" name="identificacionTipo" required />
                            </div>
                            <div>
                                <label className={styles.label}>Tipo de Docente:</label>
                                <input className={styles.input} type="text" name="docenteTipo" required />
                            </div>
                            <div>
                                <label className={styles.label}>Nombres:</label>
                                <input className={styles.input} type="text" name="nombres" required />
                            </div>
                            <div>
                                <label className={styles.label}>Apellidos:</label>
                                <input className={styles.input} type="text" name="apellidos" required />
                            </div>
                            <div>
                                <label className={styles.label}>Identificación:</label>
                                <input className={styles.input} type="text" name="identificacion" required />
                            </div>
                            <div>
                                <label className={styles.label}>Título:</label>
                                <input className={styles.input} type="text" name="titulo" required />
                            </div>
                            <button className={styles.botton} type="submit">Guardar</button>
                            <button className={styles.botton} type="button" onClick={closeModal}>Cerrar</button>
                            
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Teachers;
