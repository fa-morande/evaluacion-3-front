import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/api/adminService';
import '../../styles/components/admin/AdminDashboard.css';

const AdminDashboard = () => {
    const { user } = useAuth();
    
    const [stats, setStats] = useState({
        ventas: 0,
        pedidosPendientes: 0,
        usuarios: 0,
        productos: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminService.dashboard.getStats();
                setStats(data);
            } catch (error) {
                console.error("Error al cargar stats del dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="admin-dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <p>Cargando información...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-container">
            <div className="welcome-banner" style={{ marginBottom: '2rem' }}>
                <h1 style={{ color: '#1e293b' }}>Hola, {user?.nombre || 'Admin'} 👋</h1>
                <p style={{ color: '#64748b' }}>Aquí tienes un resumen de lo que pasa en tu tienda hoy.</p>
            </div>
            
            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Ventas Totales</h3>

                    <p className="value">${stats.ventas}</p>
                    <span className="trend positive">--</span>
                </div>

                <div className="stat-card">
                    <h3>Pedidos Pendientes</h3>
                    <p className="value">{stats.pedidosPendientes}</p>
                    <Link to="/admin/pedidos" style={{ fontSize: '0.9rem', color: '#3b82f6' }}>Ver todos</Link>
                </div>

                <div className="stat-card">
                    <h3>Usuarios Totales</h3>
                    <p className="value">{stats.usuarios}</p>
                    <span className="trend" style={{ fontSize: '0.8rem', color: '#64748b' }}>Registrados en plataforma</span>
                </div>

                <div className="stat-card">
                    <h3>Productos</h3>
                    <p className="value">{stats.productos}</p>
                    <Link to="/admin/productos" style={{ fontSize: '0.9rem', color: '#3b82f6' }}>Gestionar inventario</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;