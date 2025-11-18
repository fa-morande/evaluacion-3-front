// src/test/components/molecules/CarritoCard.spec.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CarritoCard from "../../../components/molecules/CarritoCard";

describe("CarritoCard Component", () => {
  const mockItem = {
    id: 1,
    name: "Producto Test",
    price: 5000,
    image: "producto.jpg"
  };

  const mockOnRemove = jasmine.createSpy("onRemove");

  it("renderiza el nombre del producto", () => {
    render(<CarritoCard item={mockItem} onRemove={mockOnRemove} />);
    expect(screen.getByText("Producto Test")).toBeTruthy();
  });

  it("renderiza el precio del producto", () => {
    render(<CarritoCard item={mockItem} onRemove={mockOnRemove} />);
    expect(screen.getByText("$5000")).toBeTruthy();
  });

  it("renderiza la imagen del producto", () => {
    render(<CarritoCard item={mockItem} onRemove={mockOnRemove} />);
    const img = screen.getByAltText("Producto Test");
    expect(img).toBeTruthy();
    expect(img.getAttribute("src")).toBe("producto.jpg");
  });

  it("llama a onRemove al hacer click en eliminar", () => {
    render(<CarritoCard item={mockItem} onRemove={mockOnRemove} />);
    const deleteButton = screen.getByText("❌");
    fireEvent.click(deleteButton);
    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });
});