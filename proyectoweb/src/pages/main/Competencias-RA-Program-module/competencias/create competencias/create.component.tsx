// components/CreateComponent.tsx
import React, { useState } from "react";
import styles from "./create.module.css";

interface CreateComponentProps {
  onCreate: () => void;
  onCancel: () => void;
}

const CreateComponent: React.FC<CreateComponentProps> = ({ onCreate, onCancel }) => {
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Competencia creada:", { description, level });
    onCreate(); 
  };

  return (
    <div className={styles.subdivstyle}>
      <h2>Crear Competencia</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Nivel</label>
          <select
            className={styles.select}
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          >
            <option value="">Seleccione un nivel</option>
            <option value="BASICO">BASICO</option>
            <option value="INTERMEDIO">INTERMEDIO</option>
            <option value="AVANZADO">AVANZADO</option>
          </select>
        </div>
        <button type="submit" onClick={onCreate}>Guardar</button>
        <button type="button" onClick={onCancel}>Volver</button>
      </form>
    </div>
  );
};

export default CreateComponent;