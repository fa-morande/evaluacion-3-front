import axios from 'axios';
import { API_URL } from '../../utils/constants';

const BASE_URL = `${API_URL}/productos`;

// Helper para headers
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

class ProductoService {
    
    getAllProductos() {
        return axios.get(BASE_URL);
    }

    createProducto(producto) {
        return axios.post(BASE_URL, producto, getAuthHeaders());
    }

    updateProducto(id, producto) {
        return axios.put(`${BASE_URL}/${id}`, producto, getAuthHeaders());
    }

    deleteProducto(id) {
        return axios.delete(`${BASE_URL}/${id}`, getAuthHeaders());
    }
}

export default new ProductoService();