import React, { useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
// Importamos SÓLO los organismos globales (Header/Footer)
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import { appRoutes } from "../routes/Config"; // <--- CLAVE: Importamos el array de rutas

// Componente Wrapper para manejar el Layout condicional
const RouteWrapper = ({ Component, showNavbar, ...props }) => {
    
    // Si showNavbar es falso (como en /login o /registro), solo mostramos el componente
    if (!showNavbar) {
        return (
            <Suspense fallback={<div>Cargando...</div>}>
                <Component {...props} />
            </Suspense>
        );
    }
    
    // Si showNavbar es true (Home, Productos, Nosotros), mostramos el layout completo
    return (
        <>
            <Header carrito={props.carrito} /> 
            <main>
                <Suspense fallback={<div>Cargando...</div>}>
                    <Component {...props} /> 
                </Suspense>
            </main>
            <Footer />
        </>
    );
};

function App() {
    // 1. Estado central del Carrito
    const [carrito, setCarrito] = useState([]);

        const agregarAlCarrito = (producto) => {
            // Lógica mejorada para evitar duplicar IDs, asumiendo que producto tiene un ID único
            if (!carrito.some(item => item.id === producto.id)) {
                setCarrito([...carrito, producto]);
                alert(`${producto.nombre} agregado al carrito`);
            } else {
                alert(`${producto.nombre} ya está en el carrito.`);
            }
    };

    const eliminarDelCarrito = (id) => {
        setCarrito(carrito.filter((item) => item.id !== id));
    };

    return (
        <Routes>
            {appRoutes.map(({ path, element: Component, showNavbar }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <RouteWrapper
                            Component={Component}
                            showNavbar={showNavbar}
                            // Pasamos el estado y las funciones a las rutas que lo necesiten
                            carrito={carrito}
                            agregarAlCarrito={agregarAlCarrito}
                            eliminarDelCarrito={eliminarDelCarrito}
                        />
                    }
                />
            ))}
        </Routes>
    );
}

export default App;