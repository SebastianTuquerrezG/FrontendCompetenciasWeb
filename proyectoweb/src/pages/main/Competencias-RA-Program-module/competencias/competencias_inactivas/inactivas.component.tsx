import React, { useState, useEffect } from "react";
import styles from "./competencias.module.css";
import { getCompetencias, updateCompetencia } from "@/services/Competencias_Ra_service/competencias.service";

const Inactivas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState<{ id: number; descripcion: string; nivel: string; estado: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [editRecordId, setEditRecordId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editLevel, setEditLevel] = useState("");
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompetencias() as { id: number; descripcion: string; nivel: string; estado: number }[];
        setRecords(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching competencias:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const inactiveRecords = records.filter(record => record.estado !== 1); // Filtrar solo las competencias inactivas
  const currentRecords = inactiveRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(inactiveRecords.length / recordsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (record: { id: number; descripcion: string; nivel: string }) => {
    setEditRecordId(record.id);
    setEditDescription(record.descripcion);
    setEditLevel(record.nivel);
  };

  const handleSave = async (id: number) => {
    try {
      const updatedCompetencia = await updateCompetencia({ id, descripcion: editDescription, nivel: editLevel, estado: 0 }) as { id: number; descripcion: string; nivel: string; estado: number };
      setRecords(records.map(record => (record.id === id ? updatedCompetencia : record)));
      setEditRecordId(null);
      console.log(updatedCompetencia);
    } catch (error) {
      console.error('Error updating competencia:', error);
    }
  };

  const handleActivate = async (record: { id: number; descripcion: string; nivel: string }) => {
    try {
      let id = record.id;
      let descripcion = record.descripcion;
      let nivel = record.nivel;

      if (id !== null) {
        const updatedCompetencia = await updateCompetencia({ id: id, descripcion: descripcion, nivel: nivel, estado: 1 }) as { id: number; descripcion: string; nivel: string; estado: number };
        setRecords(records.map(record => (record.id === id ? updatedCompetencia : record)));
        console.log(updatedCompetencia);
      }
    } catch (error) {
      console.error('Error activating competencia:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.subdivstyle}>
      <div>
        <h3>Competencias de programa inactivas</h3>
      </div>
      <div className="table">
        {inactiveRecords.length === 0 ? (
          <p>No se encontraron registros</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Nivel</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>
                    <input
                      type="text"
                      value={editRecordId === record.id ? editDescription : record.descripcion}
                      onChange={(e) => setEditDescription(e.target.value)}
                      readOnly={editRecordId !== record.id}
                      className={editRecordId === record.id ? "editable" : "readonly"}
                    />
                  </td>
                  <td>
                    <select
                      value={editRecordId === record.id ? editLevel : record.nivel}
                      onChange={(e) => setEditLevel(e.target.value)}
                      disabled={editRecordId !== record.id}
                      className={editRecordId === record.id ? "editable" : "readonly"}
                      tabIndex={editRecordId === record.id ? 0 : -1}
                    >
                      <option value="BASICO">BASICO</option>
                      <option value="INTERMEDIO">INTERMEDIO</option>
                      <option value="AVANZADO">AVANZADO</option>
                    </select>
                  </td>
                  <td>
                    {editRecordId === record.id ? (
                      <button onClick={() => handleSave(record.id)}>Guardar</button>
                    ) : (
                      <button onClick={() => handleEdit(record)}>Editar</button>
                    )}
                    <button onClick={() => handleActivate(record)}>Activar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {inactiveRecords.length > 0 && (
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
      )}
    </div>
  );
};

export default Inactivas;