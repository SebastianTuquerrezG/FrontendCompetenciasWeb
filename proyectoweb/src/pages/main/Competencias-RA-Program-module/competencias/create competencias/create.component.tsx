// components/CreateComponent.tsx
import React, { useState } from "react";
import styles from "./create.module.css";
import { createCompetencia } from "@/services/Competencias_Ra_service/competencias.service";
import { createRA } from "@/services/Competencias_Ra_service/ra.service";

interface CreateComponentProps {
  onCreate: (competencia: { id: number; descripcion: string; nivel: string; estado: number }) => void;
  onCancel: () => void;
}

const CreateComponent: React.FC<CreateComponentProps> = ({ onCreate, onCancel }) => {
  const [descripcion, setDescription] = useState("");
  const [nivel, setLevel] = useState("");
  const [estado, setStatus] = useState(1);
  const [descripcionRA, setDescripcionRA] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCompetencia = await createCompetencia({ descripcion, nivel, estado }) as { id: number, descripcion: string, nivel: string, estado: number };
      await createRA({ descripcion: descripcionRA, idCompetenciaPrograma: newCompetencia.id, estado: 1});
      onCreate(newCompetencia); // Llama a la función de callback cuando se complete la creación
    } catch (error) {
      console.error('Error creating competencia:', error);
    }
  };

  return (
    <div className={styles.subdivstyle}>
      <h2>Crear Competencia</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Descripción:</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Nivel</label>
          <select
            className={styles.select}
            value={nivel}
            onChange={(e) => setLevel(e.target.value)}
            required
          >
            <option value="">Seleccione un nivel</option>
            <option value="BASICO">BASICO</option>
            <option value="INTERMEDIO">INTERMEDIO</option>
            <option value="AVANZADO">AVANZADO</option>
          </select>
          <h2>Crear Resultado de Aprendizaje</h2>
          <label>Descripción:</label>
          <input
            type="text"
            value={descripcionRA}
            onChange={(e) => setDescripcionRA(e.target.value)}
            required
          />
        </div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Volver</button>
      </form>
    </div>
  );
};

export default CreateComponent;