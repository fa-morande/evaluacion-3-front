import React from 'react';
import '../../styles/pages/admin/Admin.css';

function Admin() {
    return (
        <div className="admin-container" style={{ padding: '2rem', background: 'white' }}>
            <h1>Panel de Administración</h1>
            <p>Bienvenido al panel de administración</p>
            <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
                <h3>Funcionalidades disponibles:</h3>
                <ul>
                    <li>Gestión de Productos</li>
                    <li>Gestión de Usuarios</li>
                    <li>Gestión de Pedidos</li>
                </ul>
            </div>
        </div>
    );
}

export default Admin;