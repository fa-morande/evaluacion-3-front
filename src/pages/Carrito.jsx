import Carrito from "../components/organisms/Carrito";

const carrito = ({ carrito, onRemove }) => {
  return (
    <main>
      <Carrito carrito={carrito} onRemove={onRemove} />
    </main>
  );
};

export default carrito;