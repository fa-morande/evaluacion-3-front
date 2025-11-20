import React from "react";
// ELIMINAMOS: NavBar y Footer, porque ya los provee el Layout de App.jsx
import CardPresentacion from "../components/organisms/CardPresentacion";
import SeccionCategorias from "../components/organisms/SeccionCategorias";
import SeccionDestacados from "../components/organisms/SeccionDestacados";
import CardCrearCuenta from "../components/molecules/CardCrearCuenta"; // Corregida la ruta a molecules

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
      
      {/* --> Seccion Crear Cuenta*/}
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