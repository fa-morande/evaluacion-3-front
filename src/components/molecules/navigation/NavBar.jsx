import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import UserMenu from "../../organisms/layout/UserMenu";
import "../../../styles/components/molecules/navigation/NavBar.css";

const Navbar = ({ carrito = [] }) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { user, logoutUser } = useAuth();
    
    const carritoCount = carrito.length;

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

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

            {/*--> Navegacion */}
            <ul className="nav-links">
                <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
                <li><Link to="/productos" className={location.pathname === "/productos" ? "active" : ""}>Productos</Link></li>
                <li><Link to="/nosotros" className={location.pathname === "/nosotros" ? "active" : ""}>Nosotros</Link></li>
                <li><Link to="/contacto" className={location.pathname === "/contacto" ? "active" : ""}>Contacto</Link></li>
            </ul>

            {/*--> Acciones - UserMenu o Login */}
            <div className="navbar-actions">
                {user ? (
                    <UserMenu 
                        user={user} 
                        carritoCount={carritoCount} 
                        onLogout={handleLogout} 
                    />
                ) : (
                    /*--> Usuario no logueado - Mostrar boton de login*/
                    <Link 
                        to="/login" 
                        className={`login-btn ${location.pathname === "/login" ? "active" : ""}`}
                    >
                        <span className="user-icon">👤</span>
                        Iniciar Sesión
                    </Link>
                )}

                {/* Carrito independiente (Mostrar solo si NO hay usuario, o siempre, según tu logica original) */}
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