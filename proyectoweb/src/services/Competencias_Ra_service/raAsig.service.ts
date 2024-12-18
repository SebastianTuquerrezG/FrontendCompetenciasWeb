// services/ra.service.ts
import axios from 'axios';

const API_URL = 'http://localhost:8081/api'; 
export const getRAAsig = async () => {
  try {
    const response = await axios.get(`${API_URL}/ra-asignatura`);
    return response.data;
  } catch (error) {
    console.error('Error fetching RA:', error);
    throw error;
  }
};

export const createRAAsig = async (ra: { descripcion: string; idCompetenciaAsignatura: number; estado: string }) => {
  try {
    const response = await axios.post(`${API_URL}/ra-asignatura`, ra);
    return response.data;
  } catch (error) {
    console.error('Error creating RA:', error);
    throw error;
  }
};

export const updateRAAsig = async (ra: { id: number, descripcion: string; idCompetenciaAsignatura:  number; estado: string }) => {
  try {
    console.log(ra);
    const response = await axios.put(`${API_URL}/ra-asignatura/${ra.id}`, ra);
    return response.data;
  } catch (error) {
    console.error('Error updating RA:', error);
    throw error;
  }
};

// export const deactivateRA = async (id: number) => {
//   try {
//     const response = await axios.put(`${API_URL}/ra-programa/${id}`, { estado: 0 });
//     return response.data;
//   } catch (error) {
//     console.error('Error deactivating RA:', error);
//     throw error;
//   }
// };

export const deleteRAAsig = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/ra-asignatura/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting RA:', error);
    throw error;
  }
};