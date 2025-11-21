import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import CardInformacion from "../molecules/CardInformacion";
import Formulario from "../molecules/Formulario"; // <-- Tu nueva molécula
import nosotros from "../../data/nosotros";
import "../../styles/organisms/LoginForm.css"; 

function LoginForm({ onLogin }) {
    // Estados locales para el formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    // Extraemos la data para mantener el código limpio
    const { icono, titulo, descripcion } = nosotros.login.cardInfo;

    return (
        <div className="login-organism-container">
            
            {/* 1. CardInformacion (Datos desde nosotros.js) */}
            <div className="login-header">
                <CardInformacion 
                    icono={icono} 
                    titulo={titulo}
                    descripcion={descripcion}
                />
            </div>

            {/* 2. Formulario Principal */}
            <form className="login-form" onSubmit={handleSubmit}>
                
                {/* Molécula Formulario: Email */}
                <Formulario 
                    subtitulo="Email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Molécula Formulario: Contraseña */}
                <Formulario 
                    subtitulo="Contraseña"
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* 3. Opciones (Checkbox y Link) */}
                <div className="form-options">
                    <label className="checkbox-container">
                        <input type="checkbox" className="checkbox-input" /> 
                        <Text variant="span" className="checkbox-label">Recordarme</Text>
                    </label>
                    
                    <Link to="/recuperar" className="forgot-link">
                        <Text variant="span">¿Olvidaste tu contraseña?</Text>
                    </Link>
                </div>

                {/* 4. Botón de Acción */}
                <Button type="submit" className="btn-primario full-width">
                    Iniciar Sesión
                </Button>
            </form>

            {/* 5. Footer (Crear cuenta) */}
            <div className="login-footer">
                <Text variant="p">
                    ¿No tienes cuenta? <Link to="/registro" className="create-account-link">Crear Cuenta</Link>
                </Text>
            </div>
        </div>
    );
}

export default LoginForm;