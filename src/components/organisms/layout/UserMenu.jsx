import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Text from "../../atoms/Text";     
import "../../../styles/components/organisms/layout/UserMenu.css";

function UserMenu({ user, carritoCount = 0, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

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
        setIsOpen(false);
        
        if (onLogout) {
            onLogout(); 
        } else {
            navigate('/login');
        }
    };

    const handleProfile = () => {
        const role = user.role ? user.role.toUpperCase() : "USER";
        
        if (role === "ADMIN") {
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

    if (!user) return null;

    return (
        <div className="user-menu-container" ref={menuRef}>
            {/*--> Boton de usuario*/}
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
                        {/*--> Mostramos Nombre o la parte inicial del correo */}
                        {user.nombre || (user.email ? user.email.split('@')[0] : 'Usuario')}
                    </Text>
                    <Text variant="span" className="user-role">
                        {/*--> Validacion segura del rol */}
                        {(user.role && user.role.toUpperCase() === "ADMIN") ? "Administrador" : "Cliente"}
                    </Text>
                </div>
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>

            {/*--> Menu desplegable */}
            {isOpen && (
                <div className="user-menu-dropdown">
                    {/*--> Header del menu */}
                    <div className="menu-header">
                        <div className="menu-title">
                            Mi Cuenta
                        </div>
                        <div className="menu-subtitle">
                            {user.email || user.correo}
                        </div>
                    </div>

                    {/*--> Items del menú */}
                    <div className="menu-items">
                        {/*--> Perfil/Admin */}
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

                        {/*--> Carrito */}
                        <button 
                            className="menu-item"
                            onClick={handleCarrito}
                        >
                            <span className="menu-icon">🛒</span>
                            <span className="menu-label">
                                Carrito {carritoCount > 0 && `(${carritoCount})`}
                            </span>
                        </button>

                        {/*--> Separador */}
                        <div className="menu-divider"></div>

                        {/*--> Cerrar Sesion */}
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