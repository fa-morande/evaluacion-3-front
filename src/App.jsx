import React, { useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
// Importamos SÓLO el layout global y la configuración de rutas
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import { appRoutes } from "./routes/Config"; // <-- Importamos la configuración del paso 1
import "./styles/organisms/Footer.css"; // Mantener los imports de CSS

// Componente Wrapper para manejar el Layout condicional (Header/Footer)
const LayoutWrapper = ({ Component, showNavbar, ...props }) => {
    // Si showNavbar es false (Login, Registro), mostramos solo la página
    if (!showNavbar) {
        return (
            <Suspense fallback={<div>Cargando...</div>}>
                <Component {...props} />
            </Suspense>
        );
    }
    
    // Si showNavbar es true (Home, Productos, etc.), mostramos el layout completo
    return (
        <>
            <Header carrito={props.carrito} /> 
            <main>
                <Suspense fallback={<div>Cargando...</div>}>
                    {/* Renderizamos el componente de la página, pasándole el carrito y funciones */}
                    <Component {...props} /> 
                </Suspense>
            </main>
            <Footer />
        </>
    );
};

function App() {
    // Estado central del Carrito
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        if (!carrito.some(item => item.id === producto.id)) {
            setCarrito([...carrito, producto]);
            alert(`${producto.nombre || 'Producto'} agregado al carrito`);
        } else {
            alert(`${producto.nombre || 'Producto'} ya está en el carrito.`);
        }
    };

    const eliminarDelCarrito = (id) => {
        setCarrito(carrito.filter((item) => item.id !== id));
    };

    return (
        <Routes>
            {/* Hacemos un map sobre el array de rutas de Config.jsx */}
            {appRoutes.map(({ path, element: Component, showNavbar }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <LayoutWrapper
                            Component={Component}
                            showNavbar={showNavbar}
                            // Pasamos el estado del carrito y sus acciones a todas las rutas
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