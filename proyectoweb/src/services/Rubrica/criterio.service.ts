import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

export const getCriterio = async () => {
    try {
        const response = await axios.get(`${API_URL}/criterio`);
        return response.data;
    } catch (error) {
        console.error('Error fetching criterio:', error);
        throw error;
    }
};

export const createCriterio = async (criterio: { descripcion: string; ponderacion: number; rubricaId: number; estado: string; }) => {
    try {
        const response = await axios.post(`${API_URL}/criterio`, criterio);
        return response.data;
    } catch (error) {
        console.error('Error creating criterio:', error);
        throw error;
    }
};

export const updateCriterio = async (criterio: { id: number; identificationType: string; criterioType: string; names: string; lastNames: string; identification: string; title: string; status: string }) => {
    try {
        const response = await axios.put(`${API_URL}/criterio/${criterio.id}`, criterio);
        return response.data;
    } catch (error) {
        console.error('Error updating criterio:', error);
        throw error;
    }
};

export const deactivateCriterio = async (id: number) => {
    try {
        const response = await axios.put(`${API_URL}/criterio/status/${id}/INACTIVO`);
        return response.data;
    } catch (error) {
        console.error('Error deactivating criterio:', error);
        throw error;
    }
};

export const deleteCriterio = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/criterios/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting criterio:', error);
        throw error;
    }
};
