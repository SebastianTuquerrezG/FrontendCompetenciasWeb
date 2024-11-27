import React, { useState } from "react";
import styles from "./ra.module.css";

const RA = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const records = [
    { id: 1, description: "El estudiante podrá 1...", associatedCompetence: "Competencia 1" },
    { id: 2, description: "El estudiante podrá 2...", associatedCompetence: "Competencia 2" },
    { id: 3, description: "El estudiante podrá 3...", associatedCompetence: "Competencia 3" },
    { id: 4, description: "El estudiante podrá 4...", associatedCompetence: "Competencia 4" },
    { id: 5, description: "El estudiante podrá 5...", associatedCompetence: "Competencia 5" },
    { id: 6, description: "El estudiante podrá 6...", associatedCompetence: "Competencia 6" },
    { id: 7, description: "El estudiante podrá 7...", associatedCompetence: "Competencia 7" },
    { id: 8, description: "El estudiante podrá 8...", associatedCompetence: "Competencia 8" },
    { id: 9, description: "El estudiante podrá 9...", associatedCompetence: "Competencia 9" },
    { id: 10, description: "El estudiante podrá 10...", associatedCompetence: "Competencia 10" },
  ];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="sub-div-style">
      <div>
        <h3>Resultados de aprendizaje</h3>
      </div>
      <div className="table">
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
            {currentRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.description}</td>
                <td>{record.associatedCompetence}</td>
                <td>
                  <button>Editar</button>
                  <button>Desactivar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleClick(index + 1)}
            className={currentPage === index + 1 ? styles.active : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className={styles.buttons}>
        <button>Crear resultado de aprendizaje</button>
        <button>Ver resultados de aprendizaje inactivos</button>
      </div>
    </div>
  );
};

export default RA;