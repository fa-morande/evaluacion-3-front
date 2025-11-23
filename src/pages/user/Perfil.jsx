import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
// IMPORTANTE: La ruta del CSS corregida
import '../../styles/pages/user/Perfil.css';

const Perfil = () => {
    const { user } = useAuth();

    // Si por alguna razón entra aquí sin usuario, lo mandamos al login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="perfil-container">
            <div className="perfil-card">
                <div className="perfil-header">
                    <div className="perfil-avatar">
                        {user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <h2>Mi Perfil</h2>
                </div>
                
                <div className="perfil-body">
                    <div className="perfil-item">
                        <label>Nombre Completo:</label>
                        <p>{user.nombre || 'Usuario'}</p>
                    </div>
                    
                    <div className="perfil-item">
                        <label>Correo Electrónico:</label>
                        <p>{user.email || 'correo@ejemplo.com'}</p>
                    </div>

                    <div className="perfil-item">
                        <label>Tipo de Cuenta:</label>
                        <span className="badge-role">
                            {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;