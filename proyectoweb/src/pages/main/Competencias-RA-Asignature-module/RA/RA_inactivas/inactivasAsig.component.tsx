import { useEffect, useState } from "react";
import styles from "./inactivasAsig.module.css";
import { getRAAsig, updateRAAsig } from "@/services/Competencias_Ra_service/raAsig.service";
import { getCompetenciasAsig } from "@/services/Competencias_Ra_service/competenciasAsig.service";

const InactivasRAAsig = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [records, setRecords] = useState<{ id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[]>([]);
    const [competenciaRecords, setRecordsCompetencia] = useState<{ id: number; descripcion: string; nivel: string; status: string, competenciaprograma: number, raAsignaturas: { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[]}[]>([]);
    const [loading, setLoading] = useState(true);
    const [editRecordId, setEditRecordId] = useState<number | null>(null);
    const [editDescription, setEditDescription] = useState("");
    const recordsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRAAsig() as { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[];
                setRecords(data);
                const dataCompetencia = await getCompetenciasAsig() as { id: number; descripcion: string; nivel: string; status: string, competenciaprograma: number, raAsignaturas: { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[] }[];
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
    const inactiveRecords = records.filter(record => record.estado !== "ACTIVO"); // Filtrar solo los RA inactivos
    const currentRecords = inactiveRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(inactiveRecords.length / recordsPerPage);

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleEdit = (record: { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string }) => {
        setEditRecordId(record.id);
        setEditDescription(record.descripcion);
        // setEditAssociatedCompetence(record.idCompetenciaPrograma);
    };

    const handleSave = async (id: number, idCompetenciaAsignatura: number, status: string) => {
        try {
            const updatedRA = await updateRAAsig({ id: id, descripcion: editDescription, idCompetenciaAsignatura: idCompetenciaAsignatura!, estado: status }) as { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string };
            setRecords(records.map(record => (record.id === id ? updatedRA : record)));
            setEditRecordId(null);
        } catch (error) {
            console.error('Error updating RA:', error);
        }
    };

    const handleActivate = async (record: { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string }) => {
        try {
            let id = record.id;
            let descripcion = record.descripcion;
            let idCompetenciaAsignatura = record.idCompetenciaAsignatura;
            let estado = "ACTIVO";
            if (id !== null) {
                const updatedRA = await updateRAAsig({ id: id, descripcion: descripcion, idCompetenciaAsignatura: idCompetenciaAsignatura!, estado: estado }) as { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string };
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
                                            value={competenciaRecords.find(competencia => competencia.id === record.idCompetenciaAsignatura)?.descripcion}
                                            readOnly
                                            className={styles.readonly}
                                        />
                                    </td>
                                    <td>
                                        {editRecordId === record.id ? (
                                            <button onClick={() => handleSave(record.id, record.idCompetenciaAsignatura, record.estado)}>Guardar</button>
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

export default InactivasRAAsig;