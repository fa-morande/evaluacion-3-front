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
import AdminHome from '../pages/admin/AdminHome';

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
                    {/* CORRECCIÓN: Solo UNA ruta index. Borré la duplicada. */}
                    <Route index element={<AdminHome />} />
                    
                    {/* El Dashboard ahora es una sub-ruta explícita */}
                    <Route path="dashboard" element={<AdminDashboard />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AuthProvider>
    );
}

export default AppRouter;