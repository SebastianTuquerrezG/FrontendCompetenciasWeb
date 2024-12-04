import { useEffect, useState } from "react";
import styles from "./createRa.module.css";
import { createRAAsig } from "@/services/Competencias_Ra_service/raAsig.service";
import { getCompetenciasAsig } from "@/services/Competencias_Ra_service/competenciasAsig.service";

interface CreateRaComponentProps {
    onCreate: (ra: { id: number; descripcion: string; associatedCompetence: { id: number; descripcion: string; nivel: string; status: string, competenciaprograma: number, raAsignaturas: { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[]}, estado: string }) => void;
    onCancel: () => void;
}

const CreateRaComponentAsig: React.FC<CreateRaComponentProps> = ({ onCreate, onCancel }) => {
    const [descripcion, setDescripcion] = useState("");
    const [associatedCompetence, setAssociatedCompetence] = useState<{ id: number; descripcion: string; nivel: string; status: string, competenciaprograma: number, raAsignaturas: { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[] } | null>(null);
    const [competencias, setCompetencias] = useState<{ id: number; descripcion: string; nivel: string; status: string, competenciaprograma: number, raAsignaturas: { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[] }[]>([]);

    useEffect(() => {
        const fetchCompetencias = async () => {
            try {
                const data = await getCompetenciasAsig() as { id: number; descripcion: string; nivel: string; status: string, competenciaprograma: number, raAsignaturas: { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[] }[];
                setCompetencias(data);
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

            const newRA = await createRAAsig({ descripcion: descripcion, idCompetenciaAsignatura: associatedCompetenceData, estado: "ACTIVO" }) as {id: number, descripcion: string, idCompetenciaAsignatura: number, estado: string};

            
            onCreate({ id: newRA.id, descripcion: newRA.descripcion, associatedCompetence: associatedCompetence, estado: newRA.estado }); // Llama a la función de callback cuando se complete la creación
        } catch (error) {
            console.error('Error creating RA:', error);
        }
    };

    return (
        <div className={styles.subdivstyle}>
            <h2>Crear Resultado de Aprendizaje</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />

                    <label>Selecciona una competencia</label>
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
                </div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>Volver</button>
            </form>
        </div>
    );
};

export default CreateRaComponentAsig;