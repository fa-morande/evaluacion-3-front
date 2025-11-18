import React, { useState } from "react";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import ProductosDestacados from "../components/organisms/ProductosDestacados";
import "../styles/organisms/Footer.css"
const Index = () => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    alert(`${producto.name} agregado al carrito`);
  };

  return (
    <>
      <Header />
      <ProductosDestacados agregarAlCarrito={agregarAlCarrito} />
      <Footer />
    </>
  );
};

export default Index;
