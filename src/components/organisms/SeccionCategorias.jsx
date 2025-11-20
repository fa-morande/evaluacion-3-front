import React from "react";
import CardCategoria from "../molecules/CardCategoria";
import Text from "../atoms/Text";
import productosData from "../../data/productos.js"; // <-- Importamos tu data (uso default export)

// TRUCO: Aplanamos la data para obtener un solo array de productos
const obtenerProductosAplanados = () => {
    const data = productosData.categoria;
    let productos = [];
    
    // Iteramos sobre las claves (Perros, Gatos, Accesorios)
    for (const categoria in data) {
        if (data.hasOwnProperty(categoria)) {
            productos = productos.concat(data[categoria].map(producto => ({
                // Mapeamos los nombres de tu data (name, image) a los props de CardCategoria (titulo, imagen)
                id: producto.id,
                titulo: producto.name,
                imagen: producto.image,
                descripcion: producto.description,
                categoria: categoria // Agregamos la categoría si la necesitas
            })));
        }
    }
    return productos;
};

function SeccionCategorias() {
  // Los datos a mostrar son todos los productos aplanados
    const todosLosProductos = obtenerProductosAplanados(); 

    // Filtrar para mostrar solo 4 tarjetas de ejemplo, sin duplicados
    const itemsAMostrar = todosLosProductos.slice(0, 4);

    return (
        <section className="seccion-contenedor">
        <div className="encabezado">
            <Text variant="h2" className="titulo-seccion">Productos del Catálogo</Text>
        </div>

        <div className="categorias-grid" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {itemsAMostrar.map((item) => (
            <CardCategoria 
                key={item.id + item.titulo} // Clave única
                // Pasamos los props que CardCategoria espera
                imagen={item.imagen}
                titulo={item.titulo}
                descripcion={item.descripcion}
            />
            ))}
        </div>
        </section>
    );
}

export default SeccionCategorias;