import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Checkout from "../../components/organisms/cart/Checkout.jsx";
import OrderConfirmation from "../../components/organisms/cart/OrderConfirmation.jsx";
import CarritoCard from "../../components/molecules/cards/CarritoCard";
import Button from "../../components/atoms/Button";
import Text from "../../components/atoms/Text";
import "../../styles/pages/public/Carrito.css";

function Carrito() {
    const [carrito, setCarrito] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [showCheckout, setShowCheckout] = useState(false);
    const [pedidoConfirmado, setPedidoConfirmado] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Cargar Carrito de forma segura
        try {
            const carritoGuardado = JSON.parse(localStorage.getItem("carrito") || "[]");
            setCarrito(Array.isArray(carritoGuardado) ? carritoGuardado : []);
        } catch (e) {
            console.error("Error al leer el carrito:", e);
            setCarrito([]);
        }

        // 2. Cargar Usuario (Usando la llave correcta 'user')
        try {
            const usuarioGuardado = localStorage.getItem("user");
            if (usuarioGuardado) {
                setUsuario(JSON.parse(usuarioGuardado));
            }
        } catch (e) {
            console.error("Error al leer el usuario:", e);
        }
    }, []);

    const actualizarCantidad = (productoId, nuevaCantidad) => {
        if (nuevaCantidad < 1) {
            eliminarProducto(productoId);
            return;
        }
        
        const carritoActualizado = carrito.map(item =>
            item.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
        );
        
        setCarrito(carritoActualizado);
        localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    };

    const eliminarProducto = (productoId) => {
        const carritoActualizado = carrito.filter(item => item.id !== productoId);
        setCarrito(carritoActualizado);
        localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    };

    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + (Number(item.precio) * Number(item.cantidad)), 0);
    };

    const handleIniciarCheckout = () => {
        if (!usuario) {
            alert("Debes iniciar sesión para realizar una compra");
            navigate("/login");
            return;
        }
        setShowCheckout(true);
    };

    const handlePedidoCreado = (nuevoPedido) => {
        setPedidoConfirmado(nuevoPedido);
        setShowCheckout(false);
        setCarrito([]);
        localStorage.removeItem("carrito");
        // Forzamos un evento de storage por si acaso hay otros componentes escuchando
        window.dispatchEvent(new Event("storage"));
    };

    const handleCancelCheckout = () => {
        setShowCheckout(false);
    };

    // --- RENDERIZADO CONDICIONAL ---

    if (pedidoConfirmado) {
        return <OrderConfirmation pedido={pedidoConfirmado} />;
    }

    if (showCheckout) {
        return (
            <Checkout
                carrito={carrito}
                usuario={usuario}
                onPedidoCreado={handlePedidoCreado}
                onCancel={handleCancelCheckout}
            />
        );
    }

    return (
        <div className="carrito-page">
            <div className="carrito-container">
                <Text variant="h1">Mi Carrito</Text>

                {carrito.length === 0 ? (
                    <div className="carrito-vacio">
                        <Text variant="h2">Tu carrito está vacío</Text>
                        <Text variant="p">Agrega algunos productos para comenzar</Text>
                        <Button 
                            text="Ver Productos" 
                            onClick={() => navigate("/productos")} 
                            variant="primary" 
                        />
                    </div>
                ) : (
                    <>
                        <div className="carrito-items">
                            {carrito.map(item => (
                                <CarritoCard
                                    key={item.id}
                                    producto={item}
                                    onActualizarCantidad={actualizarCantidad}
                                    onEliminar={eliminarProducto}
                                />
                            ))}
                        </div>

                        <div className="carrito-resumen">
                            <div className="resumen-total">
                                <Text variant="h3">Total: ${calcularTotal().toLocaleString('es-CL')}</Text>
                            </div>
                            
                            <div style={{display:'flex', gap:'10px', marginTop:'1rem', flexWrap:'wrap'}}>
                                <Button
                                    text="Seguir Comprando"
                                    onClick={() => navigate("/productos")}
                                    variant="secondary"
                                />
                                <Button
                                    text="Finalizar Compra"
                                    onClick={handleIniciarCheckout}
                                    variant="primary"
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Carrito;