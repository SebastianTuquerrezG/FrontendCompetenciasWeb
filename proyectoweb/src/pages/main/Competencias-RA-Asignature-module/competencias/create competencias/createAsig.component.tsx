import { useEffect, useState } from "react";
import styles from "./createAsig.module.css";
import { createCompetenciaAsig, updateCompetenciaAsig } from "@/services/Competencias_Ra_service/competenciasAsig.service";
import { getCompetencias } from "@/services/Competencias_Ra_service/competencias.service";
import { createRAAsig } from "@/services/Competencias_Ra_service/raAsig.service";


interface CreateComponentProps {
    onCreate: (
        competencia: { 
            id: number; 
            associatedCompetence: { id: number; descripcion: string; nivel: string; estado: number }; 
            descripcion: string; 
            nivel: string; 
            estado: string, 
            raAsignaturas: { id:number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[]
        }
    ) => void;
    onCancel: () => void;
}

const CreateComponentAsig: React.FC<CreateComponentProps> = ({ onCreate, onCancel }) => {
    const [descripcion, setDescription] = useState("");
    const [descripcionRA, setDescripcionRA] = useState("");
    const [nivel, setLevel] = useState("");
    const [estado, setStatus] = useState("ACTIVO");
    const [competencias, setCompetencias] = useState<{ id: number; descripcion: string; nivel: string; estado: number }[]>([]);
    const [associatedCompetence, setAssociatedCompetence] = useState<{ id: number; descripcion: string; nivel: string; estado: number } | null>(null);

    useEffect(() => {
        const fetchCompetencias = async () => {
            try {
                const data = await getCompetencias();
                const activeCompetencias = (data as { id: number; descripcion: string; nivel: string; estado: number }[]).filter((competencia: { estado: number }) => competencia.estado === 1);
                setCompetencias(activeCompetencias);
            } catch (error) {
                console.error('Error fetching competencias:', error);
            }
        };

        fetchCompetencias();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!associatedCompetence) {
            console.error('No se ha seleccionado una competencia');
            return;
        }
        try {
            const associatedCompetenceData = associatedCompetence.id;

            const newCompetencia = await createCompetenciaAsig({ competenciaprograma: associatedCompetenceData, descripcion, nivel, status: estado, raAsignaturas:[] }) as { id:number, associatedCompetence: number, descripcion: string, nivel: string, estado: string, raAsignaturas: { id:number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[]};
            
            const newRAAsig = await createRAAsig({ descripcion: descripcionRA, idCompetenciaAsignatura: newCompetencia.id, estado: estado }) as {id: number, descripcion: string, idCompetenciaAsignatura: number, estado: string}[];
            
            const raAsignature = Array.isArray(newRAAsig) ? newRAAsig : [newRAAsig];
            const updateCompetencia = await updateCompetenciaAsig({id: newCompetencia.id, competenciaprograma: associatedCompetenceData, descripcion, nivel, status: estado, raAsignaturas: raAsignature }) as { id:number, associatedCompetence: number, descripcion: string, nivel: string, estado: number, raAsignaturas: { id:number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[]};

                //{ id: newRA.id, descripcion: newRA.descripcion, associatedCompetence: associatedCompetence, estado: newRA.estado }
            onCreate({id: newCompetencia.id, associatedCompetence: associatedCompetence, descripcion: newCompetencia.descripcion, nivel: newCompetencia.nivel, estado: newCompetencia.estado, raAsignaturas: raAsignature}); // Llama a la función de callback cuando se complete la creación
        } catch (error) {
            console.error('Error creating competencia:', error);
        }
    };

    return (
        <div className={styles.subdivstyle}>
            <h2>Crear Competencia</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <label>Nivel</label>
                    <select
                        className={styles.select}
                        value={nivel}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un nivel</option>
                        <option value="BASICO">BASICO</option>
                        <option value="INTERMEDIO">INTERMEDIO</option>
                        <option value="AVANZADO">AVANZADO</option>
                    </select>
                    <label>Selecciona una competencia de programa</label>
                    <select
                        className={styles.select}
                        value={associatedCompetence ? associatedCompetence.id : ""}
                        onChange={(e) => {
                            const selectedCompetence = competencias.find(comp => comp.id === parseInt(e.target.value));
                            setAssociatedCompetence(selectedCompetence || null);
                        }}
                        required
                    >
                        <option value="">Seleccione una competencia</option>
                        {competencias.map(comp => (
                            <option key={comp.id} value={comp.id}>
                                {comp.descripcion}
                            </option>
                        ))}
                    </select>
                    <h2>Crear Resultado de Aprendizaje</h2>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        value={descripcionRA}
                        onChange={(e) => setDescripcionRA(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>Volver</button>
            </form>
        </div>
    );
};

export default CreateComponentAsig;