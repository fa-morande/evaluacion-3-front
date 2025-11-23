import React from "react";
import CardProductGeneral from "../molecules/CardProductGeneral";
import { products } from "../../../services/data/productos"; //
import "../../styles/components/organisms/ProductosDestacados.css";
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
            agregarAlCarrito={agregarAlCarrito}  // ← Pasa la función
          />
        ))}
      </div>
    </section>
  );
};

export default ProductosDestacados;