// src/services/productoService.js
const API_BASE_URL = 'http://tu-api.com/api'; // Reemplaza con tu URL

export const productoService = {
  // Obtener todos los productos
    async obtenerProductos() {
        const response = await fetch(`${API_BASE_URL}/productos`);
        if (!response.ok) throw new Error('Error al obtener productos');
        return await response.json();
    },

    // Obtener producto por ID
    async obtenerProductoPorId(id) {
        const response = await fetch(`${API_BASE_URL}/productos/${id}`);
        if (!response.ok) throw new Error('Error al obtener producto');
        return await response.json();
    },

    // Obtener productos por categoría
    async obtenerProductosPorCategoria(categoria) {
        const response = await fetch(`${API_BASE_URL}/productos?categoria=${categoria}`);
        if (!response.ok) throw new Error('Error al obtener productos por categoría');
        return await response.json();
    },

    // Buscar productos
    async buscarProductos(termino) {
        const response = await fetch(`${API_BASE_URL}/productos?search=${termino}`);
        if (!response.ok) throw new Error('Error al buscar productos');
        return await response.json();
    }
};