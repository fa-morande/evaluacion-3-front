import React, { useState, useEffect } from 'react';
import BodyFiltro from '../../components/organisms/products/BodyFiltro';
import CardProductGeneral from '../../components/molecules/cards/CardProductGeneral';
import productosData from '../../services/data/productos';
import '../../styles/pages/public/Productos.css'; // Solo importar Productos.css

function Productos({ agregarAlCarrito }) {
    const [productos, setProductos] = useState([]);
    const [filtros, setFiltros] = useState({
        categoria: '',
        busqueda: ''
    });

    const transformarProductos = () => {
        const productosPlano = [];
        
        Object.entries(productosData.categoria).forEach(([categoria, productosCategoria]) => {
            productosCategoria.forEach(producto => {
                productosPlano.push({
                    id: `${categoria}-${producto.id}`,
                    imagen: producto.image,
                    categoria: categoria,
                    titulo: producto.name,
                    subtitulo: producto.description,
                    precio: producto.price,
                    ...producto
                });
            });
        });
        
        return productosPlano;
    };

    useEffect(() => {
        setProductos(transformarProductos());
    }, []);

    const handleSearch = (termino) => {
        console.log("Búsqueda:", termino);
        setFiltros(prev => ({ ...prev, busqueda: termino }));
    };

    const handleFilter = (categoria) => {
        console.log("Filtro categoría:", categoria);
        setFiltros(prev => ({ ...prev, categoria }));
    };

    const productosFiltrados = productos.filter(producto => {
        const coincideCategoria = !filtros.categoria || producto.categoria === filtros.categoria;
        const coincideBusqueda = !filtros.busqueda || 
            producto.titulo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
            producto.categoria.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
            (producto.subtitulo && producto.subtitulo.toLowerCase().includes(filtros.busqueda.toLowerCase()));
        
        return coincideCategoria && coincideBusqueda;
    });

    return (
        <div className="productos-page">
            {/* BodyFiltro ocupa todo el ancho */}
            <BodyFiltro 
                onSearch={handleSearch}
                onFilterChange={handleFilter}
            />
            
            {/* Contenedor centrado solo para productos */}
            <div className="productos-container">
                <h2>Nuestros Productos</h2>
                
                <section className="seccion-productos-generales">
                    {productosFiltrados.length === 0 ? (
                        <div className="no-products">
                            <p>No se encontraron productos con los filtros aplicados.</p>
                        </div>
                    ) : (
                        <div className="grid-productos">
                            {productosFiltrados.map((producto) => (
                                <CardProductGeneral
                                    key={producto.id}
                                    imagen={producto.imagen}
                                    categoria={producto.categoria}
                                    titulo={producto.titulo}
                                    subtitulo={producto.subtitulo}
                                    precio={producto.precio}
                                    onAddToCart={() => agregarAlCarrito(producto)}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Productos;