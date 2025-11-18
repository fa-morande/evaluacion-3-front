// src/test/components/organisms/ProductosDestacados.spec.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ProductosDestacados from "../../../components/organisms/ProductosDestacados";

describe("ProductosDestacados Component", () => {
  const mockAgregarAlCarrito = jasmine.createSpy("agregarAlCarrito");

  it("renderiza el título de productos destacados", () => {
    render(<ProductosDestacados agregarAlCarrito={mockAgregarAlCarrito} />);
    expect(screen.getByText("Productos Destacados")).toBeTruthy();
  });

  it("renderiza la sección de productos destacados", () => {
    const { container } = render(
      <ProductosDestacados agregarAlCarrito={mockAgregarAlCarrito} />
    );
    const section = container.querySelector(".productos-destacados");
    expect(section).toBeTruthy();
  });

  it("renderiza la grilla de productos", () => {
    const { container } = render(
      <ProductosDestacados agregarAlCarrito={mockAgregarAlCarrito} />
    );
    const grid = container.querySelector(".productos-grid");
    expect(grid).toBeTruthy();
    // Verifica que hay al menos un producto
    const cards = container.querySelectorAll(".producto-card");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("recibe la función agregarAlCarrito", () => {
    render(<ProductosDestacados agregarAlCarrito={mockAgregarAlCarrito} />);
    expect(mockAgregarAlCarrito).toBeDefined();
  });
});