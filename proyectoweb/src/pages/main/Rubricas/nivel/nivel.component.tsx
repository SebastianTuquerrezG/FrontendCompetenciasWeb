import { useEffect, useState } from "react";
import styles from "./nivel.module.css";
import { getNivel } from "@/services/Rubrica/nivel.service";
import { getCriterio } from "@/services/Rubrica/criterio.service";

const NivelModule = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [records, setRecords] = useState<{ id: number; nombre: string; descripcion: string; criterioEvaluacionId: number; rangoMin: number; rangoMax: number; }[]>([]);
    const [loading, setLoading] = useState(true);
    const [editCriterios, setCriterios] = useState<{ id: number; descripcion: string; ponderacion: number; rubricaId: number; estado: string }[]>([]);
    const recordsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getNivel() as { id: number; nombre: string; descripcion: string; criterioEvaluacionId: number; rangoMin: number; rangoMax: number; }[];
                const dataCriterios = await getCriterio() as { id: number; descripcion: string; ponderacion: number; rubricaId: number; estado: string }[];

                setCriterios(dataCriterios);

                setRecords(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching raAsignaturas:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const activeRecords = editCriterios.filter(record => record.estado == "ACTIVO"); // Filtrar solo las competencias activas
    const currentRecords = activeRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(activeRecords.length / recordsPerPage);

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.subdivstyle}>
            <div>
                <h3>Criterios de Evaluación</h3>
            </div>
            <div className="table">
                {activeRecords.length === 0 ? (
                    <p>No se encontraron registros</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Categoría</th>
                                <th>Descripción</th>
                                <th>Criterio de Evaluación</th>
                                <th>Rango Minimo</th>
                                <th>Rango Maximo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record) => (
                                <tr key={record.id}>
                                    <td>{record.id}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={record.nombre}
                                            readOnly
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={record.descripcion}
                                            readOnly
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editCriterios.find(competencia => competencia.id === record.criterioEvaluacionId)?.descripcion}
                                            readOnly
                                            className="readonly"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={record.rangoMin}
                                            readOnly
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={record.rangoMax}
                                            readOnly
                                        />
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

export default NivelModule;