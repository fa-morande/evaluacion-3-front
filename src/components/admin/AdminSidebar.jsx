import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import '../../styles/components/admin/AdminSidebar.css'; 

const AdminSidebar = () => {
    // CORRECCIÓN: Desestructuramos 'logoutUser', que es el nombre real en tu Contexto
    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // CORRECCIÓN: Llamamos a la función correcta
        logoutUser();
        navigate('/login'); 
    };

    return (
        <aside className="admin-sidebar">
            <h2>Panel Admin</h2>
            <nav>
                <ul>
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