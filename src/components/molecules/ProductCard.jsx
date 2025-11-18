import Button from "../atoms/Button";
import "../../styles/molecules/ProductCard.css";
import React from "react"; 

const ProductCard = ({ product, agregarAlCarrito }) => (
  <div className="producto-card">
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <p className="precio">${product.price}</p>
    <Button text="Agregar al carrito" onClick={() => agregarAlCarrito(product)} />
  </div>
);

export default ProductCard;
