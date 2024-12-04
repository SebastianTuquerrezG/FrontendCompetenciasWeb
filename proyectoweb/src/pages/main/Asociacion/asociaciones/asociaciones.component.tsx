import { useEffect, useState } from "react";
import styles from "./asociaciones.module.css";
import { getAsociacion } from "@/services/Asociacion/asociacion.service";
import { getCompetenciasAsig } from "@/services/Competencias_Ra_service/competenciasAsig.service";
import { getAsignaturas } from "@/services/Asignaturas/asignaturas.service";
import { getTeachers } from "@/services/Teachers_service/teachers.service";

const Asociaciones = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [records, setRecords] = useState<{ id: number; id_asignatura: number; id_competencia_asignatura: number; id_teacher: number; periodo: string; }[]>([]);
    const [loading, setLoading] = useState(true);
    const [competenciaAsig, setCompetenciaAsig] = useState<{ id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[]>([]);
    const [asignaturas, setAsignaturas] = useState<{ id: number; nombre: string; creditos: number; objetivos: string; semestre: number; status: string; created_at: Date; updated_at: Date }[]>([]);
    const [docente, setDocente] = useState<{ id: number; identificationType: string; teacherType: string; names: string; lastNames: string; identification: string; title: string; status: string  }[]>([]);
    const recordsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAsociacion() as { id: number; id_asignatura: number; id_competencia_asignatura: number; id_teacher: number; periodo: string; }[];
                const dataCompetenciasAsig = await getCompetenciasAsig() as { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[];
                const dataAsignaturas = await getAsignaturas() as { id: number; nombre: string; creditos: number; objetivos: string; semestre: number; status: string; created_at: Date; updated_at: Date }[];
                const dataDocentes = await getTeachers() as { id: number; identificationType: string; teacherType: string; names: string; lastNames: string; identification: string; title: string; status: string  }[];

                setCompetenciaAsig(dataCompetenciasAsig);
                setAsignaturas(dataAsignaturas);
                setDocente(dataDocentes);
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
    const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(records.length / recordsPerPage);

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.subdivstyle}>
            <div>
                <h3>Asociaciones activas</h3>
            </div>
            <div className="table">
                {records.length === 0 ? (
                    <p>No se encontraron registros</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Asignatura</th>
                                <th>Competencia de Asignatura</th>
                                <th>Docente</th>
                                <th>Periodo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((record) => (
                                <tr key={record.id}>
                                    <td>{record.id}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={asignaturas.find(asignaturas => asignaturas.id === record.id_asignatura)?.nombre}
                                            readOnly
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={competenciaAsig.find(competencia => competencia.id === record.id_competencia_asignatura)?.descripcion}
                                            readOnly
                                            className="readonly"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={docente.find(docente => docente.id === record.id_teacher)?.names}
                                            readOnly
                                            className="readonly"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={record.periodo}
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
            {currentRecords.length > 0 && (
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

export default Asociaciones;