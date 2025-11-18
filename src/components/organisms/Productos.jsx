import ProductCard from "../organisms/ProductCard";

const Producto = ({ productos, }) => {
  return (
    <div className="productos">
      {productos.map((p) => (
        <ProductCard key={p.id} producto={p} agregarAlCarrito={agregarAlCarrito} />
      ))}
    </div>
  );
};

export default Producto;