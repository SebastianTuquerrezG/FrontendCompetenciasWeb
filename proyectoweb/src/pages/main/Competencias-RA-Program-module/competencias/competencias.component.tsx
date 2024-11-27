import React, { useState } from "react";
import styles from "./competencias.module.css";
import CreateComponent from "./create competencias/create.component";

const Competencias = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateComponent, setShowCreateComponent] = useState(false);
  const recordsPerPage = 5;

  const records = [
    { id: 1, description: "El estudiante podrá 1..." },
    { id: 2, description: "El estudiante podrá 2..." },
    { id: 3, description: "El estudiante podrá 3..." },
    { id: 4, description: "El estudiante podrá 4..." },
    { id: 5, description: "El estudiante podrá 5..." },
    { id: 6, description: "El estudiante podrá 6..." },
    { id: 7, description: "El estudiante podrá 7..." },
    { id: 8, description: "El estudiante podrá 8..." },
    { id: 9, description: "El estudiante podrá 9..." },
    { id: 10, description: "El estudiante podrá 10..." },
  ];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCreateCompetencia = () => {
    setShowCreateComponent(true);
  };

  const handleCloseCreateComponent = () => {
    setShowCreateComponent(false);
  };

  return (
    <div className="sub-div-style">
      <div>
        <h3>Competencias de programa</h3>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.description}</td>
                <td>
                  <button>Editar</button>
                  <button>Eliminar</button>
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
        <button onClick={handleCreateCompetencia}>Crear competencia</button>
        <button>Ver competencias inactivas</button>
      </div>
      {showCreateComponent && (
        <CreateComponent onClose={handleCloseCreateComponent} />
      )}
    </div>
  );
};

export default Competencias;