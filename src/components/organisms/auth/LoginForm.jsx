// src/components/organisms/LoginForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import CardInformacion from "../molecules/CardInformacion";
import Formulario from "../molecules/Formulario";
import nosotros from "../../../data/nosotros";
import "../../styles/components/organisms/LoginForm.css";

function LoginForm({ onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    const { icono, titulo, descripcion } = nosotros.login.cardInfo;

    return (
        <div className="login-organism-container">

            <div className="login-header">
                <CardInformacion
                    icono={icono}
                    titulo={titulo}
                    descripcion={descripcion}
                />
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
                
                <Formulario
                    subtitulo="Email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Formulario
                    subtitulo="Contraseña"
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="form-options">
                    <label className="checkbox-container">
                        <input type="checkbox" className="checkbox-input" />
                        <Text variant="span" className="checkbox-label">
                            Recordarme
                        </Text>
                    </label>

                    <Link to="/recuperar" className="forgot-link">
                        <Text variant="span">¿Olvidaste tu contraseña?</Text>
                    </Link>
                </div>

                <Button
                    text="Iniciar Sesion"
                    type="submit"
                    className="btn-primario full-width"
                />

            </form>

            <div className="login-footer">
                <Text variant="p">
                    ¿No tienes cuenta?{" "}
                    <Link to="/registro" className="create-account-link">
                        Crear Cuenta
                    </Link>
                </Text>
            </div>

        </div>
    );
}

export default LoginForm;
