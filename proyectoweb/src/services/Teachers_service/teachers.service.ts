import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

export const getTeachers = async () => {
    try {
        const response = await axios.get(`${API_URL}/teachers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching teachers:', error);
        throw error;
    }
};

export const createTeacher = async (teacher: { identificationType: string; teacherType: string; names: string; lastNames: string; identification: string; title: string; status: string}) => {
    try {
        const response = await axios.post(`${API_URL}/teachers`, teacher);
        return response.data;
    } catch (error) {
        console.error('Error creating teacher:', error);
        throw error;
    }
};

export const createUserTeacher = async (teacher: { identity: string; typeId: string; name: string; lastname: string; degree: string; email: string; username: string; password: string; phoneNumber: string; statusUser: string; role: string; }) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, teacher);
        return response.data;
    } catch (error) {
        console.error('Error creating teacher:', error);
        throw error;
    }
};

export const updateTeachers = async (teacher: { id: number; identificationType: string; teacherType: string; names: string; lastNames: string; identification: string; title: string; status: string }) => {
    try {
        const response = await axios.put(`${API_URL}/teachers/${teacher.id}`, teacher);
        return response.data;
    } catch (error) {
        console.error('Error updating teacher:', error);
        throw error;
    }
};

export const deactivateTeacher = async (id: number) => {
    try {
        const response = await axios.put(`${API_URL}/teachers/status/${id}/INACTIVO`);
        return response.data;
    } catch (error) {
        console.error('Error deactivating teacher:', error);
        throw error;
    }
};

export const deleteTeacher = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/teachers/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting teacher:', error);
        throw error;
    }
};
