import axios from 'axios';

const API_URL = 'http://localhost:8081/api'; 

export const getAsignaturas = async () => {
    try {
        const response = await axios.get(`${API_URL}/asignatura`);
        return response.data;
    } catch (error) {
        console.error('Error fetching asignatura:', error);
        throw error;
    }
};

export const createCompetencia = async (competencia: { descripcion: string; nivel: string; estado: number }) => {
    try {
        const response = await axios.post(`${API_URL}/asignatura`, competencia);
        return response.data;
    } catch (error) {
        console.error('Error creating competencia:', error);
        throw error;
    }
};

export const updateCompetencia = async (competencia: { id: number; descripcion: string; nivel: string; estado: number }) => {
    try {
        const response = await axios.put(`${API_URL}/asignatura/${competencia.id}`, competencia);
        return response.data;
    } catch (error) {
        console.error('Error updating competencia:', error);
        throw error;
    }
};

export const deactivateCompetencia = async (id: number) => {
    try {
        const response = await axios.put(`${API_URL}/asignatura/${id}`, { estado: 0 });
        return response.data;
    } catch (error) {
        console.error('Error deactivating competencia:', error);
        throw error;
    }
};

export const deleteCompetencia = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/asignatura/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting competencia:', error);
        throw error;
    }
};
