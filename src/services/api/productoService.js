import axios from 'axios';
import { API_URL } from '../../utils/constants';

const BASE_URL = `${API_URL}/productos`;

class ProductoService {
    
    getAllProductos() {
        return axios.get(BASE_URL);
    }

    createProducto(producto) {
        return axios.post(BASE_URL, producto);
    }

    // PUT: Actualizar
    updateProducto(id, producto) {
        return axios.put(`${BASE_URL}/${id}`, producto);
    }

    // DELETE: Borrar
    deleteProducto(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    // PUT: Destacar (Según el código que me pasaste, usa query params)
    marcarDestacado(id, destacado) {
        return axios.put(`${BASE_URL}/${id}/destacado?destacado=${destacado}`);
    }

    // PUT: Stock
    actualizarStock(id, stock) {
        return axios.put(`${BASE_URL}/${id}/stock?stock=${stock}`);
    }
}

export default new ProductoService();