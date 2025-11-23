// src/components/molecules/ProductCard.jsx
import React from "react";
import "../../../styles/components/molecules/cards/ProductCard.css";

const ProductCard = ({ product, agregarAlCarrito }) => {
  return (
    <div className="producto-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="precio">${product.price.toLocaleString("es-CL")}</p>
      <button className="btn-agregar" onClick={() => agregarAlCarrito(product)}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;