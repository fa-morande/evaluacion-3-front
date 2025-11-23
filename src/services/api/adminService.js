import { 
    getCategorias, 
    createCategoria, 
    updateCategoria, 
    deleteCategoria,
    getCategoriasActivas 
    } from './categorias';
    import { 
    getProductos, 
    createProducto, 
    updateProducto, 
    deleteProducto,
    getProductosActivos,
    marcarDestacado,
    actualizarStock
    } from './productos';
    import { 
    getPedidos, 
    updateEstadoPedido, 
    cancelarPedido,
    getPedidosPorEstado 
    } from './pedidos';
    import { 
    getUsuarios, 
    updateUsuario, 
    deleteUsuario,
    cambiarRole 
    } from './usuarios';

    export const adminService = {
    // Categorías
    categorias: {
        getAll: getCategorias,
        getActivas: getCategoriasActivas,
        create: createCategoria,
        update: updateCategoria,
        delete: deleteCategoria
    },
    
    // Productos
    productos: {
        getAll: getProductos,
        getActivos: getProductosActivos,
        create: createProducto,
        update: updateProducto,
        delete: deleteProducto,
        marcarDestacado,
        actualizarStock
    },
    
    // Pedidos
    pedidos: {
        getAll: getPedidos,
        updateEstado: updateEstadoPedido,
        cancelar: cancelarPedido,
        getPorEstado: getPedidosPorEstado
    },
    
    // Usuarios
    usuarios: {
        getAll: getUsuarios,
        update: updateUsuario,
        delete: deleteUsuario,
        cambiarRole
    }
};