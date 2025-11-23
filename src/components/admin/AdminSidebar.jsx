import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Para el logout
// IMPORTANTE: Aquí conectamos el CSS
import '../../styles/components/admin/AdminSidebar.css'; 

const AdminSidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        // CAMBIO: Redirigir al login general
        navigate('/login'); 
    };

    return (
        <aside className="admin-sidebar">
            <h2>Panel Admin</h2>
            <nav>
                <ul>
                    {/* Ajusta las rutas según tu Router */}
                    <li>
                        <Link to="/admin">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/productos">Productos</Link>
                    </li>
                    <li>
                        <Link to="/admin/usuarios">Usuarios</Link>
                    </li>
                    <li>
                        <Link to="/admin/pedidos">Pedidos</Link>
                    </li>
                </ul>
            </nav>

            <button onClick={handleLogout} className="admin-logout">
                Cerrar Sesión
            </button>
        </aside>
    );
};

export default AdminSidebar;