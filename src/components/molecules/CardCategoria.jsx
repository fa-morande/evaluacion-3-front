import React from "react";
import Text from "../atoms/Text";
import "../../styles/molecules/CardCategoria.css";

function CardCategoria ({ imagen, titulo, descripcion }){ 
    return (
        <div className="card-categoria">
            {/* Imagen como background-image para mejor control */}
            <div 
                className="img-fondo"
                style={{ backgroundImage: `url(${imagen})` }}
            >
                {/* Capa oscura (gradiente) para que se lea el texto */}
                <div className="overlay-gradiente"></div>
                
                {/* Contenido flotante */}
                <div className="contenido-texto">
                    <Text variant="h3" className="titulo-cat">{titulo}</Text>
                    <Text variant="p" className="extra-cat">{descripcion}</Text>
                </div>
            </div>
        </div>
    );
}

export default CardCategoria;