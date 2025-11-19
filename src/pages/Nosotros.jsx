import React from 'react';
import NavBar from '../components/molecules/NavBar';
import Footer from '../components/organisms/Footer';
import Text from '../components/atoms/Text';
import ListarValores from '../components/organisms/ListarValores'; // Organismo que mapea los Valores
import ListarEquipo from '../components/organisms/ListarEquipo';   // Organismo que mapea el Equipo
import { nosotrosData } from '../data/nosotros'; // Data estática

function Nosotros() {
    return (
        <div className="page-container nosotros-page">
            <NavBar />
            
            <main className="main-content">
                {/* 1. Sección de Presentación (Visión y Misión) */}
                <section className="seccion-presentacion">
                    <Text variant="h1" className="titulo-pagina">Quiénes Somos</Text>
                    
                    <div className="presentacion-grid">
                        {nosotrosData.presentacion.map((item, index) => (
                            <div key={index} className="card-presentacion-info">
                                <Text variant="h3">{item.titulo}</Text>
                                <Text variant="p">{item.texto}</Text>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. Sección de Valores (Organismo) */}
                <ListarValores />
                
                {/* 3. Sección de Equipo (Organismo) */}
                <ListarEquipo />

            </main>

            <Footer />
        </div>
    );
}

export default Nosotros;