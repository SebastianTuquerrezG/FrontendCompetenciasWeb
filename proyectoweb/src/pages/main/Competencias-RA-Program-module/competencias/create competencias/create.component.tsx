// components/CreateComponent.tsx
import React from "react";
import styles from "./create.module.css";

interface CreateComponentProps {
  onClose: () => void;
}

const CreateComponent: React.FC<CreateComponentProps> = ({ onClose }) => {
const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Lógica para crear una nueva competencia
    onClose();
};

  return (
    <div className={styles.createContainer}>
      <h2>Crear Competencia</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Descripción:</label>
          <input type="text" required />
        </div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default CreateComponent;