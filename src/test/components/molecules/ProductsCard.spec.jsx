// src/test/components/molecules/ProductCard.spec.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../../../components/molecules/ProductCard";

describe("ProductCard Component", () => {
  const mockProduct = {
    id: 1,
    name: "Producto Test",
    description: "Descripción del producto",
    price: 10000,
    image: "producto.jpg"
  };

  const mockAgregarAlCarrito = jasmine.createSpy("agregarAlCarrito");

  it("renderiza el nombre del producto", () => {
    render(<ProductCard product={mockProduct} agregarAlCarrito={mockAgregarAlCarrito} />);
    expect(screen.getByText("Producto Test")).toBeTruthy();
  });

  it("renderiza la descripción del producto", () => {
    render(<ProductCard product={mockProduct} agregarAlCarrito={mockAgregarAlCarrito} />);
    expect(screen.getByText("Descripción del producto")).toBeTruthy();
  });

  it("renderiza el precio del producto", () => {
    render(<ProductCard product={mockProduct} agregarAlCarrito={mockAgregarAlCarrito} />);
    expect(screen.getByText("$10000")).toBeTruthy();
  });

  it("llama a agregarAlCarrito al hacer click", () => {
    render(<ProductCard product={mockProduct} agregarAlCarrito={mockAgregarAlCarrito} />);
    fireEvent.click(screen.getByText("Agregar al carrito"));
    expect(mockAgregarAlCarrito).toHaveBeenCalledWith(mockProduct);
  });
});