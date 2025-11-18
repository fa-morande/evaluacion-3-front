// src/test/Text.spec.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Text from "../../../components/atoms/Text";

describe("Text Component", () => {
  it("renderiza texto con el contenido correcto", () => {
    render(<Text>Hola mundo</Text>);
    expect(screen.getByText("Hola mundo")).toBeTruthy();
  });

  it("usa la etiqueta HTML correcta", () => {
    render(<Text variant="h1">Título</Text>);
    const heading = screen.getByText("Título");
    expect(heading.tagName.toLowerCase()).toBe("h1");
  });

  it("aplica la clase correctamente", () => {
    render(<Text className="text-test">Clase</Text>);
    expect(screen.getByText("Clase")).toHaveClass("text-test");
  });
});
