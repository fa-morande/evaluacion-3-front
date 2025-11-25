// src/pages/public/Login.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/organisms/auth/LoginForm"; 
import { login } from "../../services/api/usuarios"; // Asegúrate que esta ruta apunte a tu servicio nuevo
import { useAuth } from "../../context/AuthContext";
import "../../styles/pages/public/Login.css"; // Tus estilos

function Login() {
    const navigate = useNavigate();
    const { loginUser, user } = useAuth(); 

    // --- EFECTO DE REDIRECCIÓN ---
    useEffect(() => {
        if (user) {
            // Verificamos si el rol viene en 'user.role' o anidado en 'user.usuario.role'
            const userRole = user.role || user.usuario?.role;
            
            // Normalizamos a mayúsculas para evitar errores (admin vs ADMIN)
            if (userRole && userRole.toUpperCase() === 'ADMIN') {
                navigate("/admin", { replace: true });
            } else {
                navigate("/inicio", { replace: true });
            }
        }
    }, [user, navigate]);

    // --- MANEJO DEL LOGIN ---
const handleLogin = async (email, password) => {
        try {
            // VOLVEMOS A LO ESTÁNDAR
            // El backend casi seguro espera "email" y "password".
            const credentials = {
                email: email,       
                password: password
            };

            console.log("🚀 Enviando:", credentials);
            const data = await login(credentials);
            

            
            console.log("✅ Login exitoso, respuesta recibida:", data);

            // Guardamos la respuesta completa (Token + Datos) en el contexto
            loginUser(data); 

            // El useEffect de arriba se encargará de redirigir automáticamente

        } catch (error) {
            console.error("❌ Error en Login:", error);
            // Mostramos el mensaje limpio que viene desde el servicio
            alert("Error al ingresar: " + error.message);
        }
    };

    // Evita parpadeos si ya hay usuario
    if (user) return null; 

    return (
        <div className="login-container">
            {/* El LoginForm no cambia, sigue enviando email/pass y nosotros lo transformamos arriba */}
            <LoginForm onLogin={handleLogin} />
        </div>
    );
}

export default Login;