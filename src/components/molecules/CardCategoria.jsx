import React from "react";
import Text from "../atoms/Text";
import Image from "../atoms/Image";
import "../../styles/molecules/CardCategoria.css";

function CardCategoria ({ imagen, titulo, descripcion }){ 
    return (
        <div className="card-categoria">
            {/* Imagen de fondo que cubre todo */}
            <Image 
                src={imagen} 
                className="img-fondo" 
                alt={titulo} 
            />
            
            {/* Capa oscura (gradiente) para que se lea el texto */}
            <div className="overlay-gradiente"></div>
            
            {/* Contenido flotante */}
            <div className="contenido-texto">
                <Text variant="h3" className="titulo-cat">{titulo}</Text>
                <Text variant="p" className="extra-cat">{descripcion}</Text>
            </div>
        </div>
    );
}

export default CardCategoria;