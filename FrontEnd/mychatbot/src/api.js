// api.js
import axios from 'axios';
import { BASE_URL } from './config';

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchTestData = async () => {
  try {
    // Asume que existe un endpoint '/test' en tu backend
    const response = await api.get('/test');
    return response.data; // Devuelve los datos recibidos del backend
  } catch (error) {
    console.error('Error fetching test data:', error);
    return null; // Maneja el error como consideres necesario
  }
};

export default api;
