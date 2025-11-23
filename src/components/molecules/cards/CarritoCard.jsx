import "../../styles/components/molecules/CarritoCard.css";
import React from "react";
const CarritoCard = ({ item, onRemove }) => {
  return (
    <div className="carrito-item">
      <img src={item.image} alt={item.name} />
      <div>
        <h4>{item.name}</h4>
        <p>${item.price}</p>
      </div>
      <button onClick={() => onRemove(item.id)}>❌</button>
    </div>
  );
};

export default CarritoCard;