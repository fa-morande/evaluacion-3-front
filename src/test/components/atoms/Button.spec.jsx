// src/test/Button.spec.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../components/atoms/Button";
describe("Button Component", () => {
  it("renderiza el botón con el texto correcto", () => {
    render(<Button text="Click me" />);
    expect(screen.getByText("Click me")).toBeTruthy();
  });

  it("aplica la clase de variante y tamaño correctamente", () => {
    render(<Button text="Test" variant="register" size="large" />);
    const btn = screen.getByText("Test");
    expect(btn).toHaveClass("btn-register");
    expect(btn).toHaveClass("btn-large");
  });

  it("ejecuta onClick al hacer click", () => {
    const handleClick = jasmine.createSpy("handleClick");
    render(<Button text="Click" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalled();
  });
});
