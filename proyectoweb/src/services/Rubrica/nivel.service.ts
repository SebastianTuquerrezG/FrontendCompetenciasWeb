import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

export const getNivel = async () => {
    try {
        const response = await axios.get(`${API_URL}/nivel`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Nivel:', error);
        throw error;
    }
};

export const createNivel = async (Nivel: { nombre: string; descripcion: string; criterioEvaluacionId: number; rangoMin: number; rangoMax: number; }) => {
    try {
        const response = await axios.post(`${API_URL}/nivel`, Nivel);
        return response.data;
    } catch (error) {
        console.error('Error creating Nivel:', error);
        throw error;
    }
};

export const updateNivel = async (Nivel: { id: number; identificationType: string; NivelType: string; names: string; lastNames: string; identification: string; title: string; status: string }) => {
    try {
        const response = await axios.put(`${API_URL}/nivel/${Nivel.id}`, Nivel);
        return response.data;
    } catch (error) {
        console.error('Error updating Nivel:', error);
        throw error;
    }
};

export const deactivateNivel = async (id: number) => {
    try {
        const response = await axios.put(`${API_URL}/nivel/status/${id}/INACTIVO`);
        return response.data;
    } catch (error) {
        console.error('Error deactivating Nivel:', error);
        throw error;
    }
};

export const deleteNivel = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/nivel/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting Nivel:', error);
        throw error;
    }
};
