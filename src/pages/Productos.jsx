import React, { useState, useEffect } from 'react';
import BodyFiltro from '../components/organisms/BodyFiltro';
import CardProductGeneral from '../components/molecules/CardProductGeneral';
import productosData from '../data/productos'; // Importamos tus datos reales
import '../styles/pages/Productos.css';

function Productos({ agregarAlCarrito }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false); // Ya no hay loading real
    const [error, setError] = useState(null);
    const [filtros, setFiltros] = useState({
        categoria: '',
        busqueda: ''
    });

    // Convertir la estructura anidada de productosData a un array plano
    const transformarProductos = () => {
        const productosPlano = [];
        
        Object.entries(productosData.categoria).forEach(([categoria, productosCategoria]) => {
            productosCategoria.forEach(producto => {
                productosPlano.push({
                    id: `${categoria}-${producto.id}`, // ID único
                    imagen: producto.image,
                    categoria: categoria, // "Perros", "Gatos", "Accesorios"
                    titulo: producto.name,
                    subtitulo: producto.description,
                    precio: producto.price,
                    // Mantenemos los datos originales
                    ...producto
                });
            });
        });
        
        return productosPlano;
    };

    // Inicializar productos al montar el componente
    useEffect(() => {
        const productosTransformados = transformarProductos();
        setProductos(productosTransformados);
    }, []);

    const handleSearch = (termino) => {
        console.log("Buscando productos por:", termino);
        setFiltros(prev => ({ ...prev, busqueda: termino }));
    };

    const handleFilter = (categoria) => {
        console.log("Filtrando por categoría:", categoria);
        setFiltros(prev => ({ ...prev, categoria }));
    };

    // Filtrar productos
    const productosFiltrados = productos.filter(producto => {
        // Si no hay filtro de categoría, mostrar todos
        if (!filtros.categoria) {
            return true;
        }
        
        // Filtrar por categoría (comparación exacta)
        const coincideCategoria = producto.categoria === filtros.categoria;
        
        // Filtrar por búsqueda
        const coincideBusqueda = !filtros.busqueda || 
            producto.titulo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
            producto.categoria.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
            (producto.subtitulo && producto.subtitulo.toLowerCase().includes(filtros.busqueda.toLowerCase()));
        
        return coincideCategoria && coincideBusqueda;
    });

    if (error) {
        return (
            <div className="page-container productos-page">
                <main className="main-content">
                    <div className="error-container">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Reintentar</button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="page-container productos-page">
            <main className="main-content">
                <BodyFiltro 
                    onSearch={handleSearch}
                    onFilterChange={handleFilter}
                />
                {/* Sección de productos desde tus datos reales */}
                <section className="seccion-productos-generales">
                    <h2>Nuestros Productos ({productosFiltrados.length})</h2>
                    
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
            </main>
        </div>
    );
}

export default Productos;