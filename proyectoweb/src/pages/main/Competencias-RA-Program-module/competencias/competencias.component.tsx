import React from "react";
import styles from "./competencias.module.css";

const Competencias = () => {
    return (
        <div className={styles.main}>
            <div >
                <h3>Competencias de programa</h3>
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Descripcion</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>El estudiante podra...</td>
                            <td>
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>El estudiante podra...</td>
                            <td>
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>El estudiante podra...</td>
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

export default Competencias;