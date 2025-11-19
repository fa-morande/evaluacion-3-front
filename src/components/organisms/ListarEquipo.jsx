import React from "react";
import CardInformacion from "../molecules/CardInformacion";
import Text from "../atoms/Text";
import nosotros from "../../data/nosotros";

function ListarEquipo() {
    return (
        <section className="seccion-lista-equipo">
            <Text variant="h2" className="titulo-seccion">Conoce a Nuestro Equipo</Text>
            <div className="grid-cards-equipo">
                {nosotros.equipo.map((item, index) => (
                    <CardInformacion 
                        key={index}
                        imagenUrl={item.imagenUrl} 
                        titulo={item.nombre}
                        cargo={item.cargo}
                        // La descripción puede ser un breve texto fijo o variable
                        descripcion={"Dedicado profesional con años de experiencia en el rubro."} 
                    />
                ))}
            </div>
        </section>
    );
}
export default ListarEquipo;