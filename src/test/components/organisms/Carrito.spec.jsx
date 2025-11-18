// src/test/components/organisms/Carrito.spec.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Carrito from "../../../components/organisms/Carrito";

describe("Carrito Component", () => {
  const mockOnRemove = jasmine.createSpy("onRemove");

  it("muestra mensaje cuando el carrito está vacío", () => {
    render(<Carrito carrito={[]} onRemove={mockOnRemove} />);
    expect(screen.getByText("No hay productos en el carrito")).toBeTruthy();
  });

  it("renderiza los productos del carrito", () => {
    const mockCarrito = [
      { id: 1, name: "Producto 1", price: 1000, image: "img1.jpg" },
      { id: 2, name: "Producto 2", price: 2000, image: "img2.jpg" }
    ];

    render(<Carrito carrito={mockCarrito} onRemove={mockOnRemove} />);
    expect(screen.getByText("Producto 1")).toBeTruthy();
    expect(screen.getByText("Producto 2")).toBeTruthy();
  });

  it("calcula el total correctamente", () => {
    const mockCarrito = [
      { id: 1, name: "Producto 1", price: 1000, image: "img1.jpg" },
      { id: 2, name: "Producto 2", price: 2000, image: "img2.jpg" }
    ];

    render(<Carrito carrito={mockCarrito} onRemove={mockOnRemove} />);
    expect(screen.getByText("Total: $3000.00")).toBeTruthy();
  });

  it("renderiza el título del carrito", () => {
    render(<Carrito carrito={[]} onRemove={mockOnRemove} />);
    expect(screen.getByText("🛍 Tu Carrito")).toBeTruthy();
  });
});