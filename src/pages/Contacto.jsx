import React, { useState } from "react";
import "../styles/pages/contacto.css";
import Button from "../components/atoms/Button";

const Contacto = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [comentario, setComentario] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    while (nombre == true && correo == true) {
      alert("Las contraseñas no coinciden");
      return;
    }
    alert(`Su solicitud se ha enviado, estimado(a) ${nombre} con correo '${correo}'`);
    setNombre('')
    setCorreo('')
    setComentario('')
  };
  return (
    <main>
      <section className="Contacto">
        <div className="Contacto-card">
          <h1>Contactanos</h1>
          <form>
            <label htmlFor="nombre">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre Completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              maxLength={100}
            />

            <label htmlFor="correo">Correo completo</label>
            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="ejemplo@gmail.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              maxLength={100}
              required
            />

            <label htmlFor="Comentarios:"></label>
            <input
              type="text"
              id="comentario"
              name="comentarios"
              placeholder="Escribe tu mensaje"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              maxLength={300}
            />

            <Button
              text="Enviar"
              type="submit"
              variant="register"
              onClick={handleSubmit}
            />

          </form>
        </div>
      </section>
    </main>

  );
}

export default Contacto;