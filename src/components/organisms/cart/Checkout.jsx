import React, { useState } from "react";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import pedidoService from "../../../services/api/pedidos"; // IMPORT CORREGIDO
import "../../../styles/components/atoms/Button.css";

const Checkout = ({ carrito, usuario, onPedidoCreado, onCancel }) => {
    const [loading, setLoading] = useState(false);
    
    /*--> Datos minimos requeridos el JSON*/
    const [direccion, setDireccion] = useState(usuario.direccion || "");
    const [metodoPago, setMetodoPago] = useState("Transferencia");
    const [notas, setNotas] = useState("");

    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    const handleConfirmarCompra = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const detallesPedido = carrito.map(item => ({
                producto: { id: item.id },
                cantidad: item.cantidad,
                precioUnitario: item.precio
            }));

            const payload = {
                usuario: { id: usuario.id || usuario.usuario?.id },
                total: totalCompra,
                estado: "PENDIENTE",
                direccionEnvio: direccion,
                metodoPago: metodoPago,
                notas: notas,
                detalles: detallesPedido
            };

            console.log(" Enviando pedido:", payload);

            /*-->LLAMADA A LA API*/
            // Axios devuelve un objeto response completo
            const response = await pedidoService.createPedido(payload);
            const data = response.data; // Los datos reales están aquí
            
            alert(`¡Pedido #${data.id || 'creado'} confirmado!`);
            
            /*--> LIMPIEZA*/
            onPedidoCreado(data); 

        } catch (error) {
            console.error(error);
            // Manejo de error de Axios
            const mensaje = error.response?.data?.message || error.message || "Error desconocido";
            alert("Error al procesar compra: " + mensaje);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <Text variant="h2">Confirmar Pedido</Text>
            
            <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
                <Text variant="h4">Resumen</Text>
                <p>Items: {carrito.length}</p>
                <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Total a Pagar: ${totalCompra.toLocaleString()}</p>
            </div>

            <form onSubmit={handleConfirmarCompra} style={{ display: 'grid', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Dirección de Envío</label>
                    <input 
                        type="text" 
                        value={direccion} 
                        onChange={e => setDireccion(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                        placeholder="Calle 123, Ciudad"
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Método de Pago</label>
                    <select 
                        value={metodoPago} 
                        onChange={e => setMetodoPago(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    >
                        <option value="Transferencia">Transferencia Bancaria</option>
                        <option value="Tarjeta">Tarjeta de Crédito/Débito</option>
                        <option value="Efectivo">Efectivo contra entrega</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Notas (Opcional)</label>
                    <textarea 
                        value={notas} 
                        onChange={e => setNotas(e.target.value)}
                        rows="2"
                        style={{ width: '100%', padding: '8px' }}
                        placeholder="Ej: Dejar en conserjería"
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <Button 
                        text="Cancelar" 
                        variant="secondary" 
                        onClick={onCancel} 
                        type="button"
                    />
                    <Button 
                        text={loading ? "Procesando..." : "Confirmar Compra"} 
                        variant="primary" 
                        type="submit"
                        disabled={loading}
                    />
                </div>
            </form>
        </div>
    );
};

export default Checkout;