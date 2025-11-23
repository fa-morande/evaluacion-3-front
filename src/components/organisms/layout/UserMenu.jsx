import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import "../../styles/components/organisms/UserMenu.css";

function UserMenu({ user, carritoCount = 0 }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    // Cerrar menú al hacer click fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        // Limpiar localStorage
        localStorage.removeItem("usuario");
        localStorage.removeItem("adminUser");
        
        // Cerrar menú
        setIsOpen(false);
        
        // Redirigir al home
        navigate("/");
        
        // Recargar para actualizar estado global
        window.location.reload();
    };

    const handleProfile = () => {
        if (user.role === "ADMIN") {
            navigate("/admin");
        } else {
            navigate("/perfil");
        }
        setIsOpen(false);
    };

    const handleCarrito = () => {
        navigate("/carrito");
        setIsOpen(false);
    };

    return (
        <div className="user-menu-container" ref={menuRef}>
            {/* Botón de usuario */}
            <button 
                className="user-menu-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="user-avatar">
                    <span className="avatar-icon">👤</span>
                    {carritoCount > 0 && (
                        <span className="carrito-indicator">{carritoCount}</span>
                    )}
                </div>
                <div className="user-info">
                    <Text variant="span" className="user-name">
                        {user.nombre || user.email.split('@')[0]}
                    </Text>
                    <Text variant="span" className="user-role">
                        {user.role === "ADMIN" ? "Administrador" : "Usuario"}
                    </Text>
                </div>
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>

            {/* Menú desplegable */}
            {isOpen && (
                <div className="user-menu-dropdown">
                    {/* Header del menú */}
                    <div className="menu-header">
                        <Text variant="h4" className="menu-title">
                            Mi Cuenta
                        </Text>
                        <Text variant="p" className="menu-subtitle">
                            {user.email}
                        </Text>
                    </div>

                    {/* Items del menú */}
                    <div className="menu-items">
                        {/* Perfil/Admin */}
                        <button 
                            className="menu-item"
                            onClick={handleProfile}
                        >
                            <span className="menu-icon">
                                {user.role === "ADMIN" ? "⚙️" : "👤"}
                            </span>
                            <span className="menu-label">
                                {user.role === "ADMIN" ? "Panel Admin" : "Mi Perfil"}
                            </span>
                        </button>

                        {/* Carrito */}
                        <button 
                            className="menu-item"
                            onClick={handleCarrito}
                        >
                            <span className="menu-icon">🛒</span>
                            <span className="menu-label">
                                Carrito {carritoCount > 0 && `(${carritoCount})`}
                            </span>
                        </button>

                        {/* Separador */}
                        <div className="menu-divider"></div>

                        {/* Cerrar Sesión */}
                        <button 
                            className="menu-item logout-item"
                            onClick={handleLogout}
                        >
                            <span className="menu-icon">🚪</span>
                            <span className="menu-label">Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;