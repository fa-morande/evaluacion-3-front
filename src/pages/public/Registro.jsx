import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/public/Registro.css";
import Button from "../../components/atoms/Button";
import { register } from "../../services/api/usuarios";

const Registro = () => {
  const navigate = useNavigate();
  
  // Estados
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState(""); 
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [contrasena2, setContrasena2] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contrasena !== contrasena2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      // --- CONSTRUCCIÓN DEL OBJETO EXACTO DE POSTMAN ---
      const usuarioParaBackend = {
        nombre: nombre,
        apellido: apellido,
        
        // CORRECCIÓN: Usamos las llaves en inglés según tu Postman
        email: correo,          // Antes enviábamos 'correo'
        password: contrasena,   // Antes enviábamos 'contrasenia'
        
        // Campos obligatorios extra
        telefono: "+56911111111", // Dummy para cumplir con el backend
        direccion: `${comuna}, ${region}`,
        role: "USER", // Siempre mayúscula
        activo: true  // Agregado según tu Postman
      };

      console.log("🚀 Payload idéntico a Postman:", usuarioParaBackend);

      await register(usuarioParaBackend);

      alert("¡Cuenta creada con éxito! Ahora inicia sesión.");
      navigate("/login");

    } catch (error) {
      console.error("Error en registro:", error);
      alert("El servidor dice: " + error.message);
    }
  };

  return (
    <main>
      <section className="registro">
        <div className="registro-card">
          <h2>Crear cuenta</h2>
          <form onSubmit={handleSubmit}>
            
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Ej: Carlos"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              placeholder="Ej: Silva"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />

            <label htmlFor="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              placeholder="carlos@example.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              placeholder="password123"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />

            <label htmlFor="contrasena2">Confirmar contraseña</label>
            <input
              type="password"
              id="contrasena2"
              placeholder="Repite tu contraseña"
              value={contrasena2}
              onChange={(e) => setContrasena2(e.target.value)}
              required
            />

            <label htmlFor="region">Región</label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            >
              <option value="">Selecciona tu región</option>
              <option value="RM">Región Metropolitana</option>
              <option value="V">Valparaíso</option>
              <option value="VIII">Biobío</option>
            </select>

            <label htmlFor="comuna">Comuna</label>
            <select
              id="comuna"
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
              required
            >
              <option value="">Selecciona tu comuna</option>
              <option value="Santiago">Santiago</option>
              <option value="Providencia">Providencia</option>
              <option value="Las Condes">Las Condes</option>
            </select>

            <Button text="Registrarse" type="submit" variant="register" />
          </form>
        </div>
      </section>
    </main>
  );
};

export default Registro;