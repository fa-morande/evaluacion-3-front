import axios from 'axios';
import { API_URL } from '../../utils/constants';

const BASE_URL = `${API_URL}/pedidos`;

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

const getUserId = () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        return user.id || user.usuario?.id; 
    } catch (e) {
        return null;
    }
};

class PedidoService {

    createPedido(pedidoData) {
        return axios.post(BASE_URL, pedidoData, getAuthHeaders());
    }

    // Obtener todos (Admin)
    getPedidos() {
        return axios.get(BASE_URL, getAuthHeaders());
    }

    // Obtener por usuario
    getPedidosPorUsuario(idUsuario) {
        const id = idUsuario || getUserId();
        if (!id) return Promise.reject("Usuario no identificado");
        
        return axios.get(`${BASE_URL}/usuario/${id}`, getAuthHeaders());
    }
    
    // Cambiar estado (Admin)
    cambiarEstado(id, estado) {
        return axios.put(`${BASE_URL}/${id}/estado?estado=${estado}`, {}, getAuthHeaders());
    }
}

export default new PedidoService();