import React from "react";
import CardPresentacion from "../../components/organisms/shared/CardPresentacion";
import SeccionCategorias from "../../components/organisms/products/SeccionCategorias";
import SeccionDestacados from "../../components/organisms/products/SeccionDestacados";
import CardCrearCuenta from "../../components/molecules/cards/CardCrearCuenta";
import "../../styles/pages/public/Inicio.css";
import "../../styles/components/atoms/Button.css";


function Inicio({ agregarAlCarrito }) { 
  return (
    <div className="inicio-container">
      {/* CardPresentacion ocupa todo el ancho */}
      <CardPresentacion 
          onBotonPrimario={() => window.location.href='/registro'}
          onBotonSecundario={() => window.location.href='/productos'}
      />

      {/* Las demás secciones pueden estar centradas si es necesario */}
      <div className="inicio-section-centered">
        <SeccionCategorias />
        <CardCrearCuenta />
        <SeccionDestacados agregarAlCarrito={agregarAlCarrito} />
      </div>
    </div>
  );
}

export default Inicio;