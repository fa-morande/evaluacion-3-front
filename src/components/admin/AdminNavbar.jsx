import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../styles/components/organisms/layout/AdminNavbar.css';

function AdminNavbar({ adminUser, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <nav className="admin-navbar">
            <div className="admin-navbar-brand">
                <Link to="/admin">
                    <h2>Panel Administrativo</h2>
                </Link>
            </div>
            
            <div className="admin-navbar-user">
                <span className="user-info">
                    {adminUser?.email} (Administrador)
                </span>
                <button 
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    🚪 Cerrar Sesión
                </button>
            </div>
        </nav>
    );
}

export default AdminNavbar;