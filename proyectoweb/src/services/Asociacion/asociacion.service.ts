import axios from 'axios';

const API_URL = 'http://localhost:8081/api'; 

export const getAsociacion = async () => {
    try {
        const response = await axios.get(`${API_URL}/asociacion`);
        return response.data;
    } catch (error) {
        console.error('Error fetching asociacion:', error);
        throw error;
    }
};

export const createasociacion = async (asociacion: { id_asignatura: number; id_competencia_asignatura: number; id_teacher: number; periodo: string; }) => {
    try {
        const response = await axios.post(`${API_URL}/asociacion`, asociacion);
        return response.data;
    } catch (error) {
        console.error('Error creating asociacion:', error);
        throw error;
    }
};

export const updateasociacion = async (asociacion: { id: number; descripcion: string; nivel: string; estado: number }) => {
    try {
        const response = await axios.put(`${API_URL}/asociacion/${asociacion.id}`, asociacion);
        return response.data;
    } catch (error) {
        console.error('Error updating asociacion:', error);
        throw error;
    }
};

export const deactivateasociacion = async (id: number) => {
    try {
        const response = await axios.put(`${API_URL}/asociacion/${id}`, { estado: 0 });
        return response.data;
    } catch (error) {
        console.error('Error deactivating asociacion:', error);
        throw error;
    }
};

export const deleteasociacion = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/asociacion/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting asociacion:', error);
        throw error;
    }
};
