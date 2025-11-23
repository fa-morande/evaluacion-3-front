import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api/adminService';
import '../../styles/components/admin/AdminDashboard.css';

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalProductos: 0,
        totalPedidos: 0,
        totalUsuarios: 0,
        pedidosPendientes: 0
    });

    useEffect(() => {
        cargarEstadisticas();
    }, []);

    const cargarEstadisticas = async () => {
        try {
            // Aquí puedes cargar estadísticas reales cuando tengas los servicios
            console.log("Cargando estadísticas del dashboard...");
            
            // Datos de ejemplo por ahora
            setStats({
                totalProductos: 45,
                totalPedidos: 120,
                totalUsuarios: 89,
                pedidosPendientes: 15
            });
        } catch (error) {
            console.error('Error cargando estadísticas:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Dashboard Administrativo</h1>
            <p>Bienvenido al panel de administración</p>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Productos</h3>
                    <p className="stat-number">{stats.totalProductos}</p>
                </div>
                
                <div className="stat-card">
                    <h3>Total Pedidos</h3>
                    <p className="stat-number">{stats.totalPedidos}</p>
                </div>
                
                <div className="stat-card">
                    <h3>Total Usuarios</h3>
                    <p className="stat-number">{stats.totalUsuarios}</p>
                </div>
                
                <div className="stat-card">
                    <h3>Pedidos Pendientes</h3>
                    <p className="stat-number">{stats.pedidosPendientes}</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;