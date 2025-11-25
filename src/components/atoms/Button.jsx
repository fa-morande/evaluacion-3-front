import React from "react";
import "../../styles/components/atoms/Button.css";

const Button = ({ text, onClick, type = "button", variant = "primary", size = "medium", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-general btn-${variant} btn-${size} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;