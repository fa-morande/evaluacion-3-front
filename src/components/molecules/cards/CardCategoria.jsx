import React from "react";
import Text from "../../atoms/Text";
import "../../../styles/components/molecules/cards/CardCategoria.css";

function CardCategoria ({ imagen, titulo, descripcion }){ 
    return (
        <div className="card-categoria">
            <div 
                className="img-fondo"
                style={{ backgroundImage: `url(${imagen})` }}
            >
                <div className="overlay-gradiente"></div>
                <div className="contenido-texto">
                    <Text variant="h3" className="titulo-cat">{titulo}</Text>
                    <Text variant="p" className="extra-cat">{descripcion}</Text>
                </div>
            </div>
        </div>
    );
}

export default CardCategoria;