import React from "react";
import Text from "../atoms/Text";
import Button from "../atoms/Button";

function CardPresentacion({ titulo, descripcion, onBotonPrimario, onBotonSecundario }) {
    return (
        <div className="banner-contenido">
            
            {/* --> Titulo principal*/}
            <Text variant="h1" className="titulo-principal">
            {titulo || "Bienvenido a la Tienda"}
            </Text>
            
            {/* --> Descripcion*/}
            <Text variant="p" className="descripcion">
            {descripcion || "Descripción por defecto del banner."}
            </Text>
            
            {/* --> Botones*/}
            <div className="botones-container">
                <Button className="btn-secundario" onClick={onBotonSecundario}>
                    Registrarme
                </Button>
                <Button className="btn-primario" onClick={onBotonPrimario}>
                    Ver Productos
                </Button>
            </div>
        </div>
    );
}

export default CardPresentacion;