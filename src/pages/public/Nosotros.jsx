import React from 'react';
import Text from '../../components/atoms/Text';
import CardInformacion from '../../components/molecules/cards/CardInformacion';
import nosotros from '../../services/data/nosotros';
import "../../styles/pages/public/Nosotros.css";


function Nosotros() {
    return (
        <div className="page-container nosotros-page">
            {/* 1. Sección de Presentación */}
            <section className="seccion-presentacion">
                <Text variant="h1" className="titulo-pagina">Quiénes Somos</Text>
                
                <div className="presentacion-grid">
                    {nosotros.presentacion.map((item, index) => (
                        <CardInformacion
                            key={index}
                            titulo={item.titulo}
                            descripcion={item.texto}
                        />
                    ))}
                </div>
            </section>
            
            {/* 2. Sección de Valores */}
            <section className="seccion-valores">
                <Text variant="h2" className="subtitulo-seccion">Nuestros Valores</Text>
                <div className="valores-grid">
                    {nosotros.valores.map((valor, index) => (
                        <CardInformacion
                            key={index}
                            icono={valor.icono}
                            titulo={valor.titulo}
                            descripcion={valor.descripcion}
                        />
                    ))}
                </div>
            </section>
            
            {/* 3. Sección de Equipo */}
            <section className="seccion-equipo">
                <Text variant="h2" className="subtitulo-seccion">Nuestro Equipo</Text>
                <div className="equipo-grid">
                    {nosotros.equipo.map((miembro, index) => (
                        <CardInformacion
                            key={index}
                            imagenUrl={miembro.imagenUrl}
                            titulo={miembro.nombre}
                            cargo={miembro.cargo}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Nosotros;