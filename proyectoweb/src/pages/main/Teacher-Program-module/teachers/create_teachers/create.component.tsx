// components/CreateComponent.tsx
import React, { useState } from "react";
import styles from "./create.module.css";
import { createTeacher, createUserTeacher } from "@/services/Teachers_service/teachers.service";

interface CreateComponentProps {
  onCreate: (teacher: { id: number; identificationType: string; teacherType: string; names: string; lastNames: string; identification: string; title: string; status: string }) => void;
  onCancel: () => void;
}

const CreateComponent: React.FC<CreateComponentProps> = ({ onCreate, onCancel }) => {
  const [identificationType, setIdentificationType] = useState("");
  const [teacherType, setTeacherType] = useState("");
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [identification, setIdentification] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rol, setRol] = useState("DOCENTE");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("ACTIVO");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTeacher = await createTeacher({ identificationType, teacherType, names, lastNames, identification, title, status }) as { id: number; identificationType: string; teacherType: string; names: string; lastNames: string; identification: string; title: string; status: string };
      const newUser = await createUserTeacher({ identity: identification, typeId: identificationType, name: names, lastname: lastNames, degree: title, email, username, password, phoneNumber, statusUser: status, role: rol }) as { id:number; identity: string; typeId: string; name: string; lastName: string; degree: string; email: string; username: string; password: string; phoneNumber: string; statusUser: string; rol: string; };
      console.log("Usuario creado: " + JSON.stringify(newUser));
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

          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Numbero de teléfono:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />


        </div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Volver</button>
      </form>
    </div>

  );
};

export default CreateComponent;