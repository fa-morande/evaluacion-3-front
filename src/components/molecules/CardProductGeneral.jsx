import React from "react";
import Text from "../atoms/Text";
import Image from "../atoms/Image";
import Button from "../atoms/Button";
import '../../styles/components/molecules/CardProductGeneral.css';

function CardProductGeneral({ 
    imagen, 
    titulo, 
    categoria, 
    precio, 
    subtitulo,
    onAddToCart 
}) {
    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart({
                imagen,
                titulo,
                categoria,
                precio,
                subtitulo
            });
        }
    };

    const formattedPrice = typeof precio === 'number' 
        ? `$${precio.toLocaleString('es-CL')}`
        : precio;

    return (
        <div className="main-cardProducto">
            <div className="body-cardProducto">
                {/* Etiqueta de categoría SOBRE la imagen */}
                <Text variant="span" className="cardProducto-categoria">
                    {categoria}
                </Text>

                {/* Imagen del producto */}
                <Image 
                    src={imagen} 
                    className="cardProducto-img" 
                    alt={titulo}
                />

                {/* Contenido de la card */}
                <div className="cardProducto-content">
                    {/* Título principal */}
                    <Text variant="h3" className="cardProducto-titulo">
                        {titulo}
                    </Text>

                    {/* Subtítulo (especificaciones) */}
                    {subtitulo && (
                        <Text variant="p" className="cardProducto-subtitulo">
                            {subtitulo}
                        </Text>
                    )}

                    {/* Precio y Botón */}
                    <div className="cardProducto-footer">
                        <Text variant="h4" className="cardProducto-precio">
                            {formattedPrice}
                        </Text>
                        
                        <Button
                            text="Agregar"
                            variant="primary"
                            size="small"
                            onClick={handleAddToCart}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardProductGeneral;