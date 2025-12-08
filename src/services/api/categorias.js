import axios from 'axios';
import { API_URL } from '../../utils/constants';

const BASE_URL = `${API_URL}/categorias`;

// Si el backend no requiere token para ver categorías, no usamos getAuthHeaders en los GET
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

class CategoriaService {
    
    getAllCategorias() {
        return axios.get(BASE_URL);
    }

    getCategoriasActivas() {
        // Asumiendo que existe un endpoint filtro o filtrando en el cliente
        return axios.get(`${BASE_URL}?activa=true`);
    }

    createCategoria(data) {
        return axios.post(BASE_URL, data, getAuthHeaders());
    }

    updateCategoria(id, data) {
        return axios.put(`${BASE_URL}/${id}`, data, getAuthHeaders());
    }

    deleteCategoria(id) {
        return axios.delete(`${BASE_URL}/${id}`, getAuthHeaders());
    }
}

export default new CategoriaService();