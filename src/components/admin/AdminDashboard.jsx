import React from 'react';
import '../../styles/components/admin/AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard-container">
            <h2 className="dashboard-title">Resumen General</h2>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Ventas Totales</h3>
                    <p className="value">$1.2M</p>
                </div>
                <div className="stat-card">
                    <h3>Pedidos</h3>
                    <p className="value">34</p>
                </div>
                <div className="stat-card">
                    <h3>Usuarios</h3>
                    <p className="value">156</p>
                </div>
            </div>
        </div>
    );
};
export default AdminDashboard;