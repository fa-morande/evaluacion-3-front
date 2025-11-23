import React, { useState, useEffect } from "react";
import { getPedidosPorUsuario } from "../../services/api/pedidos";
import Text from "../../components/atoms/Text";
import "../../styles/pages/user/MisPedidos.css";

function MisPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioData = JSON.parse(localStorage.getItem("usuario") || "null");
        setUsuario(usuarioData);

        if (usuarioData) {
            cargarPedidos(usuarioData.id);
        }
    }, []);

    const cargarPedidos = async (usuarioId) => {
        try {
            const pedidosData = await getPedidosPorUsuario(usuarioId);
            setPedidos(pedidosData);
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
                                    <Text variant="p"><strong>Total:</strong> ${pedido.total?.toLocaleString()}</Text>
                                    <Text variant="p"><strong>Dirección:</strong> {pedido.direccionEntrega}</Text>
                                </div>

                                {pedido.productos && (
                                    <div className="productos-pedido">
                                        <Text variant="h4">Productos:</Text>
                                        {pedido.productos.map((producto, index) => (
                                            <div key={index} className="producto-pedido">
                                                <Text variant="p">{producto.nombre} x {producto.cantidad}</Text>
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