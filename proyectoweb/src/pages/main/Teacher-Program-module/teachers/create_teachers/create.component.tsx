// components/CreateComponent.tsx
import React, { useState } from "react";
import styles from "./create.module.css";
import { createTeacher } from "@/services/Teachers_service/teachers.service";

interface CreateComponentProps {
  onCreate: (teacher: { id: number; identificationType: string; teacherType: string; names: string; lastNames: string; identification: string; title: string; status: string  }) => void;
  onCancel: () => void;
}

const CreateComponent: React.FC<CreateComponentProps> = ({ onCreate, onCancel }) => {
  const [identificationType, setIdentificationType] = useState("");
  const [teacherType, setTeacherType] = useState("");
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [identification, setIdentification] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("ACTIVO");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTeacher = await createTeacher({ identificationType, teacherType, names, lastNames, identification, title, status }) as {  id: number; identificationType: string; teacherType: string; names: string; lastNames: string; identification: string; title: string; status: string  };
      console.log("Docente creado:", createTeacher);

      onCreate(newTeacher); // CallBack
    } catch (error) {
      console.error('Error creating teacher:', error);
    }
  };

  return (
    <div className={styles.subdivstyle}>
      <h2>Crear Docente</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>

          <label>Tipo de identificación</label>
          <select
            className={styles.select}
            value={identificationType}
            onChange={(e) => setIdentificationType(e.target.value)}
            required
          >
            <option value="">Seleccione el tipo</option>
            <option value="CEDULA_CIUDADANIA">Cédula de ciudadania</option>
            <option value="TARJETA_EXTRANJERA">Tarjeta Extranjeria</option>
            <option value="TARJETA_DE_IDENTIDAD">Tarjeta de identidad</option>
            <option value="CIVIL">Registro Civil</option>
          </select>

          <label>Tipo de profesor</label>
          <select
            className={styles.select}
            value={teacherType}
            onChange={(e) => setTeacherType(e.target.value)}
            required
          >
            <option value="">Seleccione el tipo</option>
            <option value="CATEDRA">Cátedra</option>
            <option value="TIEMPO_COMPLETO">Tiempo Completo</option>
            <option value="PLANTA">Planta</option>
          </select>

          <label>Nombres:</label>
          <input
            type="text"
            value={names}
            onChange={(e) => setNames(e.target.value)}
            required
          />

          <label>Apellidos:</label>
          <input
            type="text"
            value={lastNames}
            onChange={(e) => setLastNames(e.target.value)}
            required
          />
          
          <label>Número de identificación:</label>
          <input
            type="text"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
            required
          />

          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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