import axios from 'axios';

const API_URL = 'http://localhost:8081/api'; 

export const getCompetenciasAsig = async () => {
    try {
        const response = await axios.get(`${API_URL}/competenciasasignatura`);
        return response.data;
    } catch (error) {
        console.error('Error fetching competencias:', error);
        throw error;
    }
};

export const createCompetenciaAsig = async (competencia: { competenciaprograma: number; descripcion: string; nivel: string; status: string; raAsignaturas: [] }) => {
    try {
        console.log(JSON.stringify(competencia));
        const response = await axios.post(`${API_URL}/competenciasasignatura`, competencia);
        return response.data;
    } catch (error) {
        console.error('Error creating competencia:', error);
        throw error;
    }
};

export const updateCompetenciaAsig = async (competencia: { id: number; competenciaprograma: number; descripcion: string; nivel: string; status: string,  raAsignaturas: {id: number, descripcion: string, idCompetenciaAsignatura: number, estado: string}[] }) => {
    try {
        const response = await axios.put(`${API_URL}/competenciasasignatura`, competencia);
        return response.data;
    } catch (error) {
        console.error('Error updating competencia:', error);
        throw error;
    }
};

export const deactivateCompetenciaAsig = async (id: number) => {
    const status = "INACTIVO";
    try {
        const response = await axios.put(`${API_URL}/competenciasasignatura/status/${id}/${status}`);
        return response.data;
    } catch (error) {
        console.error('Error deactivating competencia:', error);
        throw error;
    }
};

export const deleteCompetenciaAsig = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/competenciasasignatura/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting competencia:', error);
        throw error;
    }
};
