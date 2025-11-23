import React from "react";
import{ useState } from "react";
import "../styles/pages/registro.css";
import Button from "../components/atoms/Button";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [contrasena2, setContrasena2] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contrasena !== contrasena2) {
      alert("Las contraseñas no coinciden");
      return;
    }
    // Aquí iría la lógica de registro (API, localStorage, etc.)
    alert(`Registrado: ${nombre}, ${correo}, ${region}, ${comuna}`);
  };

  return (
    <main>
      <section className="registro">
        <div className="registro-card">
          <h2>Crear cuenta</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Joakooo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              maxLength={100}
            />

            <label htmlFor="correo">Correo completo</label>
            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="Correo@gmail.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              maxLength={100}
              required
            />

            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              placeholder="contraseñaEjemplo"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />

            <label htmlFor="contrasena2">Confirmar contraseña</label>
            <input
              type="password"
              id="contrasena2"
              name="contrasena2"
              placeholder="Repite tu contraseña"
              value={contrasena2}
              onChange={(e) => setContrasena2(e.target.value)}
              required
            />

            <label htmlFor="region">Región</label>
            <select
              id="region"
              name="region"
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
              name="comuna"
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
              required
            >
              <option value="">Selecciona tu comuna</option>
              <option value="Santiago">Santiago</option>
              <option value="Providencia">Providencia</option>
              <option value="Las Condes">Las Condes</option>
            </select>

            <Button
              text="Registrarse"
              type="submit"
              variant="register"
              onClick={handleSubmit}
            />

          </form>
        </div>
      </section>
    </main>
  );
};

export default Registro;
