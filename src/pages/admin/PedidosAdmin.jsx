import React, { useEffect, useState } from 'react';
import pedidoService from '../../services/api/pedidos'; // IMPORT CORREGIDO
import AdminTable from '../../components/organisms/AdminTable'; 
import Button from '../../components/atoms/Button'; 
import '../../styles/components/admin/AdminGlobal.css';

const PedidosAdmin = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        try {
            // Axios response
            const response = await pedidoService.getPedidos();
            // Data en .data
            const lista = Array.isArray(response.data) ? response.data : (response.data?.pedidos || []);
            
            // Ordenar descendente por ID
            setPedidos(lista.sort((a, b) => b.id - a.id));
        } catch (error) {
            console.error("Error cargando pedidos:", error);
        } finally {
            setLoading(false);
        }
    };

    // Definición de columnas
    const columns = [
        { 
            header: 'ID', 
            accessor: 'id', 
            render: (row) => <span style={{fontFamily:'monospace'}}>#{row.id}</span> 
        },
        { 
            header: 'Cliente', 
            accessor: 'usuario',
            render: (row) => (
                <div>
                    <strong>{row.usuario?.nombre || 'Anónimo'}</strong>
                    <br/>
                    <span style={{fontSize:'0.8rem', color:'#666'}}>
                        {row.usuario?.email || row.usuario?.correo}
                    </span>
                </div>
            )
        },
        { 
            header: 'Fecha', 
            accessor: 'fechaCreacion',
            render: (row) => {
                const fecha = row.fechaCreacion ? new Date(row.fechaCreacion) : new Date();
                return fecha.toLocaleDateString('es-CL');
            }
        },
        { 
            header: 'Total', 
            accessor: 'total',
            render: (row) => <strong>${Number(row.total).toLocaleString('es-CL')}</strong>
        },
        { 
            header: 'Estado', 
            accessor: 'estado',
            render: (row) => {
                const estado = (row.estado || 'PENDIENTE').toUpperCase();
                
                let color = '#3b82f6';
                let bg = '#eff6ff';

                if (estado === 'COMPLETADO' || estado === 'ENTREGADO' || estado === 'CONFIRMADO') { color = '#22c55e'; bg = '#f0fdf4'; }
                else if (estado === 'PENDIENTE') { color = '#eab308'; bg = '#fefce8'; }
                else if (estado === 'CANCELADO') { color = '#ef4444'; bg = '#fef2f2'; }

                return (
                    <span style={{
                        color: color,
                        backgroundColor: bg,
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: '0.75rem', 
                        fontWeight: 'bold'
                    }}>
                        {estado}
                    </span>
                );
            }
        },
        {
            header: 'Detalles',
            render: (row) => (
                <span style={{fontSize:'0.9rem'}}>
                    {row.detalles ? row.detalles.length : 0} items
                </span>
            )
        }
    ];

    return (
        <div className="admin-page">
            <div className="admin-section-header" style={{display:'flex', justifyContent:'space-between'}}>
                <h1>Gestión de Pedidos</h1>
                <Button text="Recargar" onClick={cargarPedidos} variant="secondary" size="small"/>
            </div>

            <div className="admin-table-wrapper">
                {loading ? <p>Cargando...</p> : (
                    <AdminTable 
                        columns={columns} 
                        data={pedidos} 
                    />
                )}
            </div>
        </div>
    );
};

export default PedidosAdmin;