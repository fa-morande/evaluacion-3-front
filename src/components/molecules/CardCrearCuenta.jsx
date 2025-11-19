import React from "react";
import Text from "../atoms/Text";
import Button from "../atoms/Button";

function CardCrearCuenta({ titulo, descripcion }) {
    return (
        <div className="card-promocional">
            <Text variant="h3" className="titulo">{titulo}</Text>
            <Text variant="p" className="descripcion">{descripcion}</Text>
            <a href="/registro">
                <Button className="btn-accion">
                    Crear Cuenta
                </Button>
            </a>
        </div>
    );
}

export default CardCrearCuenta;