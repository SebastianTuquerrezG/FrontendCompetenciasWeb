import React, { useState, useEffect } from "react";
import styles from "./ra.module.css";
import { getRA, updateRA } from "@/services/Competencias_Ra_service/ra.service";
import { getCompetencias } from "@/services/Competencias_Ra_service/competencias.service";


const InactivasRA = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState<{ id: number; descripcion: string; idCompetenciaPrograma:number; estado: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [editRecordId, setEditRecordId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editAssociatedCompetence, setEditAssociatedCompetence] = useState(null);
  const [competenciaRecords, setRecordsCompetencia] = useState<{ id: number; descripcion: string; nivel: string; estado: number }[]>([]);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRA() as { id: number; descripcion: string; idCompetenciaPrograma: number; estado: number }[];
        
        setRecords(data);
        const dataCompetencia = await getCompetencias() as { id: number; descripcion: string; nivel: string; estado: number }[];
        setRecordsCompetencia(dataCompetencia);
        setLoading(false);
        console.log(records);
      } catch (error) {
        console.error('Error fetching RA:', error);
        setLoading(false);
      }
    };
    fetchData();
    console.log(records);
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const inactiveRecords = records.filter(record => record.estado !== 1); // Filtrar solo los RA inactivos
  const currentRecords = inactiveRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(inactiveRecords.length / recordsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (record: { id: number; descripcion: string; idCompetenciaPrograma: number; estado: number }) => {
    setEditRecordId(record.id);
    setEditDescription(record.descripcion);
    // setEditAssociatedCompetence(record.idCompetenciaPrograma);
  };

  const handleSave = async (id: number) => {
    try {
      const updatedRA = await updateRA({id: id, descripcion: editDescription, idCompetenciaPrograma: editAssociatedCompetence!, estado: 0 }) as { id: number; descripcion: string; idCompetenciaPrograma: number; estado: number };
      setRecords(records.map(record => (record.id === id ? updatedRA : record)));
      setEditRecordId(null);
    } catch (error) {
      console.error('Error updating RA:', error);
    }
  };

  const handleActivate = async (record: { id: number; descripcion: string; idCompetenciaPrograma: number; estado: number }) => {
    try {
      let id = record.id;
      let descripcion = record.descripcion;
      let idCompetenciaPrograma = record.idCompetenciaPrograma;
      let estado = 1;
      if (id !== null) {
        const updatedRA = await updateRA({id: id,  descripcion: descripcion, idCompetenciaPrograma: idCompetenciaPrograma!, estado: estado }) as { id: number; descripcion: string; idCompetenciaPrograma: number; estado: number };
        setRecords(records.map(record => (record.id === id ? updatedRA : record)));
      }
    } catch (error) {
      console.error('Error activating RA:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.subdivstyle}>
      <div>
        <h3>Resultados de aprendizaje inactivos</h3>
      </div>
      <div className={styles.table}>
        {inactiveRecords.length === 0 ? (
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
                      className={editRecordId === record.id ? styles.editable : styles.readonly}
                      tabIndex={editRecordId === record.id ? 0 : -1}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={competenciaRecords.find(competencia => competencia.id === record.idCompetenciaPrograma)?.descripcion}
                      readOnly
                      className={styles.readonly}
                    />
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

export default InactivasRA;