// services/ra.service.ts
import axios from 'axios';

const API_URL = 'http://localhost:8081/api'; 
export const getRA = async () => {
  try {
    const response = await axios.get(`${API_URL}/ra-programa`);
    return response.data;
  } catch (error) {
    console.error('Error fetching RA:', error);
    throw error;
  }
};

export const createRA = async (ra: { descripcion: string; idCompetenciaPrograma: { id: number; descripcion: string; nivel: string; estado: number}; estado: 1 }) => {
  try {
    console.log(ra);
    const response = await axios.post(`${API_URL}/ra-programa`, ra);
    return response.data;
  } catch (error) {
    console.error('Error creating RA:', error);
    throw error;
  }
};

export const updateRA = async (ra: { id: number, descripcion: string; idCompetenciaPrograma: { id: number; descripcion: string; nivel: string; estado: number}, estado: number }) => {
  try {
    const response = await axios.put(`${API_URL}/ra-programa/${ra.id}`, ra);
    return response.data;
  } catch (error) {
    console.error('Error updating RA:', error);
    throw error;
  }
};

export const deactivateRA = async (id: number) => {
  try {
    const response = await axios.put(`${API_URL}/ra-programa/${id}`, { estado: 0 });
    return response.data;
  } catch (error) {
    console.error('Error deactivating RA:', error);
    throw error;
  }
};

export const deleteRA = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/ra-programa/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting RA:', error);
    throw error;
  }
};