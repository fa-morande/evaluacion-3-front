// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Carrito from "./pages/Carrito";
// Importa aquí todas tus páginas...

import "./styles/organisms/Footer.css";

function App() {
    const [carrito, setCarrito] = useState([]);

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

    return (
        <div className="app-wrapper">
        <Header carrito={carrito} />
        
        <main className="main-content">
            <Routes>
            <Route path="/" element={<Navigate to="/inicio" replace />} />
            <Route 
                path="/inicio" 
                element={<Inicio agregarAlCarrito={agregarAlCarrito} />} 
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
            {/* Agrega aquí el resto de tus rutas */}
            </Routes>
        </main>
        
        <Footer />
        </div>
    );
}

export default App;