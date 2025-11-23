import React from 'react';
import Text from '../atoms/Text';
import '../../styles/components/admin/AdminSidebar.css';

function AdminSidebar({ seccionActiva, onSeccionChange, onLogout, adminUser }) {
    const menuItems = [
        { key: 'dashboard', label: 'Dashboard', icon: '📊' },
        { key: 'productos', label: 'Productos', icon: '📦' },
        { key: 'categorias', label: 'Categorías', icon: '🏷️' },
        { key: 'pedidos', label: 'Pedidos', icon: '📋' },
        { key: 'usuarios', label: 'Usuarios', icon: '👥' }
    ];

    return (
        <aside className="admin-sidebar">
        <div className="sidebar-header">
            <h2>Panel Admin</h2>
            <div className="user-info">
            <Text variant="p" className="user-email">
                {adminUser?.email}
            </Text>
            <Text variant="span" className="user-role">
                Administrador
            </Text>
            </div>
        </div>
        
        <nav className="sidebar-nav">
            {menuItems.map(item => (
            <button
                key={item.key}
                className={`nav-item ${seccionActiva === item.key ? 'active' : ''}`}
                onClick={() => onSeccionChange(item.key)}
            >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
            </button>
            ))}
        </nav>
        
        <div className="sidebar-footer">
            <button className="logout-btn" onClick={onLogout}>
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Cerrar Sesión</span>
            </button>
        </div>
        </aside>
    );
}

export default AdminSidebar;