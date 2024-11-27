import React, { useState } from "react";
import styles from "./create.module.css";

interface CreateRaComponentProps {
    onCreate: () => void;
    onCancel: () => void;
}

const CreateRaComponent: React.FC<CreateRaComponentProps> = ({ onCreate, onCancel }) => {
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Competencia creada:", { description, level });
        onCreate();
    };

    return (
        <div className={styles.subdivstyle}>
            <h2>Crear Resultado de aprendizaje</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Descripción:</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <label>Selecciona una competencia</label>
                    <select
                        className={styles.select}
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                    >
                        <option value=""></option>
                    </select>
                </div>
                <div>
                    <button type="submit" onClick={onCreate}>Guardar</button>
                    <button type="button" onClick={onCancel}>Volver</button>

                </div>
            </form>
        </div>
    );
};

export default CreateRaComponent;