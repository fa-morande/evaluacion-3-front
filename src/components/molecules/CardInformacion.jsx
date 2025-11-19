import React from "react";
import Text from "../atoms/Text";
import Image from "../atoms/Image";

function CardInformacion({ icono, imagenUrl, titulo, descripcion, cargo }) {
    return (
        <div className="card-info">
            {/* Si existe imagenUrl (para equipo), la muestra */}
            {imagenUrl && <Image src={imagenUrl} alt={titulo} className="card-imagen-circular" />}
            
            {/* Si existe icono (para valores), lo muestra */}
            {/* NOTA: Asume que usas iconos SVG o una librería como FontAwesome */}
            {icono && <i className={`fa ${icono} icono-grande`}></i>} 

            <div className="card-contenido">
                <Text variant="h4" className="titulo">{titulo}</Text>
                {/* Muestra el cargo solo si existe (para Equipo) */}
                {cargo && <Text variant="span" className="cargo">{cargo}</Text>} 
                <Text variant="p" className="descripcion">{descripcion}</Text>
            </div>
        </div>
    );
}

export default CardInformacion;