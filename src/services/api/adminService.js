import axios from 'axios';
import productoService from './productoService'; 
import * as categoriasRepo from './categorias'; 

const API_URL = 'https://back-m41x.onrender.com/api';

const getAuthHeaders = () => {
    const storedUser = localStorage.getItem('user'); 
    
    if (!storedUser) return {};

    try {
        const parsedUser = JSON.parse(storedUser);
        
        const token = parsedUser.token; 

        if (!token) console.warn("⚠️ No se encontró token en el objeto user guardado");

        return { 
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            } 
        };
    } catch (error) {
        console.error("Error leyendo token:", error);
        return {};
    }
};

export const adminService = {
    // --- PRODUCTOS ---
    productos: {
        getAll: async () => {
            const response = await axios.get(`${API_URL}/productos`);
            return response.data; 
        },
        create: async (data) => {
            const response = await axios.post(`${API_URL}/productos`, data, getAuthHeaders());
            return response.data;
        },
        update: async (id, data) => {
            const response = await axios.put(`${API_URL}/productos/${id}`, data, getAuthHeaders());
            return response.data;
        },
        delete: async (id) => {
            const response = await axios.delete(`${API_URL}/productos/${id}`, getAuthHeaders());
            return response.data;
        }
    },
    
    categorias: {
        getAll: categoriasRepo.getCategorias,
        getActivas: categoriasRepo.getCategoriasActivas,
        create: categoriasRepo.createCategoria,
        update: categoriasRepo.updateCategoria,
        delete: categoriasRepo.deleteCategoria
    },

    // --- USUARIOS ---
    usuarios: {
        getAll: async () => {
            try {
                const response = await axios.get(`${API_URL}/usuarios`, getAuthHeaders());
                return response.data;
            } catch (error) {
                console.error("Error obteniendo usuarios:", error);
                return []; 
            }
        },
        delete: async (id) => {
            const response = await axios.delete(`${API_URL}/usuarios/${id}`, getAuthHeaders());
            return response.data;
        },
        cambiarRol: async (id, nuevoRol) => {
            const response = await axios.put(`${API_URL}/usuarios/${id}/role?role=${nuevoRol}`, {}, getAuthHeaders());
            return response.data;
        }
    },

    // --- PEDIDOS ---
    pedidos: {
        getAll: async () => {
            try {
                const response = await axios.get(`${API_URL}/pedidos`, getAuthHeaders());
                return response.data;
            } catch (error) {
                console.error("Error obteniendo pedidos:", error);
                return [];
            }
        },
        create: async (data) => {
            const response = await axios.post(`${API_URL}/pedidos`, data, getAuthHeaders());
            return response.data;
        },
        cambiarEstado: async (id, estado) => {
            const response = await axios.put(`${API_URL}/pedidos/${id}/estado?estado=${estado}`, {}, getAuthHeaders());
            return response.data;
        }
    },

    // --- DASHBOARD (Cálculos Frontend) ---
    dashboard: {
        getStats: async () => {
            try {
                const [prod, us, ped] = await Promise.all([
                    axios.get(`${API_URL}/productos`),
                    axios.get(`${API_URL}/usuarios`, getAuthHeaders()).catch(() => ({ data: [] })),
                    axios.get(`${API_URL}/pedidos`, getAuthHeaders()).catch(() => ({ data: [] }))
                ]);
                const productos = Array.isArray(prod.data) ? prod.data : (prod.data.productos || []);
                const usuarios = Array.isArray(us.data) ? us.data : (us.data.usuarios || []);
                const pedidos = Array.isArray(ped.data) ? ped.data : (ped.data.pedidos || []);

                return {
                    ventas: pedidos.length * 15000,
                    pedidosPendientes: pedidos.filter(p => p.estado === 'pendiente').length,
                    usuarios: usuarios.length,
                    productos: productos.length
                };
            } catch (error) {
                console.error("Dashboard error:", error);
                return { ventas: 0, pedidosPendientes: 0, usuarios: 0, productos: 0 };
            }
        }
    }
};

export default adminService;