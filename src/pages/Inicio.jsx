import React from "react";
import ProductosDestacados from "../components/organisms/ProductosDestacados";

const Inicio = ({ agregarAlCarrito }) => {
  return (
    <ProductosDestacados agregarAlCarrito={agregarAlCarrito} />
  );
};

export default Inicio;
