import axios from 'axios';
import productoService from './productoService'; 
import * as categoriasRepo from './categorias'; 

// URL base (Confirmada por tus archivos rescatados)
const API_URL = 'https://back-m41x.onrender.com/api';

// --- HELPER DE AUTENTICACIÓN (CORREGIDO PARA TU AUTH CONTEXT) ---
const getAuthHeaders = () => {
    // 1. CORRECCIÓN CRÍTICA: Usamos 'user' porque así lo guarda tu AuthContext
    const storedUser = localStorage.getItem('user'); 
    
    if (!storedUser) return {};

    try {
        const parsedUser = JSON.parse(storedUser);
        
        // 2. EXTRACCIÓN DEL TOKEN:
        // Asumimos que tu backend devuelve algo como { token: "...", user: {...} }
        // Si el token viene con otro nombre (ej: accessToken), cámbialo aquí.
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
    
    // --- CATEGORÍAS (Mock) ---
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
                // Ruta corregida: /usuarios (según rescate)
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
                // Ruta corregida: /pedidos (según rescate)
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
                // Llamamos a los endpoints reales
                const [prod, us, ped] = await Promise.all([
                    axios.get(`${API_URL}/productos`),
                    axios.get(`${API_URL}/usuarios`, getAuthHeaders()).catch(() => ({ data: [] })),
                    axios.get(`${API_URL}/pedidos`, getAuthHeaders()).catch(() => ({ data: [] }))
                ]);

                // Robustez: Verificamos si la data viene directa o anidada
                const productos = Array.isArray(prod.data) ? prod.data : (prod.data.productos || []);
                const usuarios = Array.isArray(us.data) ? us.data : (us.data.usuarios || []);
                const pedidos = Array.isArray(ped.data) ? ped.data : (ped.data.pedidos || []);

                return {
                    ventas: pedidos.length * 15000, // Simulación de monto
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