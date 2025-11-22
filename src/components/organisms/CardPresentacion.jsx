import React from "react";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import nosotrosData from "../../data/nosotros";
import "../../styles/organisms/CardPresentacion.css";

function CardPresentacion({ onBotonPrimario, onBotonSecundario }) {
    // Obtener datos directamente de nosotros.js
    const { titulo, descripcion } = nosotrosData.bienvenidos;

    return (
        <div className="banner-contenido">
            
            {/* --> Titulo principal*/}
            <Text variant="h1" className="titulo-principal">
                {titulo}
            </Text>
            
            {/* --> Descripcion*/}
            <Text variant="p" className="descripcion">
                {descripcion}
            </Text>
            
            {/* --> Botones*/}
            <div className="botones-container">
                <Button 
                    text="Registrarme"
                    className="btn-registrarme" 
                    onClick={onBotonSecundario}>
                </Button>
                <Button 
                    text="Ver Productos"
                    className="btn-productos" 
                    onClick={onBotonPrimario}>
                </Button>
            </div>
        </div>
    );
}

export default CardPresentacion;