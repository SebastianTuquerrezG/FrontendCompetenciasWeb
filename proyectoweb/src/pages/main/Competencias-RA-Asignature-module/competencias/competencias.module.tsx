import { useEffect, useState } from "react";
import styles from "./module.module.css";
import { getCompetencias } from "@/services/Competencias_Ra_service/competencias.service";
import { deactivateCompetenciaAsig, getCompetenciasAsig, updateCompetenciaAsig } from "@/services/Competencias_Ra_service/competenciasAsig.service";
import { getRAAsig } from "@/services/Competencias_Ra_service/raAsig.service";

const CompetenciasAsignatura = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsProgram, setRecordsProgram] = useState<{ id: number; descripcion: string; nivel: string; estado: number }[]>([]);
    const [records, setRecords] = useState<{ id: number; descripcion: string; nivel: string; status: string, competenciaprograma: number, raAsignaturas: { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[] }[]>([]);
    const [loading, setLoading] = useState(true);
    const [editRecordId, setEditRecordId] = useState<number | null>(null);
    const [editDescription, setEditDescription] = useState("");
    const [editLevel, setEditLevel] = useState("");
    const [editIdPrograma, setIdPrograma] = useState(0);
    const [editRaAsignaturas, setRaAsignaturas] = useState<{ id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[]>([]);
    const recordsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCompetenciasAsig() as { id: number; descripcion: string; nivel: string; status: string, competenciaprograma: number, raAsignaturas: { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[] }[];
                const dataProgram = await getCompetencias() as { id: number; descripcion: string; nivel: string; estado: number }[];

                const raAsignaturas = await getRAAsig();
                const activeAsignaturas = (raAsignaturas as { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[]).filter((raAsignatura: { estado: string }) => raAsignatura.estado == "ACTIVO");

                setRaAsignaturas(activeAsignaturas);

                setRecords(data);
                setRecordsProgram(dataProgram);
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
    const activeRecords = records.filter(record => record.status == "ACTIVO"); // Filtrar solo las competencias activas
    const currentRecords = activeRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(activeRecords.length / recordsPerPage);

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
            const raAsignature = Array.isArray(editRaAsignaturas) ? editRaAsignaturas : [editRaAsignaturas];
            const updatedCompetencia = await updateCompetenciaAsig({ id, competenciaprograma: editIdPrograma, descripcion: editDescription, nivel: editLevel, status: "ACTIVO", raAsignaturas: raAsignature }) as { id: number; descripcion: string; nivel: string; status: string, competenciaprograma: number, raAsignaturas: { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[] };
            setRecords(records.map(record => (record.id === id ? updatedCompetencia : record)));
            setEditRecordId(null);
        } catch (error) {
            console.error('Error updating competencia:', error);
        }
    };

    const handleDeactivate = async (id: number) => {
        try {
            await deactivateCompetenciaAsig(id);
            setRecords(records.filter(record => record.id !== id));
        } catch (error) {
            console.error('Error deleting competencia:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.subdivstyle}>
            <div>
                <h3>Competencias de asignatura activas</h3>
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
                                <th>Nivel</th>
                                <th>Competencia Programa</th>
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
                                            onChange={(e) => { setEditDescription(e.target.value); setIdPrograma(record.competenciaprograma); }}
                                            readOnly={editRecordId !== record.id}
                                            className={editRecordId === record.id ? "editable" : "readonly"}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={editRecordId === record.id ? editLevel : record.nivel}
                                            onChange={(e) => { setEditLevel(e.target.value); setIdPrograma(record.competenciaprograma); }}
                                            disabled={editRecordId !== record.id}
                                            className={editRecordId === record.id ? "editable" : "readonly"} tabIndex={editRecordId === record.id ? 0 : -1}
                                        >
                                            <option value="BASICO">BASICO</option>
                                            <option value="INTERMEDIO">INTERMEDIO</option>
                                            <option value="AVANZADO">AVANZADO</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={recordsProgram.find(competencia => competencia.id === record.competenciaprograma)?.id}
                                            readOnly
                                            className="readonly"
                                        />
                                    </td>
                                    <td>
                                        {editRecordId === record.id ? (
                                            <button onClick={() => handleSave(record.id)}>Guardar</button>
                                        ) : (
                                            <button onClick={() => handleEdit(record)}>Editar</button>
                                        )}
                                        <button onClick={() => handleDeactivate(record.id)}>Desactivar</button>
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

export default CompetenciasAsignatura;