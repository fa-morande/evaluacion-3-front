import React from "react";
import Text from "../atoms/Text";
import Image from "../atoms/Image";
import "../../styles/components/molecules/CardInformacion.css";

function CardInformacion({ icono, imagenUrl, titulo, descripcion, cargo }) {
    return (
        <div className="card-info">
            {/* Imagen para equipo */}
            {imagenUrl && (
                <div className="card-imagen-container">
                    <Image src={imagenUrl} alt={titulo} className="card-imagen-circular" />
                </div>
            )}
            
            {/* Icono para valores */}
            {icono && (
                <div className="card-icono-container">
                    <i className={`fa ${icono} card-icono`}></i>
                </div>
            )}

            <div className="card-contenido">
                <Text variant="h4" className="card-titulo">{titulo}</Text>
                {cargo && <Text variant="span" className="card-cargo">{cargo}</Text>}
                {descripcion && <Text variant="p" className="card-descripcion">{descripcion}</Text>}
            </div>
        </div>
    );
}

export default CardInformacion;