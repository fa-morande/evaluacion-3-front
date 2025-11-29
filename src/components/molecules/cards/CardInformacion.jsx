import React from "react";
import Text from "../../atoms/Text";
import Image from "../../atoms/Image";
import "../../../styles/components/molecules/cards/CardInformacion.css";

function CardInformacion({ icono, imagenUrl, titulo, descripcion, cargo }) {
    return (
        <div className="card-info">
            {imagenUrl && (
                <div className="card-imagen-container">
                    <Image src={imagenUrl} alt={titulo} className="card-imagen-circular" />
                </div>
            )}
            {icono && (
                <div className="card-icono-container">
                    <i className={`fa ${icono} card-icono`}></i>
                </div>
            )}
            <div className="card-contenido">
                <Text variant="h4" className="card-titulo">{titulo}</Text>
                
                {cargo && <Text variant="span" className="card-cargo">{cargo}</Text>}
                
                {/* CORRECCIÓN: Usamos div en lugar de Text(p) para permitir contenido HTML dentro */}
                {descripcion && (
                    <div className="card-descripcion">
                        {descripcion}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CardInformacion;