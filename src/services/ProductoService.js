import axios from 'axios';

// Usamos la ruta relativa gracias al proxy del Paso 1
const BASE_URL = '/api/v1/productos'; 

class ProductoService {

    /* --> Listar producto*/
    getAllProductos() {
        return axios.get(BASE_URL);
    }

    /* --> Crear producto*/
    createProducto(producto) {
        return axios.post(BASE_URL, producto);
    }

    /* --> Buscar producto*/
    getProductoById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }
}

export default new ProductoService();