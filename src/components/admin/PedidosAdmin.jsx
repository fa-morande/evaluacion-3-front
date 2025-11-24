import React from 'react';
import Button from '../atoms/Button';
import '../../styles/components/admin/AdminGlobal.css';

// Datos Mock
const PEDIDOS_MOCK = [
    { id: 'ORD-001', cliente: 'Juan Pérez', total: 45990, estado: 'Pendiente', fecha: '2023-10-23' },
    { id: 'ORD-002', cliente: 'Maria Silva', total: 12500, estado: 'Completado', fecha: '2023-10-22' },
    { id: 'ORD-003', cliente: 'Carlos Ruiz', total: 89000, estado: 'Cancelado', fecha: '2023-10-21' },
];

function PedidosAdmin() {
    const getStatusBadge = (status) => {
        switch(status) {
            case 'Completado': return 'badge badge-success';
            case 'Pendiente': return 'badge badge-warning';
            case 'Cancelado': return 'badge badge-danger';
            default: return 'badge badge-info';
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-section-header">
                <h1>Gestión de Pedidos</h1>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID Pedido</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PEDIDOS_MOCK.map((pedido) => (
                            <tr key={pedido.id}>
                                <td style={{ fontFamily: 'monospace' }}>#{pedido.id}</td>
                                <td>{pedido.cliente}</td>
                                <td>{pedido.fecha}</td>
                                <td style={{ fontWeight: 'bold' }}>${pedido.total.toLocaleString('es-CL')}</td>
                                <td>
                                    <span className={getStatusBadge(pedido.estado)}>
                                        {pedido.estado}
                                    </span>
                                </td>
                                <td>
                                    <Button text="Ver Detalle" size="small" variant="secondary" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PedidosAdmin;