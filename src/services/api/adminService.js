// 1. Importamos la INSTANCIA de tu servicio real (fíjate en el nombre del archivo)
import productoService from './productoService'; 

// 2. Importamos las funciones del mock de categorías (el archivo que creamos antes)
import * as categoriasRepo from './categorias'; 

// 3. Importamos los otros (asumiendo que existen o usando fallbacks)
import * as usuariosRepo from './usuarios';
import * as pedidosRepo from './pedidos';

export const adminService = {
    // --- MÓDULO DE PRODUCTOS (Conectado a tu Backend Real) ---
    productos: {
        getAll: async () => {
            // Axios devuelve la data dentro de .data, hay que extraerla
            const response = await productoService.getAllProductos();
            return response.data; 
        },
        create: async (data) => {
            const response = await productoService.createProducto(data);
            return response.data;
        },
        update: async (id, data) => {
            const response = await productoService.updateProducto(id, data);
            return response.data;
        },
        delete: async (id) => {
            const response = await productoService.deleteProducto(id);
            return response.data;
        },
        // Si tu backend tiene endpoint para destacar, úsalo. Si no, simulamos o usamos update.
        // Asumiremos que usas updateProducto para cambiar el booleano 'destacado'
        marcarDestacado: async (id, destacado) => {
            // Primero obtenemos el producto actual (opcional, depende de tu API)
            // O enviamos solo el campo a actualizar si tu API soporta PATCH
            const response = await productoService.updateProducto(id, { destacado });
            return response.data;
        }
    },
    
    // --- MÓDULO DE CATEGORÍAS (Mock temporal para que no falle el Admin) ---
    categorias: {
        getAll: categoriasRepo.getCategorias,
        getActivas: categoriasRepo.getCategoriasActivas,
        create: categoriasRepo.createCategoria,
        update: categoriasRepo.updateCategoria,
        delete: categoriasRepo.deleteCategoria
    },

    // --- MÓDULOS PENDIENTES (Placeholders para que no crashee) ---
    usuarios: {
        getAll: async () => [], 
        bloquear: async () => true
    },

    pedidos: {
        getAll: async () => [],
        cambiarEstado: async () => true
    }
};