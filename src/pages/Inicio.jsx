import React from "react";
import CardPresentacion from "../components/organisms/CardPresentacion";
import SeccionCategorias from "../components/organisms/SeccionCategorias";
import SeccionDestacados from "../components/organisms/SeccionDestacados";
import CardCrearCuenta from "../components/molecules/CardCrearCuenta";
import "../styles/pages/Inicio.css"; // ← IMPORTAR EL CSS

function Inicio({ agregarAlCarrito }) { 
  return (
    <div className="inicio-container"> {/* ← CONTENEDOR PRINCIPAL */}
      <CardPresentacion 
          onBotonPrimario={() => window.location.href='/registro'}
          onBotonSecundario={() => window.location.href='/productos'}
      />

      <SeccionCategorias />
      <CardCrearCuenta />
      <SeccionDestacados agregarAlCarrito={agregarAlCarrito} />
    </div>
  );
}

export default Inicio;