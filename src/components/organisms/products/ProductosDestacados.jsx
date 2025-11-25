import React from "react";
import CardProductGeneral from "../../molecules/cards/CardProductGeneral";
import { products } from "../../../services/data/productos"; 
import "../../../styles/components/organisms/products/ProductosDestacados.css";
import Text from "../../atoms/Text";

const ProductosDestacados = ({ agregarAlCarrito }) => {
  return (
    <section className="productos-destacados">
      <Text variant="h2" className="titulo-destacados">
        Productos Destacados
      </Text>
      <div className="productos-grid">
        {products.map((p) => (
          <CardProductGeneral 
            key={p.id} 
            product={p} 
            agregarAlCarrito={agregarAlCarrito} 
          />
        ))}
      </div>
    </section>
  );
};

export default ProductosDestacados;