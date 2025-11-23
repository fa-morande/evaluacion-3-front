import React from "react";
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";
import nosotrosData from "../../../services/data/nosotros";
import "../../../styles/components/organisms/shared/CardPresentacion.css";

function CardPresentacion({ onBotonPrimario, onBotonSecundario }) {
    const { titulo, descripcion } = nosotrosData.bienvenidos;

    return (
        <div className="banner-contenido">
            <Text variant="h1" className="titulo-principal">
                {titulo}
            </Text>
            
            <Text variant="p" className="descripcion">
                {descripcion}
            </Text>
            
            <div className="botones-container">
                {/* Botón AZUL - usa variant="primary" */}
                <Button 
                    text="Registrarme"
                    variant="primary"
                    onClick={onBotonPrimario}
                />
                
                {/* Botón BLANCO - usa variant="secondary" */}
                <Button 
                    text="Ver Productos"
                    variant="secondary" 
                    onClick={onBotonSecundario}
                />
            </div>
        </div>
    );
}

export default CardPresentacion;