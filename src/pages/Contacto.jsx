import React from 'react';
import Text from '../components/atoms/Text';
import CardInformacion from '../components/molecules/CardInformacion';
import nosotros from '../data/nosotros';
import '../styles/pages/Contacto.css';

function Contacto() {
    return (
        <div className="page-container contacto-page">
            <main className="main-content">
                <section className="seccion-contacto">
                    <Text variant="h1" className="titulo-pagina">Contáctanos</Text>
                    
                    {/* Información de Contacto en Cards usando datos de nosotros.js */}
                    <div className="contacto-grid">
                        {nosotros.contacto.detalles.map((detalle, index) => (
                            <CardInformacion
                                key={index}
                                icono={detalle.icono}
                                titulo={detalle.titulo}
                                descripcion={detalle.descripcion}
                            />
                        ))}
                    </div>

                    {/* Información adicional de contacto - Misma estructura que Nosotros */}
                    <section className="seccion-informacion-adicional">
                        <Text variant="h2" className="subtitulo-seccion">Información Directa</Text>
                        <div className="informacion-adicional-grid">
                            <CardInformacion
                                titulo="Contacto Directo"
                                descripcion={
                                    <div className="contacto-directo">
                                        <p><strong>Email:</strong> {nosotros.contacto.email}</p>
                                        <p><strong>Teléfono:</strong> {nosotros.contacto.telefono}</p>
                                        <p><strong>Horario:</strong> {nosotros.contacto.horario}</p>
                                        <p><strong>Ubicación:</strong> {nosotros.contacto.ubicacion}</p>
                                    </div>
                                }
                            />
                        </div>
                    </section>
                </section>
            </main>
        </div>
    );
}

export default Contacto;