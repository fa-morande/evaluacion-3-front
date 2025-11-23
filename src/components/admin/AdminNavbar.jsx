import React from 'react';
import { useAuth } from '../../context/AuthContext';
// IMPORTANTE: Aquí conectamos el CSS
import '../../styles/components/admin/AdminNavbar.css'; 

const AdminNavbar = () => {
    const { user } = useAuth();

    return (
        <header className="admin-navbar">
            <h1>Administración</h1>
            
            <div className="admin-user-info">
                <span>Hola, {user?.nombre || 'Admin'}</span>
                <div className="admin-avatar">
                    {user?.nombre ? user.nombre.charAt(0).toUpperCase() : 'A'}
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;