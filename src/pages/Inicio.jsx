import React from "react";
import NavBar from "../components/molecules/NavBar";
import CardPresentacion from "../components/organisms/CardPresentacion";
import SeccionCategorias from "../components/organisms/SeccionCategorias";
import SeccionDestacados from "../components/organisms/SeccionDestacados";
import CardCrearCuenta from "../components/molecules/CardCrearCuenta"; // NUEVO
import Footer from "../components/organisms/Footer";

function Inicio() {
  return (
    <div className="page-container">
      <NavBar />

      <main className="main-content">
        {/* 1. La Vitrina (Hero) */}
        <CardPresentacion 
            titulo="Bienvenido a PetShop"
            descripcion="Todo lo que tu mascota necesita, calidad y amor."
            onBotonPrimario={() => window.location.href='/productos'}
            onBotonSecundario={() => window.location.href='/registro'}
        />

        {/* 2. Las Categorías */}
        <SeccionCategorias />
        
        {/* 3. Llamada a la Acción (NUEVO) */}
        <CardCrearCuenta 
            titulo="¿Aún no tienes cuenta? Regístrate hoy"
            descripcion="Obtén descuentos exclusivos en tu primera compra."
        />

        {/* 4. Destacados (Conectado a API) */}
        <SeccionDestacados />
      </main>

      <Footer />
    </div>
  );
}

export default Inicio;