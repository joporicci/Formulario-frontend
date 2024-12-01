import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // URL base del backend
  withCredentials: true, // Habilitar el envío de cookies para autenticación
  headers: {
    'Content-Type': 'application/json', // Asegúrate de que el encabezado sea correcto
  },
});

export default axiosInstance;