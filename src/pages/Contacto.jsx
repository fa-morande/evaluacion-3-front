import React from 'react';
import Text from '../components/atoms/Text';
import nosotros from '../data/nosotros';

function Contacto() {
    return (
        <div className="page-container contacto-page">
            {/* ELIMINADO: <NavBar /> - Ya lo renderiza el LayoutWrapper */}
            
            <main className="main-content">
                <section className="seccion-contacto">
                    <Text variant="h1" className="titulo-pagina">Contáctanos</Text>
                    
                    <div className="info-contacto">
                        <Text variant="p" className="texto-principal">
                            {nosotros.contactanos}
                        </Text>
                    </div>
                    
                    <div className="detalles-contacto">
                        <Text variant="h4">Detalles de Contacto:</Text>
                        <Text variant="p">Email: contacto@tienda.cl</Text>
                        <Text variant="p">Teléfono: +56 9 1234 5678</Text>
                    </div>
                </section>
            </main>

            {/* ELIMINADO: <Footer /> - Ya lo renderiza el LayoutWrapper */}
        </div>
    );
}

export default Contacto;