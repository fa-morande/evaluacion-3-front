import React from "react";
import CardInformacion from "../molecules/CardInformacion";
import Text from "../atoms/Text";
import nosotros from "../../data/nosotros"; // Importamos la data

function ListarValores() {
    return (
        <section className="seccion-lista-valores">
            <Text variant="h2" className="titulo-seccion">Nuestros Valores</Text>
            <div className="grid-cards">
                {nosotros.valores.map((item, index) => (
                    <CardInformacion 
                        key={index}
                        icono={item.icono}
                        titulo={item.titulo}
                        descripcion={item.descripcion}
                    />
                ))}
            </div>
        </section>
    );
}
export default ListarValores;