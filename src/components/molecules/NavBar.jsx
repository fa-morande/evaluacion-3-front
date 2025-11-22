import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/molecules/Navbar.css";

const Navbar = ({ carrito = [] }) => {
  const location = useLocation();

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

      {/* Acciones - Carrito e Iniciar Sesión */}
      <div className="navbar-actions">
        {/* Iniciar Sesión con icono de usuario */}
        <Link 
          to="/login" 
          className={`login-btn ${location.pathname === "/login" ? "active" : ""}`}
        >
          <span className="user-icon">👤</span>
          Iniciar Sesión
        </Link>

        {/* Carrito */}
        <div className="carrito">
          <Link to="/carrito">
            <img
              src="/img/carrito-icon.webp"
              alt="Ir al carrito"
              className="carritoo"
            />
            {carrito.length > 0 && (
              <span className="carrito-badge">{carrito.length}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;