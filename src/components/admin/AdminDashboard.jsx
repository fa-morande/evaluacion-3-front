import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import '../../styles/components/admin/AdminDashboard.css';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="admin-dashboard-container">
            {/* Header de Bienvenida */}
            <div className="welcome-banner" style={{ marginBottom: '2rem' }}>
                <h1 style={{ color: '#1e293b' }}>Hola, {user?.nombre || 'Admin'} 👋</h1>
                <p style={{ color: '#64748b' }}>Aquí tienes un resumen de lo que pasa en tu tienda hoy.</p>
            </div>
            
            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Ventas Totales</h3>
                    <p className="value">$1.2M</p>
                    <span className="trend positive">↗ 12% vs mes pasado</span>
                </div>
                <div className="stat-card">
                    <h3>Pedidos Pendientes</h3>
                    <p className="value">8</p>
                    <Link to="/admin/pedidos" style={{ fontSize: '0.9rem', color: '#3b82f6' }}>Ver todos</Link>
                </div>
                <div className="stat-card">
                    <h3>Usuarios Totales</h3>
                    <p className="value">156</p>
                </div>
                <div className="stat-card">
                    <h3>Productos</h3>
                    <p className="value">42</p>
                </div>
            </div>

            {/* Aquí podrías agregar una tabla de "Últimos Pedidos" en el futuro */}
        </div>
    );
};
export default AdminDashboard;