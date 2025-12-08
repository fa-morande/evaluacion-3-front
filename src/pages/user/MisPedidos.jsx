import React, { useState, useEffect } from "react";
import pedidoService from "../../services/api/pedidos"; // IMPORT CORREGIDO
import Text from "../../components/atoms/Text";
import "../../styles/pages/user/MisPedidos.css";

function MisPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        // OJO: En AuthContext usas "user", aquí decías "usuario". Lo corregí a "user".
        const usuarioData = JSON.parse(localStorage.getItem("user") || "null");
        setUsuario(usuarioData);

        if (usuarioData) {
            const id = usuarioData.id || usuarioData.usuario?.id;
            cargarPedidos(id);
        } else {
            setLoading(false);
        }
    }, []);

    const cargarPedidos = async (usuarioId) => {
        try {
            // Axios response
            const response = await pedidoService.getPedidosPorUsuario(usuarioId);
            setPedidos(response.data || []);
        } catch (error) {
            console.error("Error cargando pedidos:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!usuario) {
        return (
            <div className="mis-pedidos-page">
                <Text variant="h1">Debes iniciar sesión para ver tus pedidos</Text>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="mis-pedidos-page">
                <Text variant="h1">Cargando tus pedidos...</Text>
            </div>
        );
    }

    return (
        <div className="mis-pedidos-page">
            <div className="pedidos-container">
                <Text variant="h1">Mis Pedidos</Text>

                {pedidos.length === 0 ? (
                    <div className="no-pedidos">
                        <Text variant="h2">No tienes pedidos aún</Text>
                        <Text variant="p">¡Realiza tu primera compra!</Text>
                    </div>
                ) : (
                    <div className="pedidos-list">
                        {pedidos.map(pedido => (
                            <div key={pedido.id} className="pedido-card">
                                <div className="pedido-header">
                                    <Text variant="h3">Pedido #{pedido.id}</Text>
                                    <Text variant="span" className={`estado ${pedido.estado}`}>
                                        {pedido.estado}
                                    </Text>
                                </div>
                                
                                <div className="pedido-info">
                                    <Text variant="p"><strong>Fecha:</strong> {new Date(pedido.fechaCreacion).toLocaleDateString()}</Text>
                                    <Text variant="p"><strong>Total:</strong> ${Number(pedido.total).toLocaleString()}</Text>
                                    <Text variant="p"><strong>Dirección:</strong> {pedido.direccionEntrega || pedido.direccionEnvio}</Text>
                                </div>

                                {pedido.detalles && (
                                    <div className="productos-pedido">
                                        <Text variant="h4">Productos:</Text>
                                        {pedido.detalles.map((detalle, index) => (
                                            <div key={index} className="producto-pedido">
                                                {/* Ajuste según estructura típica de detalle pedido */}
                                                <Text variant="p">
                                                    {detalle.producto?.nombre || "Producto"} x {detalle.cantidad}
                                                </Text>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MisPedidos;