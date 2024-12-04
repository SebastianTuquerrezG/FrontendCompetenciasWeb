import React, { useState, useEffect } from "react";
import styles from "./teachers.module.css";
import { getTeachers, deactivateTeacher, updateTeachers, deleteTeacher } from "@/services/Teachers_service/teachers.service";

const Teachers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState<{ id: number; identificationType: string; teacherType: string; names: string; lastNames: string; identification: string; title: string; status: string  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [editRecordId, setEditRecordId] = useState<number | null>(null);
  const [editIdentificationType, setEditIdentificationType] = useState("");
  const [editTeacherType, setEditTeacherType] = useState("");
  const [editNames, setEditNames] = useState("");
  const [editLastNames, setEditLastNames] = useState("");
  const [editIdentification, setEditIdentification] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeachers() as { id: number; identificationType: string; teacherType: string; names: string; lastNames: string; identification: string; title: string; status: string  }[];
        setRecords(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const activeRecords = records.filter(record => record.status === "ACTIVO"); // Filtrar solo las Teachers activas
  const currentRecords = activeRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(activeRecords.length / recordsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (record: { id: number; identificationType: string; teacherType: string; names: string; lastNames: string; identification: string; title: string; status: string  }) => {
    setEditRecordId(record.id);
    setEditIdentificationType(record.identificationType);
    setEditTeacherType(record.teacherType);
    setEditNames(record.names);
    setEditLastNames(record.lastNames);
    setEditIdentification(record.identification);
    setEditTitle(record.title);
  };

  const handleSave = async (id: number) => {
    try {
      const updatedTeacher = await updateTeachers({ id, identificationType: editIdentificationType, teacherType : editTeacherType, names: editNames, lastNames: editLastNames, identification: editIdentification, title: editTitle,   status: "ACTIVO" }) as { id: number; identificationType: string; teacherType: string; names: string; lastNames: string; identification: string; title: string; status: string};
      setRecords(records.map(record => (record.id === id ? updatedTeacher : record)));
      setEditRecordId(null);
    } catch (error) {
      console.error('Error updating teachers:', error);
    }
  };

  const handleDeactive = async (id: number) => {
    try {
      await deactivateTeacher(id);
      setRecords(records.filter(record => record.id !== id));
    } catch (error) {
      console.error('Error deactivating teacher:', error);
    }
  };



  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.subdivstyle}>
      <div>
        <h3>Docentes activos</h3>
      </div>
      <div className="table">
        {activeRecords.length === 0 ? (
          <p>No se encontraron registros</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo de identificación</th>
                <th>Tipo de docente</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Identificación</th>
                <th>Título</th>
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
                      value={editRecordId === record.id ? editIdentificationType : record.identificationType}
                      onChange={(e) => setEditIdentificationType(e.target.value)}
                      readOnly={editRecordId !== record.id}
                      className={editRecordId === record.id ? "editable" : "readonly"}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={editRecordId === record.id ? editTeacherType : record.teacherType}
                      onChange={(e) => setEditTeacherType(e.target.value)}
                      readOnly={editRecordId !== record.id}
                      className={editRecordId === record.id ? "editable" : "readonly"}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={editRecordId === record.id ? editNames : record.names}
                      onChange={(e) => setEditNames(e.target.value)}
                      readOnly={editRecordId !== record.id}
                      className={editRecordId === record.id ? "editable" : "readonly"}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={editRecordId === record.id ? editLastNames : record.lastNames}
                      onChange={(e) => setEditLastNames(e.target.value)}
                      readOnly={editRecordId !== record.id}
                      className={editRecordId === record.id ? "editable" : "readonly"}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={editRecordId === record.id ? editIdentification : record.identification}
                      onChange={(e) => setEditIdentification(e.target.value)}
                      readOnly={editRecordId !== record.id}
                      className={editRecordId === record.id ? "editable" : "readonly"}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={editRecordId === record.id ? editTitle : record.title}
                      onChange={(e) => setEditTitle(e.target.value)}
                      readOnly={editRecordId !== record.id}
                      className={editRecordId === record.id ? "editable" : "readonly"}
                    />
                  </td>

                  <td>
                    {editRecordId === record.id ? (
                      <button onClick={() => handleSave(record.id)}>Guardar</button>
                    ) : (
                      <button onClick={() => handleEdit(record)}>Editar</button>
                    )}
                    <button onClick={() => handleDeactive(record.id)}>Desactivar</button>
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

export default Teachers;