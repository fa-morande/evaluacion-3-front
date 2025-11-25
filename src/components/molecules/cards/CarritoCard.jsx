import React from "react";
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";
import "../../../styles/components/molecules/cards/CarritoCard.css";

function CarritoCard({ producto, onActualizarCantidad, onEliminar }) {
    if (!producto) return null;

    // URL de respaldo más segura (placehold.co)
    const FALLBACK_IMAGE = "https://placehold.co/150x150?text=Sin+Imagen";

    // Normalización de datos
    const titulo = producto.nombre || producto.title || "Producto sin nombre";
    
    // Intentamos usar la imagen del producto, si no existe, usamos el fallback
    const imagenSrc = producto.imagenUrl || producto.imagen || producto.image || FALLBACK_IMAGE;
    
    const precio = Number(producto.precio || 0);
    const cantidad = Number(producto.cantidad || 1);
    const subtotal = precio * cantidad;

    // Manejador de error para la imagen (evita bucles infinitos)
    const handleImageError = (e) => {
        // Solo reemplazamos si la imagen actual no es ya la de fallback (para evitar loop)
        if (e.target.src !== FALLBACK_IMAGE) {
            e.target.src = FALLBACK_IMAGE;
        }
    };

    return (
        <div className="carrito-card">
            {/* Imagen del producto */}
            <div className="carrito-card-img-wrapper">
                <img 
                    src={imagenSrc} 
                    alt={titulo} 
                    className="carrito-card-img"
                    onError={handleImageError} // <--- Aquí está la protección
                />
            </div>

            {/* Info del producto */}
            <div className="carrito-card-info">
                <Text variant="h3" className="carrito-card-title">{titulo}</Text>
                <Text variant="p" className="carrito-card-price">
                    Unitario: ${precio.toLocaleString('es-CL')}
                </Text>
            </div>

            {/* Controles de cantidad */}
            <div className="carrito-card-controls">
                <div className="cantidad-selector">
                    <button 
                        className="btn-cantidad"
                        onClick={() => onActualizarCantidad(producto.id, cantidad - 1)}
                        disabled={cantidad <= 1}
                    >
                        -
                    </button>
                    <span className="cantidad-display">{cantidad}</span>
                    <button 
                        className="btn-cantidad"
                        onClick={() => onActualizarCantidad(producto.id, cantidad + 1)}
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Subtotal y Eliminar */}
            <div className="carrito-card-actions">
                <Text variant="h4" className="carrito-card-subtotal">
                    ${subtotal.toLocaleString('es-CL')}
                </Text>
                <Button 
                    text="Eliminar" 
                    variant="danger" 
                    size="small"
                    onClick={() => onEliminar(producto.id)}
                />
            </div>
        </div>
    );
}

export default CarritoCard;