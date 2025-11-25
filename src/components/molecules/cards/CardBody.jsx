import React from "react";
import Text from "../../atoms/Text";
import Image from "../../atoms/Image";

function CardBody({ imagen, title, price, onClick, onAddToCart }) {
    return (
        <div className="card">
            <div className="card-body">
                <button className="btn-agregar-carrito" onClick={onAddToCart}>
                    Agregar
                </button>
            </div>
        </div>
    );
}

export default CardBody;
