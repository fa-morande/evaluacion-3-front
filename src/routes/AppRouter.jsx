import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

// LAYOUTS
import MainLayout from '../components/organisms/layout/MainLayout';
import AdminLayout from '../components/organisms/layout/AdminLayout';

// PÁGINAS
import Inicio from '../pages/public/Inicio';
import Productos from '../pages/public/Productos';
import Carrito from '../pages/public/Carrito';
import Login from '../pages/public/Login';
import Registro from '../pages/public/Registro';
import Nosotros from '../pages/public/Nosotros';
import Contacto from '../pages/public/Contacto';
import MisPedidos from '../pages/user/MisPedidos';
import Perfil from '../pages/user/Perfil';

// PÁGINAS ADMIN
import AdminDashboard from '../components/admin/AdminDashboard';
import ProductosAdmin from '../components/admin/ProductosAdmin';
import PedidosAdmin from '../components/admin/PedidosAdmin';
import UsuariosAdmin from '../components/admin/UsuariosAdmin';

function AppRouter({ carrito, agregarAlCarrito, eliminarDelCarrito }) {
    return (
        <AuthProvider>
            <Routes>
                {/* ZONA PÚBLICA */}
                <Route element={<MainLayout carrito={carrito} />}>
                    <Route path="/" element={<Navigate to="/inicio" replace />} />
                    <Route path="/inicio" element={<Inicio agregarAlCarrito={agregarAlCarrito} />} />
                    <Route path="/productos" element={<Productos agregarAlCarrito={agregarAlCarrito} />} />
                    <Route path="/carrito" element={<Carrito carrito={carrito} onEliminarDelCarrito={eliminarDelCarrito} />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/mis-pedidos" element={<MisPedidos />} />
                    <Route path="/perfil" element={<Perfil />} />
                </Route>

                {/* ZONA ADMIN */}
                <Route path="/admin" element={<AdminLayout />}>
                 {/* Dashboard es el home */}
                    <Route index element={<AdminDashboard />} />
                    <Route path="productos" element={<ProductosAdmin />} />
                    <Route path="pedidos" element={<PedidosAdmin />} />
                    <Route path="usuarios" element={<UsuariosAdmin />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AuthProvider>
    );
}

export default AppRouter;