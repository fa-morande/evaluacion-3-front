import React from "react";
// ELIMINAMOS: NavBar y Footer, porque ya los provee el Layout de App.jsx
import CardPresentacion from "../components/organisms/CardPresentacion";
import SeccionCategorias from "../components/organisms/SeccionCategorias";
import SeccionDestacados from "../components/organisms/SeccionDestacados";
import CardCrearCuenta from "../components/molecules/CardCrearCuenta"; // Corregida la ruta a molecules

// La función debe recibir 'agregarAlCarrito' como prop desde App.jsx
function Inicio({ agregarAlCarrito }) { 
  return (
    // Ya no necesitas el <div> principal con estilos de Layout aquí.
    // El Layout (Header/Main/Footer) ya lo maneja App.jsx.
    <> 
      {/* 1. La Vitrina (Hero) */}
      <CardPresentacion 
          titulo="Bienvenido a PetShop"
          descripcion="Todo lo que tu mascota necesita, calidad y amor."
          onBotonPrimario={() => window.location.href='/productos'}
          onBotonSecundario={() => window.location.href='/registro'}
      />

      {/* 2. Las Categorías */}
      <SeccionCategorias />
      
      {/* 3. Llamada a la Acción */}
      <CardCrearCuenta 
          titulo="¿Aún no tienes cuenta? Regístrate hoy"
          descripcion="Obtén descuentos exclusivos en tu primera compra."
      />

      {/* 4. Destacados (Pasamos la función del carrito a este organismo) */}
      <SeccionDestacados agregarAlCarrito={agregarAlCarrito} />
    </>
  );
}

export default Inicio;