import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// COMPONENTES
import Header from "./components/organisms/layout/Header";
import Footer from "./components/organisms/layout/Footer";

// PÁGINAS PÚBLICAS
import Inicio from "./pages/public/Inicio";
import Productos from "./pages/public/Productos";
import Nosotros from "./pages/public/Nosotros";
import Contacto from "./pages/public/Contacto";
import Login from "./pages/public/Login";
import Registro from "./pages/public/Registro";
import Carrito from "./pages/public/Carrito";

// PÁGINAS ADMIN
import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/AdminLogin";

// ESTILOS
import "./App.css";
import "./styles/components/organisms/layout/Footer.css";

function App() {
    const [carrito, setCarrito] = useState([]);
    const location = useLocation();

    const agregarAlCarrito = (producto) => {
        if (!carrito.some(item => item.id === producto.id)) {
            setCarrito([...carrito, producto]);
            alert(`${producto.nombre || producto.name || 'Producto'} agregado al carrito`);
        } else {
            alert(`${producto.nombre || producto.name || 'Producto'} ya está en el carrito.`);
        }
    };

    const eliminarDelCarrito = (id) => {
        setCarrito(carrito.filter((item) => item.id !== id));
    };

    // Determinar si mostrar Header y Footer (no mostrar en rutas de admin)
    const isAdminRoute = location.pathname.startsWith('/admin');
    const showFooter = location.pathname !== "/login" && !isAdminRoute;
    const showHeader = !isAdminRoute;

    return (
        <div className="app-wrapper">
            {/* Header solo para rutas públicas */}
            {showHeader && <Header carrito={carrito} />}
            
            <main className="main-content">
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/" element={<Navigate to="/inicio" replace />} />
                    <Route path="/inicio" element={<Inicio agregarAlCarrito={agregarAlCarrito} />} />
                    <Route path="/productos" element={<Productos agregarAlCarrito={agregarAlCarrito} />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/carrito" element={<Carrito carrito={carrito} onEliminarDelCarrito={eliminarDelCarrito} />} />
                    
                    {/* Rutas de Admin - sin Header/Footer */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/*" element={<Admin />} />
                </Routes>
            </main>
            
            {/* Footer solo para rutas públicas */}
            {showFooter && <Footer />}
        </div>
    );
}

export default App;