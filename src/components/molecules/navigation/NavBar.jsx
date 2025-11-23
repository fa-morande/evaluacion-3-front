import React from "react";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../organisms/UserMenu"; // Nuevo import
import "../../styles/components/molecules/Navbar.css";

const Navbar = ({ carrito = [] }) => {
    const location = useLocation();
    
    // Obtener usuario del localStorage
    const getUserFromStorage = () => {
        try {
            const userData = localStorage.getItem('adminUser') || localStorage.getItem('usuario');
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            return null;
        }
    };

    const user = getUserFromStorage();
    const carritoCount = carrito.length;

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="logo">
                <Link to="/">
                    <img
                        src="/img/logo-mascotas.webp"
                        alt="Logo Tienda Mascotas"
                    />
                </Link>
            </div>

            {/* Navegación */}
            <ul className="nav-links">
                <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
                <li><Link to="/productos" className={location.pathname === "/productos" ? "active" : ""}>Productos</Link></li>
                <li><Link to="/nosotros" className={location.pathname === "/nosotros" ? "active" : ""}>Nosotros</Link></li>
                <li><Link to="/contacto" className={location.pathname === "/contacto" ? "active" : ""}>Contacto</Link></li>
            </ul>

            {/* Acciones - UserMenu o Login */}
            <div className="navbar-actions">
                {user ? (
                    // Usuario logueado - Mostrar UserMenu
                    <UserMenu user={user} carritoCount={carritoCount} />
                ) : (
                    // Usuario no logueado - Mostrar botón de login
                    <Link 
                        to="/login" 
                        className={`login-btn ${location.pathname === "/login" ? "active" : ""}`}
                    >
                        <span className="user-icon">👤</span>
                        Iniciar Sesión
                    </Link>
                )}

                {/* Carrito independiente (si quieres mantenerlo separado) */}
                {!user && (
                    <div className="carrito">
                        <Link to="/carrito">
                            <img
                                src="/img/carrito-icon.webp"
                                alt="Ir al carrito"
                                className="carritoo"
                            />
                            {carritoCount > 0 && (
                                <span className="carrito-badge">{carritoCount}</span>
                            )}
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;