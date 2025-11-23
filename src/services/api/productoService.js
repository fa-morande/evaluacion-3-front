// src/services/api/ProductoService.js
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const BASE_URL = `${API_URL}/productos`;

class ProductoService {
    /* --> Listar todos los productos */
    getAllProductos() {
        return axios.get(BASE_URL);
    }

    /* --> Obtener producto por ID */
    getProductoById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    /* --> Crear producto */
    createProducto(producto) {
        return axios.post(BASE_URL, producto);
    }

    /* --> Actualizar producto */
    updateProducto(id, producto) {
        return axios.put(`${BASE_URL}/${id}`, producto);
    }

    /* --> Eliminar producto */
    deleteProducto(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    /* --> Productos activos */
    getProductosActivos() {
        return axios.get(`${BASE_URL}/activos`);
    }

    /* --> Productos destacados */
    getProductosDestacados() {
        return axios.get(`${BASE_URL}/destacados`);
    }

    /* --> Productos por categoría */
    getProductosPorCategoria(categoriaId) {
        return axios.get(`${BASE_URL}/categoria/${categoriaId}`);
    }

    /* --> Buscar productos por nombre */
    buscarProductos(nombre) {
        return axios.get(`${BASE_URL}/buscar?nombre=${nombre}`);
    }
}

export default new ProductoService();