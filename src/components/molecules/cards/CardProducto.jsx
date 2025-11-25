import React from "react";
import Text from "../../atoms/Text";
import Image from "../../atoms/Image";
import Button from "../../atoms/Button";

function CardProducto({ item, onClick, onAddToCart }) {
    return (
        <div className="card-producto" onClick={onClick}>
            {/*--> Usamos las propiedades */}
            <Image src={item.imagenUrl} className="card-imagen" alt={item.nombre}></Image>
            
            <div className="card-body">
                {item.categoria && <Text variant="span" className="categoria">{item.categoria.nombre}</Text>} 
                
                <Text variant="h5" className="titulo">{item.nombre}</Text>
                <Text variant="h4" className="precio">${item.precio}</Text>
                
                {/* Botón */}
                <Button className="btn-agregar" onClick={onAddToCart}>
                    Agregar
                </Button>
            </div>
        </div>
    );
}

export default CardProducto;