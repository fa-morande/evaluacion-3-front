import React, { useState } from "react";
import { createPedido } from "../../../services/api/pedidos";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Text from "../../atoms/Text";
import "../../../styles/components/organisms/cart/Checkout.css";

function Checkout({ carrito, usuario, onPedidoCreado, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        direccion: "",
        ciudad: "",
        telefono: "",
        notas: ""
    });

    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Preparar datos del pedido
            const pedidoData = {
                usuarioId: usuario.id,
                direccionEntrega: `${formData.direccion}, ${formData.ciudad}`,
                telefono: formData.telefono,
                notas: formData.notas,
                productos: carrito.map(item => ({
                    productoId: item.id,
                    cantidad: item.cantidad,
                    precioUnitario: item.precio
                })),
                total: calcularTotal(),
                estado: "PENDIENTE"
            };

            console.log("Enviando pedido:", pedidoData);

            const nuevoPedido = await createPedido(pedidoData);
            
            console.log("Pedido creado exitosamente:", nuevoPedido);
            
            // Limpiar carrito y notificar
            localStorage.removeItem("carrito");
            onPedidoCreado(nuevoPedido);

        } catch (error) {
            console.error("Error al crear pedido:", error);
            alert("Error al procesar el pedido. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <Text variant="h2">Finalizar Compra</Text>
                <Text variant="p">Completa tus datos de envío</Text>
            </div>

            <div className="checkout-content">
                {/* Resumen del pedido */}
                <div className="order-summary">
                    <Text variant="h3">Resumen del Pedido</Text>
                    <div className="productos-list">
                        {carrito.map(item => (
                            <div key={item.id} className="producto-item">
                                <img src={item.imagen} alt={item.titulo} className="producto-img" />
                                <div className="producto-info">
                                    <Text variant="h4">{item.titulo}</Text>
                                    <Text variant="p">Cantidad: {item.cantidad}</Text>
                                </div>
                                <Text variant="h4" className="producto-precio">
                                    ${(item.precio * item.cantidad).toLocaleString()}
                                </Text>
                            </div>
                        ))}
                    </div>
                    <div className="order-total">
                        <Text variant="h3">Total: ${calcularTotal().toLocaleString()}</Text>
                    </div>
                </div>

                {/* Formulario de envío */}
                <form onSubmit={handleSubmit} className="shipping-form">
                    <Text variant="h3">Datos de Envío</Text>

                    <div className="form-group">
                        <Text variant="label">Dirección completa *</Text>
                        <Input
                            type="text"
                            placeholder="Calle, número, departamento"
                            value={formData.direccion}
                            onChange={(e) => handleInputChange('direccion', e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <Text variant="label">Ciudad *</Text>
                        <Input
                            type="text"
                            placeholder="Tu ciudad"
                            value={formData.ciudad}
                            onChange={(e) => handleInputChange('ciudad', e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <Text variant="label">Teléfono de contacto *</Text>
                        <Input
                            type="tel"
                            placeholder="+56 9 1234 5678"
                            value={formData.telefono}
                            onChange={(e) => handleInputChange('telefono', e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <Text variant="label">Notas adicionales (opcional)</Text>
                        <textarea
                            placeholder="Instrucciones especiales para la entrega..."
                            value={formData.notas}
                            onChange={(e) => handleInputChange('notas', e.target.value)}
                            className="notes-input"
                            rows="3"
                        />
                    </div>

                    <div className="form-actions">
                        <Button
                            type="button"
                            text="Cancelar"
                            variant="secondary"
                            onClick={onCancel}
                            disabled={loading}
                        />
                        <Button
                            type="submit"
                            text={loading ? "Procesando..." : "Confirmar Pedido"}
                            variant="primary"
                            disabled={loading}
                            className="confirm-button"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Checkout;