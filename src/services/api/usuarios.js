import axios from 'axios';
import { API_URL } from '../../utils/constants';

const BASE_URL = `${API_URL}/usuarios`;

// Helper para headers (reutilizable)
const getAuthHeaders = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return {};
    try {
        const user = JSON.parse(storedUser);
        const token = user.token || user.accessToken || user.usuario?.token;
        return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    } catch (e) {
        return {};
    }
};

class UsuarioService {

    // Login (POST público)
    login(credentials) {
        return axios.post(`${BASE_URL}/login`, credentials);
    }

    // Registro (POST público)
    register(userData) {
        return axios.post(BASE_URL, userData);
    }

    // Obtener todos (GET privado - Admin)
    getUsuarios() {
        return axios.get(BASE_URL, getAuthHeaders());
    }

    // Eliminar (DELETE privado - Admin)
    deleteUsuario(id) {
        return axios.delete(`${BASE_URL}/${id}`, getAuthHeaders());
    }

    // Cambiar rol (PUT privado - Admin) - Agregado por utilidad
    cambiarRol(id, role) {
        return axios.put(`${BASE_URL}/${id}/role`, { role }, getAuthHeaders());
    }
}

export default new UsuarioService();