import React from 'react';
import BodyFiltro from '../components/organisms/BodyFiltro';
import SeccionDestacados from '../components/organisms/SeccionDestacados';

function Productos() {
    const handleSearch = (termino) => {
        console.log("Buscando productos por:", termino);
    };

    const handleFilter = (categoria) => {
        console.log("Filtrando por categoría:", categoria);
    };

    return (
        <div className="page-container productos-page">
            {/* ELIMINADO: <NavBar /> */}
            
            <main className="main-content">
                <BodyFiltro 
                    onSearch={handleSearch}
                    onFilterChange={handleFilter}
                />
                
                <SeccionDestacados />
            </main>

            {/* ELIMINADO: <Footer /> */}
        </div>
    );
}

export default Productos;