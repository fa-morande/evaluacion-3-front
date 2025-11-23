import React, { useEffect } from "react"; // 1. Agrega useEffect
import LoginForm from "../../components/organisms/auth/LoginForm";
import { login as apiLogin } from "../../services/api/usuarios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/pages/public/Login.css";

function Login() {
    const navigate = useNavigate();
    const { login, user } = useAuth(); // 2. Traemos 'user' para verificar si ya existe

    // 3. NUEVO: Si ya estoy logueado, sácame de aquí
    useEffect(() => {
        if (user) {
            if (user.role === 'admin' || user.role === 'ADMIN') {
                navigate('/admin', { replace: true });
            } else {
                navigate('/inicio', { replace: true });
            }
        }
    }, [user, navigate]);

    const handleLogin = async (email, password) => {
        try {
            // ... (tu lógica de login existente se mantiene igual) ...
            const usuarioApi = await apiLogin(email, password);
            login(usuarioApi);
            // La redirección ya la manejará el useEffect o puedes dejarla aquí también
        } catch (error) {
            console.error(error);
            alert("Error: " + error.message);
        }
    };

    // Si ya hay usuario, retornamos null para evitar parpadeos mientras redirige
    if (user) return null;

    return (
        <div className="page-container login-page">
            <main className="main-content">
                <LoginForm onLogin={handleLogin} />
            </main>
        </div>
    );
}

export default Login;