import React, { useState, useEffect } from "react";
import styles from "./ra.module.css";
import { getRA, updateRA, createRA, deleteRA, deactivateRA } from "@/services/Competencias_Ra_service/ra.service";

const RA = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState<{ id: number; descripcion: string; idCompetenciaPrograma: { id: number; descripcion: string; nivel: string; estado: number}; estado: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [editRecordId, setEditRecordId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editAssociatedCompetence, setEditAssociatedCompetence] = useState<{ id: number; descripcion: string; nivel: string; estado: number } | null>(null);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRA() as { id: number; descripcion: string; idCompetenciaPrograma: { id: number; descripcion: string; nivel: string; estado: number}; estado: number }[];
        setRecords(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching RA:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const activeRecords = records.filter(record => record.estado === 1); // Filtrar solo los RA activos
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (record: { id: number; descripcion: string; idCompetenciaPrograma: { id: number; descripcion: string; nivel: string; estado: number }, estado: number }) => {
    setEditRecordId(record.id);
    setEditDescription(record.descripcion);
    // setEditAssociatedCompetence(record.idCompetenciaPrograma);
  };

  const handleSave = async (id: number) => {
    try {
      const updatedRA = await updateRA({id: id, descripcion: editDescription, idCompetenciaPrograma: editAssociatedCompetence!, estado: 1 }) as { id: number; descripcion: string; idCompetenciaPrograma: { id: number; descripcion: string; nivel: string; estado: number }; estado: number };
      setRecords(records.map(record => (record.id === id ? updatedRA : record)));
      setEditRecordId(null);
    } catch (error) {
      console.error('Error updating RA:', error);
    }
  };

  const handleDeactivate = async (id: number) => {
    try {
      const updatedRA = await deactivateRA(id);
      setRecords(records.map(record => (record.id === id ? { ...record, estado: 0 } : record)));
    } catch (error) {
      console.error('Error deactivating RA:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteRA(id);
      setRecords(records.filter(record => record.id !== id));
    } catch (error) {
      console.error('Error deleting RA:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.subdivstyle}>
      <div>
        <h3>Resultados de aprendizaje</h3>
      </div>
      <div className="table">
        {activeRecords.length === 0 ? (
          <p>No se encontraron registros</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Competencia Asociada</th>
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
                      tabIndex={editRecordId === record.id ? 0 : -1}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={record.idCompetenciaPrograma.descripcion}
                      readOnly
                      className="readonly"
                    />
                  </td>
                  <td>
                    {editRecordId === record.id ? (
                      <button onClick={() => handleSave(record.id)}>Guardar</button>
                    ) : (
                      <button onClick={() => handleEdit({ ...record, estado: record.estado })}>Editar</button>
                    )}
                    <button onClick={() => handleDelete(record.id)}>Desactivar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {activeRecords.length > 0 && (
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

export default RA;