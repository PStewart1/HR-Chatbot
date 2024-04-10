// api.js
import axios from 'axios';
import { BASE_URL } from './config';

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchTestData = async () => {
  try {
    const response = await api.get('/test');
    return response.data; // Devuelve los datos recibidos del backend
  } catch (error) {
    console.error('Error fetching test data:', error);
    return null; 
  }
};

export default api;
