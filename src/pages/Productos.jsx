import React from 'react';
import NavBar from '../components/molecules/NavBar';
import Footer from '../components/organisms/Footer';
import BodyFiltro from '../components/organisms/BodyFiltro'; // Tu organismo de filtros
import SeccionDestacados from '../components/organisms/SeccionDestacados'; // Reutilizaremos este Organismo para mostrar el catálogo completo

function Productos() {
    // NOTA: La lógica de filtrar y buscar (BodyFiltro) se manejaría aquí arriba (useState, useEffect)
    // Pero por ahora, solo ensamblamos.
    
    const handleSearch = (termino) => {
        console.log("Buscando productos por:", termino);
        // Aquí iría la llamada al API con el parámetro de búsqueda
    };

    const handleFilter = (categoria) => {
        console.log("Filtrando por categoría:", categoria);
        // Aquí iría la llamada al API filtrada
    };

    return (
        <div className="page-container productos-page">
            <NavBar />
            
            <main className="main-content">
                {/* 1. BodyFiltro (Organismo para buscar y filtrar) */}
                <BodyFiltro 
                    onSearch={handleSearch}
                    onFilterChange={handleFilter}
                />
                
                {/* 2. Lista de Productos (Usamos el organismo de Destacados, pero aquí mostraría TODO) */}
                {/* NOTA: Idealmente, crea un organismo ListarProductos más genérico. */}
                <SeccionDestacados /> 

            </main>

            <Footer />
        </div>
    );
}

export default Productos;