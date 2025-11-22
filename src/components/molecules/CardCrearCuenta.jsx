import React from "react";
import Text from "../atoms/Text";
import nosotrosData from "../../data/nosotros";
import "../../styles/molecules/CardCrearCuenta.css";

function CardCrearCuenta() {
    const { titulo, descripcion } = nosotrosData.crearCuenta;

    return (
        <div className="card-promocional">
            <Text variant="h3" className="titulo">{titulo}</Text>
            <Text variant="p" className="descripcion">{descripcion}</Text>
            <a href="/registro" className="btn-enlace">
                <button className="btn-accion-personalizado">
                    Crear Cuenta Gratis
                </button>
            </a>
        </div>
    );
}

export default CardCrearCuenta;