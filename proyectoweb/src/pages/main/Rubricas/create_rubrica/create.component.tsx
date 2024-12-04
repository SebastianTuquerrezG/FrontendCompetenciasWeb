import { useEffect, useState } from "react";
import styles from "./create.module.css";
import { createRubricas } from "@/services/Rubrica/rubricas.service";
import { getRAAsig } from "@/services/Competencias_Ra_service/raAsig.service";
import { createCriterio } from "@/services/Rubrica/criterio.service";
import { createNivel } from "@/services/Rubrica/nivel.service";


interface CreateComponentProps {
    onCreate: (
        competencia: {
            id: number;
            nombre: string;
            associatedRA: { id: number; descripcion: string; idCompetenciaAsignatura: number; estado: string };
            estado: string;
        }
    ) => void;
    onCancel: () => void;
}

const CreateRubrica = ({ onCreate, onCancel }: CreateComponentProps) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescription] = useState("");
    const [ponderado, setPonderado] = useState(0);
    const [descripcionCriterio, setDescripcionCriterio] = useState("");
    const [nivel, setLevel] = useState("");
    const [estado, setStatus] = useState("ACTIVO");
    const [rangoMin, setRangoMin] = useState(0);
    const [rangoMax, setRangoMax] = useState(0);
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

            const newRubrica = await createRubricas({ nombre, raAsignaturaId: associatedCompetenceData, estado }) as { id: number; nombre: string; raAsignaturaId: number; estado: string; };
            console.log("Rubrica: " + JSON.stringify(newRubrica));
            const newCriterio = await createCriterio({descripcion: descripcionCriterio, ponderacion: ponderado, rubricaId: newRubrica.id, estado }) as {id: number; descripcion: string; ponderacion: number; rubricaId: number; estado: string};
            console.log("Criterio: " + JSON.stringify(newCriterio));
            const newNivel = await createNivel({nombre: nivel, descripcion: descripcion, criterioEvaluacionId: newCriterio.id, rangoMin, rangoMax});
            console.log("Nivel: " + JSON.stringify(newNivel)); 
            onCreate({ id: newRubrica.id, nombre: newRubrica.nombre, associatedRA: associatedRAAsig, estado: newRubrica.estado }); // Llama a la función de callback cuando se complete la creación
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
                    <h2>Crear Criterio de Evaluación</h2>
                    <label>Descripción del Criterio de Evaluación:</label>
                    <input
                        type="text"
                        value={descripcionCriterio}
                        onChange={(e) => setDescripcionCriterio(e.target.value)}
                        required
                    />

                    <label>Ponderación:</label>
                    <select
                        className={styles.select}
                        value={ponderado}
                        onChange={(e) => setPonderado(parseInt(e.target.value))}
                        required
                    >
                        <option value="">Seleccione un porcentaje</option>
                        <option value={10}>10%</option>
                        <option value={20}>20%</option>
                        <option value={30}>30%</option>
                        <option value={40}>40%</option>
                        <option value={50}>50%</option>
                        <option value={60}>60%</option>
                        <option value={70}>70%</option>
                        <option value={80}>80%</option>
                        <option value={90}>90%</option>
                        <option value={100}>100%</option>
                    </select>
                    <h2>Crear Nivel de Desempeño</h2>
                    <label>Categoría:</label>
                    <select
                        className={styles.select}
                        value={nivel}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                    >
                        <option value="">Seleccione una categoría</option>
                        <option value="EXCELENTE">EXCELENTE</option>
                        <option value="BUENO">BUENO</option>
                        <option value="REGULAR">REGULAR</option>
                        <option value="DEFICIENTE">DEFICIENTE</option>
                    </select>
                    <label>Descripción del Nivel de Desempeño:</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label>Rango minimo:</label>
                    <input
                        type="text"
                        value={rangoMin}
                        onChange={(e) => setRangoMin(parseFloat(e.target.value))}
                        required
                    />
                    <label>Rango máximo:</label>
                    <input
                        type="text"
                        value={rangoMax}
                        onChange={(e) => setRangoMax(parseFloat(e.target.value))}
                        required
                    />
                    <h2>Asignar Resultado de Aprendizaje </h2>
                    <label>Selecciona un resultado de aprendizaje de asignatura:</label>
                    <select
                        className={styles.select}
                        value={associatedRAAsig ? associatedRAAsig.id : ""}
                        onChange={(e) => {
                            const selectedCompetence = raAsignaturas.find(comp => comp.id === parseInt(e.target.value));
                            setAssociatedRAAsig(selectedCompetence || null);
                        }}
                        required
                    >
                        <option value="">Seleccione una RA</option>
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