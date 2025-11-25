import React from "react";
import { Link } from "react-router-dom";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import "../../../styles/components/organisms/cart/OrderConfirmation.css";

function OrderConfirmation({ pedido }) {
    return (
        <div className="order-confirmation">
            <div className="confirmation-header">
                <div className="success-icon"></div>
                <Text variant="h1">¡Pedido Confirmado!</Text>
                <Text variant="p">Tu pedido ha sido procesado exitosamente</Text>
            </div>

            <div className="order-details">
                <div className="detail-card">
                    <Text variant="h3">Numero de Pedido</Text>
                    <Text variant="h2" className="order-number">#{pedido.id}</Text>
                </div>

                <div className="detail-card">
                    <Text variant="h3">Estado</Text>
                    <Text variant="p" className="order-status">{pedido.estado}</Text>
                </div>

                <div className="detail-card">
                    <Text variant="h3">Total</Text>
                    <Text variant="h2" className="order-total">${pedido.total?.toLocaleString()}</Text>
                </div>

                <div className="detail-card">
                    <Text variant="h3">Dirección de Envio</Text>
                    <Text variant="p" className="order-address">{pedido.direccionEntrega}</Text>
                </div>
            </div>

            <div className="confirmation-actions">
                <Link to="/productos">
                    <Button text="Seguir Comprando" variant="primary" />
                </Link>
                <Link to="/mis-pedidos">
                    <Button text="Ver Mis Pedidos" variant="secondary" />
                </Link>
            </div>

            <div className="confirmation-footer">
                <Text variant="p">
                    Recibiras un correo de confirmación con los detalles de tu pedido.
                </Text>
            </div>
        </div>
    );
}

export default OrderConfirmation;