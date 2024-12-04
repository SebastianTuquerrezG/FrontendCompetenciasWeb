import { useEffect, useState } from "react";
import styles from "./criterio.module.css";
import { getCriterio } from "@/services/Rubrica/criterio.service";
import { getRubricas } from "@/services/Rubrica/rubricas.service";

const CriterioModule = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [records, setRecords] = useState<{ id: number; descripcion: string; ponderacion: number; rubricaId: number; estado: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [editRubricas, setRubricas] = useState<{ id: number; nombre: string; raAsignaturaId: number; estado: string; createAt: Date, updateAt: Date  }[]>([]);
    const recordsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCriterio() as { id: number; descripcion: string; ponderacion: number; rubricaId: number; estado: string }[];
                const dataRubricas = await getRubricas() as { id: number; nombre: string; raAsignaturaId: number; estado: string; createAt: Date, updateAt: Date  }[];

                setRubricas(dataRubricas);

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
    const activeRecords = records.filter(record => record.estado == "ACTIVO"); // Filtrar solo las competencias activas
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
                                <th>Descripción</th>
                                <th>Ponderación</th>
                                <th>Rúbrica</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((record) => (
                                <tr key={record.id}>
                                    <td>{record.id}</td>
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
                                            value={record.ponderacion}
                                            readOnly
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editRubricas.find(competencia => competencia.id === record.rubricaId)?.nombre}
                                            readOnly
                                            className="readonly"
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

export default CriterioModule;