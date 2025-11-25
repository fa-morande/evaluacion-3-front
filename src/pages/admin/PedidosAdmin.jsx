import React, { useEffect, useState } from 'react';
import { getPedidos } from '../../services/api/pedidos';
import Button from '../../components/atoms/Button'; 
import '../../styles/components/admin/AdminGlobal.css';

function PedidosAdmin() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

r
    useEffect(() => {
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        try {
            const data = await getPedidos();

            const lista = Array.isArray(data) ? data : [];
            

            setPedidos(lista.sort((a, b) => b.id - a.id));
        } catch (error) {
            console.error("Error cargando pedidos:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const s = (status || '').toUpperCase();
        switch(s) {
            case 'COMPLETADO': return 'badge badge-success';
            case 'PENDIENTE': return 'badge badge-warning';
            case 'CANCELADO': return 'badge badge-danger';
            default: return 'badge badge-info';
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-section-header">
                <h1>Gestión de Pedidos</h1>
                <Button text="Recargar Datos" onClick={cargarPedidos} variant="secondary" size="small"/>
            </div>

            <div className="table-container">
                {loading ? <p>Cargando pedidos...</p> : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.length === 0 ? (
                                <tr><td colSpan="6" style={{textAlign:'center'}}>No hay pedidos registrados</td></tr>
                            ) : (
                                pedidos.map((pedido) => (
                                    <tr key={pedido.id}>
                                        <td>#{pedido.id}</td>
                                        <td>
                                            {pedido.usuario?.nombre || 'Anónimo'} <br/>
                                            <span style={{fontSize:'0.8rem', color:'#666'}}>{pedido.usuario?.email}</span>
                                        </td>
                                        <td>
                                            {new Date(pedido.fechaCreacion || Date.now()).toLocaleDateString()}
                                        </td>
                                        <td style={{ fontWeight: 'bold' }}>
                                            ${pedido.total?.toLocaleString('es-CL')}
                                        </td>
                                        <td>
                                            <span className={getStatusBadge(pedido.estado)}>
                                                {pedido.estado}
                                            </span>
                                        </td>
                                        <td>
                                            {pedido.detalles ? pedido.detalles.length : 0} productos
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default PedidosAdmin;