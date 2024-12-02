import React, { useState, useEffect } from "react";
import styles from "./create.module.css";
import { createRA } from "@/services/Competencias_Ra_service/ra.service";
import { getCompetencias } from "@/services/Competencias_Ra_service/competencias.service";

interface CreateRaComponentProps {
    onCreate: (ra: { id: number; descripcion: string; associatedCompetence: { id: number; descripcion: string; nivel: string; estado: number }; estado: number }) => void;
    onCancel: () => void;
}

const CreateRaComponent: React.FC<CreateRaComponentProps> = ({ onCreate, onCancel }) => {
    const [descripcion, setDescripcion] = useState("");
    const [associatedCompetence, setAssociatedCompetence] = useState<{ id: number; descripcion: string; nivel: string; estado: number } | null>(null);
    const [competencias, setCompetencias] = useState<{ id: number; descripcion: string; nivel: string; estado: number }[]>([]);

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
            const associatedCompetenceData = { id: associatedCompetence.id, descripcion: associatedCompetence.descripcion, nivel: associatedCompetence.nivel, estado: associatedCompetence.estado };

            const newRA = await createRA({ descripcion, idCompetenciaPrograma: associatedCompetenceData, estado: 1 }) as { id: number; descripcion: string; associatedCompetence: { id: number; descripcion: string; nivel: string; estado: number }; estado: number };

            console.log("Resultado de aprendizaje creado:", newRA);
            onCreate({ id: newRA.id, descripcion: newRA.descripcion, associatedCompetence: associatedCompetenceData, estado: newRA.estado }); // Llama a la función de callback cuando se complete la creación
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
                        value={associatedCompetence ? JSON.stringify(associatedCompetence) : ""}
                        onChange={(e) => setAssociatedCompetence(JSON.parse(e.target.value))}
                        required
                    >
                        <option value="">Seleccione una competencia</option>
                        {competencias.map((competencia) => (
                            <option key={competencia.id} value={JSON.stringify(competencia)}>
                                {competencia.descripcion}
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

export default CreateRaComponent;