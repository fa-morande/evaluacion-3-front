// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// PÁGINAS PÚBLICAS
import Index from '../pages/public/Index';
import Productos from '../pages/public/Productos';
import Carrito from '../pages/public/Carrito';
import Login from '../pages/public/Login';
import Registro from '../pages/public/Registro';
import Nosotros from '../pages/public/Nosotros';
import Contacto from '../pages/public/Contacto';

// PÁGINAS DE USUARIO
import MisPedidos from '../pages/user/MisPedidos';
import Perfil from '../pages/user/Perfil';

// PÁGINAS DE ADMIN
import Admin from '../pages/admin/Admin';
import AdminLogin from '../pages/admin/AdminLogin';

// COMPONENTES
import ProtectedRoute from '../components/organisms/layout/ProtectedRoute';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Index />} />
                <Route path="/inicio" element={<Index />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/contacto" element={<Contacto />} />
                
                {/* Rutas de usuario */}
                <Route path="/mis-pedidos" element={<MisPedidos />} />
                <Route path="/perfil" element={<Perfil />} />
                
                {/* Rutas de administración */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                    path="/admin/*" 
                    element={
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                    } 
                />
                
                {/* Ruta por defecto */}
                <Route path="*" element={<Index />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;