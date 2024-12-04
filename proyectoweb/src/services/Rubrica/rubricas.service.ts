import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

export const getRubricas = async () => {
    try {
        const response = await axios.get(`${API_URL}/rubrica`);
        return response.data;
    } catch (error) {
        console.error('Error fetching rubrica:', error);
        throw error;
    }
};

export const createRubricas = async (rubrica: { nombre: string; raAsignaturaId: number; estado: string; }) => {
    try {
        const response = await axios.post(`${API_URL}/rubrica`, rubrica);
        return response.data;
    } catch (error) {
        console.error('Error creating teacher:', error);
        throw error;
    }
};

export const updateRubricas = async (teacher: { id: number; identificationType: string; teacherType: string; names: string; lastNames: string; identification: string; title: string; status: string }) => {
    try {
        const response = await axios.put(`${API_URL}/rubrica/${teacher.id}`, teacher);
        return response.data;
    } catch (error) {
        console.error('Error updating teacher:', error);
        throw error;
    }
};

export const deactivateRubricas = async (id: number) => {
    try {
        const response = await axios.put(`${API_URL}/rubrica/status/${id}/INACTIVO`);
        return response.data;
    } catch (error) {
        console.error('Error deactivating teacher:', error);
        throw error;
    }
};

export const deleteRubricas = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/teachers/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting teacher:', error);
        throw error;
    }
};
