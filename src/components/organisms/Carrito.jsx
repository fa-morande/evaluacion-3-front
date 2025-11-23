import CarritoCard from "../molecules/CarritoCard";
import "../../styles/components/organisms/Carrito.css";
import React from "react";
const Carrito = ({ carrito, onRemove }) => {
  const total = carrito.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="carrito">
      <h1>🛍 Tu Carrito</h1>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        carrito.map((item) => (
          <CarritoCard key={item.id} item={item} onRemove={onRemove} />
        ))
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Carrito;
