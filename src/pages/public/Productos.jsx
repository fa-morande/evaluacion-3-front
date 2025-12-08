import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BodyFiltro from '../../components/organisms/products/BodyFiltro';
import CardProductGeneral from '../../components/molecules/cards/CardProductGeneral';
import productoService from '../../services/api/productos'; // IMPORT CORREGIDO
import '../../styles/pages/public/Productos.css'; 

function Productos({ agregarAlCarrito }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();

    const [filtros, setFiltros] = useState({
        categoria: '',
        busqueda: ''
    });

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                // Axios devuelve un objeto response, la data está adentro
                const response = await productoService.getAllProductos();
                
                // Manejo robusto: Si response.data es el array lo usamos, si no buscamos .productos
                const data = response.data; 
                const lista = Array.isArray(data) ? data : (data.productos || []);
                
                setProductos(lista);

                const categoriaUrl = searchParams.get('categoria');
                if (categoriaUrl) {
                    setFiltros(prev => ({ ...prev, categoria: categoriaUrl }));
                }

            } catch (error) {
                console.error("Error cargando productos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, [searchParams]);

    const handleSearch = (termino) => {
        setFiltros(prev => ({ ...prev, busqueda: termino }));
    };

    const handleFilter = (categoria) => {
        setFiltros(prev => ({ ...prev, categoria }));
    };

    const productosFiltrados = productos.filter(producto => {
        const catNombre = producto.categoria?.nombre || 'General';
        
        const coincideCategoria = !filtros.categoria || 
            catNombre.toLowerCase() === filtros.categoria.toLowerCase();
        
        const termino = filtros.busqueda.toLowerCase();
        const coincideBusqueda = !filtros.busqueda || 
            producto.nombre.toLowerCase().includes(termino) ||
            catNombre.toLowerCase().includes(termino) ||
            (producto.descripcion && producto.descripcion.toLowerCase().includes(termino));
        
        return coincideCategoria && coincideBusqueda;
    });

    if (loading) return <div className="productos-page"><p style={{textAlign:'center', marginTop:'50px'}}>Cargando...</p></div>;

    return (
        <div className="productos-page">
            <BodyFiltro 
                onSearch={handleSearch}
                onFilterChange={handleFilter}
                categoriaActiva={filtros.categoria}
            />
            
            <div className="productos-container">
                <h2>
                    {filtros.categoria ? `Categoría: ${filtros.categoria}` : "Nuestros Productos"}
                </h2>
                
                <section className="seccion-productos-generales">
                    {productosFiltrados.length === 0 ? (
                        <div className="no-products">
                            <p>No se encontraron productos con los filtros aplicados.</p>
                            <button 
                                onClick={() => setFiltros({categoria: '', busqueda: ''})}
                                style={{marginTop:'10px', cursor:'pointer', padding:'5px 10px'}}
                            >
                                Ver todos
                            </button>
                        </div>
                    ) : (
                        <div className="grid-productos">
                            {productosFiltrados.map((producto) => (
                                <CardProductGeneral
                                    key={producto.id}
                                    imagen={producto.imagenUrl || "https://via.placeholder.com/300"}
                                    titulo={producto.nombre}
                                    subtitulo={producto.descripcion}
                                    categoria={producto.categoria?.nombre || "Varios"}
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