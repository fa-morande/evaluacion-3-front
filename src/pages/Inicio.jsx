import React from "react";
import NavBar from "../components/molecules/NavBar";
import CardPresentacion from "../components/organisms/CardPresentacion";
import SeccionCategorias from "../components/organisms/SeccionCategorias";
import SeccionDestacados from "../components/organisms/SeccionDestacados";
import Footer from "../components/organisms/Footer";

function Inicio() {
  return (
    <div className="page-container">
      <NavBar />

      <main className="main-content">
        {/* --> Card Presentacion*/}
        <CardPresentacion 
            titulo="Bienvenido a PetShop"
            descripcion="Todo lo que tu mascota necesita, calidad y amor."
            onBotonPrimario={() => window.location.href='/productos'}
            onBotonSecundario={() => window.location.href='/registro'}
        />

        {/* --> Categorias*/}
        <SeccionCategorias />

        {/* --> Aqui muestra productos apenas conectemos a la api*/}
        <SeccionDestacados />
      </main>

      <Footer />
    </div>
  );
}

export default Inicio;