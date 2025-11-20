import React from 'react';
import NavBar from '../components/molecules/NavBar';
import Footer from '../components/organisms/Footer';
import Text from '../components/atoms/Text';
import nosotros from '../data/nosotros'; // Data para el texto de contacto

function Contacto() {
    return (
        <div className="page-container contacto-page">
            <NavBar />
            
            <main className="main-content">
                <section className="seccion-contacto">
                    <Text variant="h1" className="titulo-pagina">Contáctanos</Text>
                    
                    {/* 1. Texto Informativo (tomado de nosotros.js) */}
                    <div className="info-contacto">
                        <Text variant="p" className="texto-principal">
                            {nosotros.contactanos}
                        </Text>
                        
                        {/* 2. Aquí iría tu Formulario de Contacto (como un Organismo, ej: FormularioContacto) */}
                        {/* <FormularioContacto /> */}
                    </div>
                    
                    {/* 3. Información de contacto del Footer (opcional) */}
                    <div className="detalles-contacto">
                        <Text variant="h4">Detalles de Contacto:</Text>
                        <Text variant="p">Email: contacto@tienda.cl</Text>
                        <Text variant="p">Teléfono: +56 9 1234 5678</Text>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Contacto;