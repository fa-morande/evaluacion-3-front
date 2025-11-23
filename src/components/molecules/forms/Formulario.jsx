import React from "react";
import Input from "../../atoms/Input";
import Text from "../../atoms/Text"; 
import "../../styles/components/molecules/Formulario.css"; // Crearemos este CSS abajo

function Formulario({ subtitulo, type = "text", placeholder, value, onChange }) {
    return (
        <div className="molecula-formulario">
            {/* Subtítulo del campo */}
            <Text variant="h6" className="form-subtitulo">
                {subtitulo}
            </Text>

            {/* Input del campo */}
            <Input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="form-input"
            />
        </div>
    );
}

export default Formulario;