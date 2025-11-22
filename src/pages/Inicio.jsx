import React from "react";
import CardPresentacion from "../components/organisms/CardPresentacion";
import SeccionCategorias from "../components/organisms/SeccionCategorias";
import SeccionDestacados from "../components/organisms/SeccionDestacados";
import CardCrearCuenta from "../components/molecules/CardCrearCuenta";

function Inicio({ agregarAlCarrito }) { 
  return (
    <> 
      {/* --> Seccion Card Presentacion*/}
      <CardPresentacion 
          titulo="Bienvenido a PetShop"
          descripcion="Todo lo que tu mascota necesita, calidad y amor."
          onBotonPrimario={() => window.location.href='/productos'}
          onBotonSecundario={() => window.location.href='/registro'}
      />

      {/* --> Seccion Categorias*/}
      <SeccionCategorias />
      
      {/* --> Seccion Crear Cuenta - Ahora sin props */}
      <CardCrearCuenta />
      
      {/* --> Seccion Destacados */}
      <SeccionDestacados agregarAlCarrito={agregarAlCarrito} />
    </>
  );
}

export default Inicio;