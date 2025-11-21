import React from 'react';
import Text from '../components/atoms/Text';
import ListarValores from '../components/organisms/ListarValores';
import ListarEquipo from '../components/organisms/ListarEquipo';
import nosotros from '../data/nosotros';

function Nosotros() {
    return (
        <div className="page-container nosotros-page">
            {/* ELIMINADO: <NavBar /> */}
            
            {/* 1. Sección de Presentación */}
            <section className="seccion-presentacion">
                <Text variant="h1" className="titulo-pagina">Quiénes Somos</Text>
                
                <div className="presentacion-grid">
                    {nosotros.presentacion.map((item, index) => (
                        <div key={index} className="card-presentacion-info">
                            <Text variant="h3">{item.titulo}</Text>
                            <Text variant="p">{item.texto}</Text>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* 2. Sección de Valores */}
            <ListarValores />
            
            {/* 3. Sección de Equipo */}
            <ListarEquipo />
            
            {/* ELIMINADO: <Footer /> */}
        </div>
    );
}

export default Nosotros;