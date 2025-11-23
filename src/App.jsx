import React, { useState } from "react";
import AppRouter from "./routes/AppRouter"; // Importamos el Router Maestro
import "./App.css";

function App() {
    // 1. ESTADO DEL CARRITO (Se mantiene aquí por ahora)
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        if (!carrito.some(item => item.id === producto.id)) {
            setCarrito([...carrito, producto]);
            alert(`${producto.nombre || producto.name || 'Producto'} agregado al carrito`);
        } else {
            alert("El producto ya está en el carrito.");
        }
    };

    const eliminarDelCarrito = (id) => {
        setCarrito(carrito.filter((item) => item.id !== id));
    };

    // 2. RENDERIZADO
    // Ya no usamos <Routes> aquí. Le pasamos los datos al AppRouter.
    return (
        <div className="app-wrapper">
            <AppRouter 
                carrito={carrito} 
                agregarAlCarrito={agregarAlCarrito} 
                eliminarDelCarrito={eliminarDelCarrito} 
            />
        </div>
    );
}

export default App;