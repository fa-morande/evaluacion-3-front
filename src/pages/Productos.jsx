import ProductCard from "../components/molecules/ProductCard";
import { products } from "../data/productos";
import "../styles/pages/productos.css";

const Productos = ({ agregarAlCarrito }) => {
  return (
    <main className="producto-container">
      <h1 className="productos-titulo">Nuestros Productos</h1>
      <div className="productos-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>
    </main>
  );
};


export default Productos;
