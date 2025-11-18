// src/test/Input.spec.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../../../components/atoms/Input";


describe("Input Component", () => {
  it("renderiza input con label y placeholder", () => {
    render(<Input id="name" label="Nombre" placeholder="Ingresa tu nombre" />);
    expect(screen.getByLabelText("Nombre")).toBeTruthy();
    expect(screen.getByPlaceholderText("Ingresa tu nombre")).toBeTruthy();
  });

  it("llama a onChange al modificar valor", () => {
    const handleChange = jasmine.createSpy("handleChange");
    render(<Input id="test" onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Hola" } });
    expect(handleChange).toHaveBeenCalled();
  });

it("es requerido si required=true", () => {
  render(<Input id="requiredInput" required />);
  const input = screen.getByRole("textbox");
  expect(input.hasAttribute("required")).toBe(true);
});
});
