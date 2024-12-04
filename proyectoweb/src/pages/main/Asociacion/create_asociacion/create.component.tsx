import { useEffect, useState } from "react";
import styles from "./create.module.css";
import { getCompetenciasAsig } from "@/services/Competencias_Ra_service/competenciasAsig.service";
import { getAsignaturas } from "@/services/Asignaturas/asignaturas.service";
import { getTeachers } from "@/services/Teachers_service/teachers.service";
import { createasociacion } from "@/services/Asociacion/asociacion.service";


interface CreateComponentProps {
    onCreate: (
        asociacion: { id: number; id_asignatura: number; id_competencia_asignatura: number; id_teacher: number; periodo: string; }
    ) => void;
    onCancel: () => void;
}


const CreateAsociacion = ({ onCreate, onCancel }: CreateComponentProps) => {
    const [periodo, setPeriodo] = useState("");
    const [competenciaAsig, setCompetenciaAsig] = useState<{ id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[]>([]);
    const [asignaturas, setAsignaturas] = useState<{ id: number; nombre: string; creditos: number; objetivos: string; semestre: number; status: string; created_at: Date; updated_at: Date }[]>([]);
    const [docente, setDocente] = useState<{ id: number; identificationType: string; teacherType: string; names: string; lastNames: string; identification: string; title: string; status: string  }[]>([]);
    const [editIdAsignatura, setIdAsignatura] = useState<number | null>(null);
    const [editIdCompAsignatura, setIdCompAsignatura] = useState<number | null>(null);
    const [editIdDocente, setIdDocente] = useState<number | null>(null);

    useEffect(() => {
        const fetchCompetencias = async () => {
            try {
                const dataCompetenciasAsig = await getCompetenciasAsig() as { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[];
                const dataAsignaturas = await getAsignaturas() as { id: number; nombre: string; creditos: number; objetivos: string; semestre: number; status: string; created_at: Date; updated_at: Date }[];
                const dataDocentes = await getTeachers() as { id: number; identificationType: string; teacherType: string; names: string; lastNames: string; identification: string; title: string; status: string  }[];

                setCompetenciaAsig(dataCompetenciasAsig);
                setAsignaturas(dataAsignaturas);
                setDocente(dataDocentes);
            } catch (error) {
                console.error('Error fetching competencias:', error);
            }
        };

        fetchCompetencias();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if(!editIdAsignatura || !editIdCompAsignatura || !editIdDocente){
                throw new Error("IDs are not valid.");
            }
            const newAsociacion = await createasociacion({id_asignatura: editIdAsignatura, id_competencia_asignatura: editIdCompAsignatura, id_teacher: editIdDocente, periodo: periodo}) as { id: number; id_asignatura: number; id_competencia_asignatura: number; id_teacher: number; periodo: string; };
            onCreate(newAsociacion);
        } catch (error) {
            console.error('Error creating competencia:', error);
        }
    };

    return (
        <div className={styles.subdivstyle}>
            <h2>Crear Asociacion</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Competencia de Asignatura:</label>
                    <select
                        className={styles.select}
                        value={editIdCompAsignatura? editIdCompAsignatura : ""}
                        onChange={(e) => {
                            const selectedCompetence = competenciaAsig.find(comp => comp.id === parseInt(e.target.value))?.id;
                            setIdCompAsignatura(selectedCompetence || null);
                        }}
                        required
                    >
                        <option value="">Seleccione una Competencia de asignatura</option>
                        {competenciaAsig.map(comp => (
                            <option key={comp.id} value={comp.id}>
                                {comp.descripcion}
                            </option>
                        ))}
                    </select>
                    <label>Asignatura:</label>
                    <select
                        className={styles.select}
                        value={editIdAsignatura ? editIdAsignatura : ""}
                        onChange={(e) => {
                            const selectedCompetence = asignaturas.find(comp => comp.id === parseInt(e.target.value))?.id;
                            setIdAsignatura(selectedCompetence || null);
                        }}
                        required
                    >
                        <option value="">Seleccione una Asignatura</option>
                        {asignaturas.map(comp => (
                            <option key={comp.id} value={comp.id}>
                                {comp.nombre}
                            </option>
                        ))}
                    </select>
                    <label>Docente:</label>
                    <select
                        className={styles.select}
                        value={editIdDocente ? editIdDocente : ""}
                        onChange={(e) => {
                            const selectedCompetence = docente.find(comp => comp.id === parseInt(e.target.value))?.id;
                            setIdDocente(selectedCompetence || null);
                        }}
                        required
                    >
                        <option value="">Seleccione un Docente</option>
                        {docente.map(comp => (
                            <option key={comp.id} value={comp.id}>
                                {comp.names} {comp.lastNames}
                            </option>
                        ))}
                    </select>
                    <h2>Periodo Académico</h2>
                    <label>Periodo:</label>
                    <input
                        type="text"
                        value={periodo}
                        onChange={(e) => setPeriodo(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>Volver</button>
            </form>
        </div>
    );
}

export default CreateAsociacion;