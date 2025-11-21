import React, { useState, useEffect } from 'react';
import BodyFiltro from '../components/organisms/BodyFiltro';
import SeccionDestacados from '../components/organisms/SeccionDestacados';
import CardProductGeneral from '../components/molecules/CardProductGeneral';

function Productos({ agregarAlCarrito }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtros, setFiltros] = useState({
        categoria: '',
        busqueda: ''
    });

    // Simulación de datos de API - luego reemplazar con llamada real
    const fetchProductos = async () => {
        try {
            setLoading(true);
            // TODO: Reemplazar con llamada real a tu API
            // const response = await fetch('http://tu-api.com/productos');
            // const data = await response.json();
            
            // Datos de ejemplo que simulan la respuesta de la API
            const data = [
                {
                    id: 1,
                    imagen: "/images/alimento-perro.jpg",
                    categoria: "Perros",
                    titulo: "Alimento Premium para Perros",
                    subtitulo: "Adultos 15kg",
                    precio: 45990,
                    stock: 10
                },
                {
                    id: 2,
                    imagen: "/images/alimento-gato.jpg",
                    categoria: "Gatos",
                    titulo: "Alimento Balanceado para Gatos", 
                    subtitulo: "Cachorros 7kg",
                    precio: 32990,
                    stock: 15
                },
                {
                    id: 3,
                    imagen: "/images/juguete-perro.jpg",
                    categoria: "Perros",
                    titulo: "Juguete para Perro Resistente",
                    subtitulo: "Tamaño Mediano",
                    precio: 12990,
                    stock: 8
                },
                {
                    id: 4,
                    imagen: "/images/arena-gato.jpg",
                    categoria: "Gatos", 
                    titulo: "Arena Absorbente para Gatos",
                    subtitulo: "Pack 4kg",
                    precio: 8990,
                    stock: 20
                }
            ];
            
            setProductos(data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar los productos');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const handleSearch = (termino) => {
        console.log("Buscando productos por:", termino);
        setFiltros(prev => ({ ...prev, busqueda: termino }));
        // TODO: Implementar búsqueda en API
        // fetchProductosConFiltros({ busqueda: termino });
    };

    const handleFilter = (categoria) => {
        console.log("Filtrando por categoría:", categoria);
        setFiltros(prev => ({ ...prev, categoria }));
        // TODO: Implementar filtro en API
        // fetchProductosConFiltros({ categoria });
    };

    // Filtrar productos localmente (temporal hasta conectar con API)
    const productosFiltrados = productos.filter(producto => {
        const coincideCategoria = !filtros.categoria || producto.categoria === filtros.categoria;
        const coincideBusqueda = !filtros.busqueda || 
            producto.titulo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
            producto.categoria.toLowerCase().includes(filtros.busqueda.toLowerCase());
        return coincideCategoria && coincideBusqueda;
    });

    if (loading) {
        return (
            <div className="page-container productos-page">
                <main className="main-content">
                    <div className="loading-container">
                        <p>Cargando productos...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-container productos-page">
                <main className="main-content">
                    <div className="error-container">
                        <p>{error}</p>
                        <button onClick={fetchProductos}>Reintentar</button>
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
                
                {/* Sección existente - mantener si es necesaria */}
                <SeccionDestacados />
                
                {/* Sección de productos desde API */}
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
                                    onAddToCart={agregarAlCarrito}
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