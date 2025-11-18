import React from "react";
import "../../styles/atoms/Input.css";

const Input = ({
    type = "text",
    id,
    name,
    placeholder,
    value,
    onChange,
    required = false,
    label
}) => {
    return (
        <div className="input-group">
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="form-input"
            />
        </div>
    );
};

export default Input;