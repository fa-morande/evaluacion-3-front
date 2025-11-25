// src/pages/public/Login.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/organisms/auth/LoginForm"; 
import { login } from "../../services/api/usuarios"; 
import { useAuth } from "../../context/AuthContext";
import "../../styles/pages/public/Login.css";

function Login() {
    const navigate = useNavigate();
    const { loginUser, user } = useAuth(); 

    useEffect(() => {
        if (user) {
            const userRole = user.role || user.usuario?.role;
            
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

            const credentials = {
                email: email,       
                password: password
            };

            console.log(" Enviando:", credentials);
            const data = await login(credentials);
            
            console.log("Login exitoso, respuesta recibida:", data);

            loginUser(data); 

        } catch (error) {
            console.error("X Error en Login:", error);
            alert("Error al ingresar: " + error.message);
        }
    };

    if (user) return null; 

    return (
        <div className="login-container">
            <LoginForm onLogin={handleLogin} />
        </div>
    );
}

export default Login;