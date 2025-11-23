import React, { useState } from 'react';
import { login } from '../services/api/auth';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import '../styles/pages/AdminLogin.css';

function AdminLogin({ onLoginSuccess }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
        const usuario = await login(formData.email, formData.password);
        
        // Verificar si es admin (puedes ajustar esta lógica según tu API)
        if (usuario && usuario.role === 'ADMIN') {
            localStorage.setItem('adminUser', JSON.stringify(usuario));
            onLoginSuccess(usuario);
        } else {
            setError('No tienes permisos de administrador');
        }
        } catch (error) {
        setError('Credenciales incorrectas');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
        <div className="admin-login-card">
            <Text variant="h1" className="login-title">
            Panel Administrativo
            </Text>
            
            <form onSubmit={handleSubmit} className="login-form">
            <Input
                type="email"
                placeholder="Email administrativo"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
            />
            
            <Input
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
            />
            
            {error && (
                <Text variant="p" className="error-message">
                {error}
                </Text>
            )}
            
            <Button 
                type="submit" 
                text={loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                variant="primary"
                disabled={loading}
                className="login-button"
            />
            </form>
            
            <div className="login-info">
            <Text variant="p">
                ⚠️ Solo personal autorizado
            </Text>
            </div>
        </div>
        </div>
    );
}

export default AdminLogin;