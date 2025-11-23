// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// COMPONENTES - Nuevas rutas
import Header from "./components/organisms/layout/Header";
import Footer from "./components/organisms/layout/Footer";

// PÁGINAS - Nuevas rutas
import Index from "./pages/public/Index";
import Productos from "./pages/public/Productos";
import Nosotros from "./pages/public/Nosotros";
import Contacto from "./pages/public/Contacto";
import Login from "./pages/public/Login";
import Registro from "./pages/public/Registro";
import Carrito from "./pages/public/Carrito";

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

    // Determinar si mostrar el Footer (no mostrar en login)
    const showFooter = location.pathname !== "/login";

    return (
        <div className="app-wrapper">
            <Header carrito={carrito} />
            
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Navigate to="/inicio" replace />} />
                    <Route 
                        path="/inicio" 
                        element={<Index agregarAlCarrito={agregarAlCarrito} />} 
                    />
                    <Route 
                        path="/productos" 
                        element={<Productos agregarAlCarrito={agregarAlCarrito} />} 
                    />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route 
                        path="/carrito" 
                        element={<Carrito carrito={carrito} onRemove={eliminarDelCarrito} />} 
                    />
                </Routes>
            </main>
            
            {/* Footer condicional */}
            {showFooter && <Footer />}
        </div>
    );
}

export default App;