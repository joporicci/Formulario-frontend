import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axios';// Configuración de Axios
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado del usuario autenticado
  const [loading, setLoading] = useState(true); // Estado de carga
  const router = useRouter();

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/auth/check'); // Verifica autenticación en el backend
        setUser({ id: res.data.user_id }); // Guarda el ID del usuario autenticado
      } catch (err) {
        router.push('/');
        setUser(null); // Si falla, no hay usuario autenticado
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      await axiosInstance.post('/auth/login', credentials);
      const res = await axiosInstance.get('/auth/check'); // Obtén la información del usuario
      setUser({ id: res.data.userId });
      router.push('/business-form'); // Redirige después del login
    } catch (err) {
      throw new Error('Error al iniciar sesión');
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      setUser(null); // Limpia el usuario en el estado
      router.push('/login'); // Redirige al login
    } catch (err) {
      throw new Error('Error al cerrar sesión');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
