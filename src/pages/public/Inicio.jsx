import React from "react";
import CardPresentacion from "../../components/organisms/CardPresentacion";
import SeccionCategorias from "../../components/organisms/products/SeccionCategorias";
import SeccionDestacados from "../../components/organisms/products/SeccionDestacados";
import CardCrearCuenta from "../../components/molecules/CardCrearCuenta";
import "../styles/pages/Inicio.css"; // ← IMPORTAR EL CSS
import "../styles/components/atoms/Button.css";


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