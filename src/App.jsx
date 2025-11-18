// src/App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import "./styles/organisms/Footer.css";
import Registro from "./pages/registro"; // <-- esto es lo que falta
import Login from "./pages/Login";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import BlogsDetalle from "./pages/Blogsdetalle";
import Contacto from "./pages/Contacto";
import Carrito from "./pages/Carrito";
function App() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    alert(`${producto.name} agregado al carrito`);
  };

    const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  return (
    <>
      <Header carrito={carrito} />
      <main>
        <Routes>
          <Route path="/" element={<Inicio agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/productos" element={<Productos agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} /> {/* Nueva ruta */}
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogsdetalle/:id" element={<BlogsDetalle />} />
          <Route path="/contacto" element={<Contacto />} />  
          <Route path="/carrito" element={<Carrito carrito={carrito} onRemove={eliminarDelCarrito} />} /> 
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;



