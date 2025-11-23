import React from 'react';
import { useAuth } from '../../context/AuthContext';
// Asegúrate de crear este CSS en el paso 2 para que no falle
import '../../styles/pages/admin/AdminHome.css'; 

const AdminHome = () => {
    const { user } = useAuth();

    return (
        <div className="admin-home-container">
            <header className="welcome-section">
                <h1>¡Hola, {user?.nombre || 'Administrador'}!</h1>
                <p>Bienvenido al panel de control de Helpet.</p>
            </header>

            <div className="dashboard-widgets">
                {/* Widget de Ejemplo */}
                <div className="widget-card">
                    <h3>Acciones Rápidas</h3>
                    <div className="action-buttons">
                        <button className="btn-action">Ver Pedidos</button>
                        <button className="btn-action">Gestionar Productos</button>
                    </div>
                </div>
                
                <div className="widget-card">
                    <h3>Estado del Sistema</h3>
                    <p>Todo funcionando correctamente.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;