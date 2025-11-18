// src/components/atoms/Button.jsx
import React from "react";
import "../../styles/atoms/Boton.css"; // asegúrate que este CSS incluya la variante register

const Button = ({ text, onClick, type = "button", variant = "primary", size = "medium" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-general btn-${variant} btn-${size}`}
    >
      {text}
    </button>
  );
};

export default Button;
