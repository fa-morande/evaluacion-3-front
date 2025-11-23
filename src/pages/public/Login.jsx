import React from "react";
import LoginForm from "../../components/organisms/auth/LoginForm";
import { login } from "../../services/api/usuarios";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/public/Login.css";

function Login() {
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        try {
            console.log("Intentando login con:", email); // Debug
            
            const usuario = await login(email, password);
            console.log("Login exitoso, usuario:", usuario); // Debug

            // Guardar usuario en localStorage
            localStorage.setItem("usuario", JSON.stringify(usuario));
            
            // También guardar específicamente como admin si corresponde
            if (usuario.role === "ADMIN") {
                localStorage.setItem("adminUser", JSON.stringify(usuario));
            }

            alert("Inicio de sesión exitoso");

            // Redirigir según rol - CORREGIDO
            if (usuario.role === "ADMIN") {
                navigate("/admin"); // Cambiado de "/admin/dashboard" a "/admin"
            } else {
                navigate("/");
            }

        } catch (error) {
            console.error("Error en login:", error);
            alert(error.message || "Email o contraseña incorrectos");
        }
    };

    return (
        <div className="page-container login-page">
            <main className="main-content">
                <LoginForm onLogin={handleLogin} />
            </main>
        </div>
    );
}

export default Login;