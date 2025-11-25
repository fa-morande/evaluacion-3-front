import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button"; // Si no usas Button, puedes quitarlo
import Text from "../../atoms/Text";     // Si no usas Text, puedes quitarlo
import "../../../styles/components/organisms/layout/UserMenu.css";

// 1. Aceptamos la prop 'onLogout' que viene del Navbar
function UserMenu({ user, carritoCount = 0, onLogout }) {
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
        // 2. Lógica limpia: Cerramos menú y llamamos a la función del padre
        setIsOpen(false);
        
        if (onLogout) {
            onLogout(); 
        } else {
            // Fallback por seguridad
            navigate('/login');
        }
    };

    const handleProfile = () => {
        // Normalizamos a mayúsculas por seguridad
        const role = user.role ? user.role.toUpperCase() : "USER";
        
        if (role === "ADMIN") {
            navigate("/admin");
        } else {
            navigate("/perfil"); // Asegúrate de que esta ruta exista
        }
        setIsOpen(false);
    };

    const handleCarrito = () => {
        navigate("/carrito");
        setIsOpen(false);
    };

    // Seguridad visual si user es null (aunque el Navbar lo controla)
    if (!user) return null;

    return (
        <div className="user-menu-container" ref={menuRef}>
            {/* Botón de usuario (Trigger) */}
            <button 
                className="user-menu-trigger"
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                <div className="user-avatar">
                    <span className="avatar-icon">👤</span>
                    {carritoCount > 0 && (
                        <span className="carrito-indicator">{carritoCount}</span>
                    )}
                </div>
                <div className="user-info">
                    <Text variant="span" className="user-name">
                        {/* Mostramos Nombre o la parte inicial del correo */}
                        {user.nombre || (user.email ? user.email.split('@')[0] : 'Usuario')}
                    </Text>
                    <Text variant="span" className="user-role">
                        {/* Validación segura del rol */}
                        {(user.role && user.role.toUpperCase() === "ADMIN") ? "Administrador" : "Cliente"}
                    </Text>
                </div>
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>

            {/* Menú desplegable */}
            {isOpen && (
                <div className="user-menu-dropdown">
                    {/* Header del menú */}
                    <div className="menu-header">
                        <div className="menu-title">
                            Mi Cuenta
                        </div>
                        <div className="menu-subtitle">
                            {user.email || user.correo}
                        </div>
                    </div>

                    {/* Items del menú */}
                    <div className="menu-items">
                        {/* Perfil/Admin */}
                        <button 
                            className="menu-item"
                            onClick={handleProfile}
                        >
                            <span className="menu-icon">
                                {(user.role && user.role.toUpperCase() === "ADMIN") ? "⚙️" : "👤"}
                            </span>
                            <span className="menu-label">
                                {(user.role && user.role.toUpperCase() === "ADMIN") ? "Panel Admin" : "Mi Perfil"}
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