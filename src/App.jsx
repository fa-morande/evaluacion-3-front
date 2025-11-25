import React, { useState, useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import "./App.css";

function App() {
    // 1. INICIALIZACIÓN PERSISTENTE
    // En lugar de empezar con [], revisamos si ya hay algo guardado
    const [carrito, setCarrito] = useState(() => {
        const carritoGuardado = localStorage.getItem("carrito");
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });

    // 2. EFECTO DE GUARDADO AUTOMÁTICO
    // Cada vez que 'carrito' cambie, lo guardamos en localStorage
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto) => {
        // Verificamos si ya existe
        const existe = carrito.some(item => item.id === producto.id);

        if (existe) {
            alert("Este producto ya está en tu carrito 🛒");
        } else {
            // Agregamos el producto con cantidad inicial 1
            const nuevoProducto = { ...producto, cantidad: 1 };
            setCarrito([...carrito, nuevoProducto]);
            alert("¡Producto agregado! ✅");
        }
    };

    const eliminarDelCarrito = (id) => {
        setCarrito(carrito.filter((item) => item.id !== id));
    };

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