import { useEffect, useState } from "react";
import styles from "./rubricas.module.css";
import { deleteRubricas, getRubricas, updateRubricas } from "@/services/Rubrica/rubricas.service";
import { getRAAsig } from "@/services/Competencias_Ra_service/raAsig.service";

const Rubricas = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [records, setRecords] = useState<{ id: number; nombre: string; raAsignaturaId: number; estado: string;  createAt: Date, updateAt: Date;}[]>([]);
    const [loading, setLoading] = useState(true);
    const [editRecordId, setEditRecordId] = useState<number | null>(null);
    const [editDescription, setEditDescription] = useState("");
    const [editRaAsignaturas, setRaAsignaturas] = useState<{ id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[]>([]);
    const recordsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRubricas() as { id: number; nombre: string; raAsignaturaId: number; estado: string; createAt: Date, updateAt: Date  }[];
                const raAsignaturas = await getRAAsig();
                const activeAsignaturas = (raAsignaturas as { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[]).filter((raAsignatura: { estado: string }) => raAsignatura.estado == "ACTIVO");

                setRaAsignaturas(activeAsignaturas);

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
    const activeRecords = records.filter(record => record.estado == "ACTIVO"); // Filtrar solo las competencias activas
    const currentRecords = activeRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(activeRecords.length / recordsPerPage);

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleEdit = (record: { id: number; nombre: string; raAsignaturaId: number; estado: string; }) => {
        setEditRecordId(record.id);
        setEditDescription(record.nombre);
    };

    const handleSave = async (id: number, raAsignaturaId: number, createAt: Date, updateAt: Date) => {
        try {
            const updatedRubrica = await updateRubricas({ id, nombre: editDescription, raAsignaturaId: raAsignaturaId, estado: "ACTIVO", createAt: createAt, updateAt: updateAt}) as { id: number; nombre: string; raAsignaturaId: number; estado: string;  createAt: Date, updateAt: Date };
            console.log(JSON.stringify(updatedRubrica))
            setRecords(records.map(record => (record.id === id ? updatedRubrica : record)));
            setEditRecordId(null);
        } catch (error) {
            console.error('Error updating competencia:', error);
        }
    };

    const handleDeactivate = async (id: number) => {
        try {
            await deleteRubricas(id);
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
                                <th>Resultado de Aprendizaje</th>
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
                                            value={editRecordId === record.id ? editDescription : record.nombre}
                                            onChange={(e) => { setEditDescription(e.target.value); }}
                                            readOnly={editRecordId !== record.id}
                                            className={editRecordId === record.id ? "editable" : "readonly"}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editRaAsignaturas.find(competencia => competencia.id === record.raAsignaturaId)?.descripcion}
                                            readOnly
                                            className="readonly"
                                        />
                                    </td>
                                    <td>
                                        {editRecordId === record.id ? (
                                            <button onClick={() => handleSave(record.id, record.raAsignaturaId, record.createAt, record.updateAt)}>Guardar</button>
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
}

export default Rubricas;