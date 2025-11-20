// Ya no necesitamos importar axios (incluso si lo dejas, no se usará)
import { PRODUCTOS_MOCK } from '../data/productos.js'; // <-- Importamos la data mock

class ProductoService {

    // Simula una llamada de red devolviendo la data mock en una promesa
    getAllProductos() {
        return new Promise((resolve) => {
            // Simula 500ms de latencia (así ves el mensaje "Cargando...")
            setTimeout(() => {
                // Resolvemos el objeto con la estructura que AXIOS da: { data: [...] }
                resolve({ data: PRODUCTOS_MOCK }); 
            }, 500); 
        });
    }

    // Los demás métodos (create, update, etc.) también deben ser mockeados
    createProducto(producto) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log("Mock: Producto creado, pero no guardado realmente.");
                    resolve({ data: { ...producto, id: Date.now() } }); 
                }, 500);
            });
    }
}

export default new ProductoService();