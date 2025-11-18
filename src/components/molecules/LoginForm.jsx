import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import "../../styles/molecules/LoginForm.css";

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        correo: "",
        contrasena: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const correoGuardado = localStorage.getItem("usuarioEmail");
        const contrasenaGuardada = localStorage.getItem("usuarioContrasena");

        if (formData.correo === correoGuardado && formData.contrasena === contrasenaGuardada) {
            localStorage.setItem("sesionIniciada", "true");
            alert("Inicio de sesión exitoso");
            navigate("/");
        } else {
            setError("Correo o contraseña incorrectos. Intenta de nuevo.");
        }
    };

    return (
        <div className="login-card">
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    id="correo"
                    name="correo"
                    label="Correo electrónico"
                    placeholder="correo@ejemplo.com"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                />

                <Input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    value={formData.contrasena}
                    onChange={handleChange}
                    required
                />

                <Button
                    type="submit"
                    text="Iniciar sesión"
                    variant="primary"
                    size="large"
                />
            </form>

            {error && <p className="mensaje-error">{error}</p>}
        </div>
    );
};

export default LoginForm;