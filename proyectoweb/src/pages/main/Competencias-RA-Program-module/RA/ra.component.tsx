import React from "react";
import styles from "./ra.module.css";


const RA = () => {
    return (
        <div className={styles.main}>
            <div>
                <h3>Resultados de aprendizaje</h3>
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Descripcion</th>
                            <th>Competencia asociada</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2</td>
                            <td>El estudiante podra...</td>
                            <td>Esta es una competencia asociada</td>
                            <td>
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>El estudiante podra...</td>
                            <td>Esta es una competencia asociada</td>
                            <td>
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                        <tr>

                        </tr>
                        <tr>
                            <td>2</td>
                            <td>El estudiante podra...</td>
                            <td>Esta es una competencia asociada</td>
                            <td>
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RA;