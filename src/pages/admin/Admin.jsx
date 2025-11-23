import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../components/admin/AdminDashboard';
import CategoriasAdmin from '../components/admin/CategoriasAdmin';
import ProductosAdmin from '../components/admin/ProductosAdmin';
import PedidosAdmin from '../components/admin/PedidosAdmin';
import UsuariosAdmin from '../components/admin/UsuariosAdmin';
import '../styles/pages/Admin.css';

function Admin() {
    const [seccionActiva, setSeccionActiva] = useState('dashboard');
    const [adminUser, setAdminUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el usuario está logueado como admin
        const user = JSON.parse(localStorage.getItem('adminUser') || 'null');
        console.log("Usuario admin encontrado:", user); // Debug
        
        if (!user || user.role !== 'ADMIN') {
            console.log("Redirigiendo a login..."); // Debug
            navigate('/admin/login');
        } else {
            setAdminUser(user);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminUser');
        localStorage.removeItem('usuario');
        navigate('/admin/login');
    };

    const renderSeccion = () => {
        switch (seccionActiva) {
            case 'dashboard':
                return <AdminDashboard />;
            case 'categorias':
                return <CategoriasAdmin />;
            case 'productos':
                return <ProductosAdmin />;
            case 'pedidos':
                return <PedidosAdmin />;
            case 'usuarios':
                return <UsuariosAdmin />;
            default:
                return <AdminDashboard />;
        }
    };

    if (!adminUser) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="admin-container">
            <AdminSidebar 
                seccionActiva={seccionActiva}
                onSeccionChange={setSeccionActiva}
                onLogout={handleLogout}
                adminUser={adminUser}
            />
            <main className="admin-main">
                {renderSeccion()}
            </main>
        </div>
    );
}

export default Admin;