import { useEffect, useState } from "react";
import styles from "./create.module.css";
import { createRubricas } from "@/services/Rubrica/rubricas.service";
import { getRAAsig } from "@/services/Competencias_Ra_service/raAsig.service";


interface CreateComponentProps {
    onCreate: (
        competencia: { 
            id: number; 
            nombre: string;
            associatedRA: { id: number; descripcion: string; idCompetenciaAsignatura: string; estado: string };
            estado: string;
        }
    ) => void;
    onCancel: () => void;
}

const CreateRubrica = ({onCreate, onCancel}: CreateComponentProps) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescription] = useState("");
    const [descripcionRA, setDescripcionRA] = useState("");
    const [nivel, setLevel] = useState("");
    const [estado, setStatus] = useState("ACTIVO");
    const [rubricas, setRubricas] = useState<{ id: number; descripcion: string; nivel: string; estado: number }[]>([]);
    const [raAsignaturas, setRaAsignaturas] = useState<{ id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[]>([]);
    const [associatedRAAsig, setAssociatedRAAsig] = useState<{ id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; } | null>(null);

    useEffect(() => {
        const fetchCompetencias = async () => {
            try {
                const data = await getRAAsig() as { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[];
                setRaAsignaturas(data);
            } catch (error) {
                console.error('Error fetching competencias:', error);
            }
        };

        fetchCompetencias();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!associatedRAAsig) {
            console.error('No se ha seleccionado una competencia');
            return;
        }
        try {
            const associatedCompetenceData = associatedRAAsig.id;

            const newRubrica = await createRubricas({nombre, raAsignaturaId: associatedCompetenceData, estado: "ACTIVO"}) as {id: number; nombre: string; raAsignaturaId: number; estado: string;};
            
            // const newCompetencia = await createCompetenciaAsig({ competenciaprograma: associatedCompetenceData, descripcion, nivel, status: estado, raAsignaturas: [] }) as { id: number, associatedCompetence: number, descripcion: string, nivel: string, estado: string, raAsignaturas: { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[] };

            // const newRAAsig = await createRAAsig({ descripcion: descripcionRA, idCompetenciaAsignatura: newCompetencia.id, estado: estado }) as { id: number, descripcion: string, idCompetenciaAsignatura: number, estado: string }[];

            // const raAsignature = Array.isArray(newRAAsig) ? newRAAsig : [newRAAsig];
            // const updateCompetencia = await updateCompetenciaAsig({ id: newCompetencia.id, competenciaprograma: associatedCompetenceData, descripcion, nivel, status: estado, raAsignaturas: raAsignature }) as { id: number, associatedCompetence: number, descripcion: string, nivel: string, estado: number, raAsignaturas: { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string; }[] };

            //{ id: newRA.id, descripcion: newRA.descripcion, associatedCompetence: associatedCompetence, estado: newRA.estado }
            // onCreate({ id: newCompetencia.id, associatedCompetence: associatedCompetence, descripcion: newCompetencia.descripcion, nivel: newCompetencia.nivel, estado: newCompetencia.estado, raAsignaturas: raAsignature }); // Llama a la función de callback cuando se complete la creación
        } catch (error) {
            console.error('Error creating competencia:', error);
        }
    };

    return (
        <div className={styles.subdivstyle}>
            <h2>Crear Rubrica</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Nombre de la rúbrica:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />

                    <label>Nivel:</label>
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
                    <label>Ponderación:</label>
                    <select
                        className={styles.select}
                        value={nivel}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un porcentaje</option>
                        <option value="BASICO">10%</option>
                        <option value="INTERMEDIO">20%</option>
                        <option value="AVANZADO">30%</option>
                        <option value="BASICO">40%</option>
                        <option value="INTERMEDIO">50%</option>
                        <option value="AVANZADO">60%</option>
                        <option value="BASICO">70%</option>
                        <option value="INTERMEDIO">80%</option>
                        <option value="AVANZADO">90%</option>
                        <option value="AVANZADO">100%</option>
                    </select>
                    <label>Nota del Nivel de Desempeño:</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label>Descripción del Nivel de Desempeño:</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label>Selecciona una competencia de asignatura:</label>
                    <select
                        className={styles.select}
                        value={associatedRAAsig ? associatedRAAsig.id : ""}
                        onChange={(e) => {
                            const selectedCompetence = raAsignaturas.find(comp => comp.id === parseInt(e.target.value));
                            setAssociatedRAAsig(selectedCompetence || null);
                        }}
                        required
                    >
                        <option value="">Seleccione una competencia</option>
                        {raAsignaturas.map(comp => (
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
}

export default CreateRubrica;