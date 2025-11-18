// src/test/components/organisms/Footer.spec.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../../components/organisms/Footer";

describe("Footer Component", () => {
  it("renderiza el texto de copyright", () => {
    render(<Footer />);
    expect(screen.getByText("© 2025 Tienda Mascotas. Todos los derechos reservados.")).toBeTruthy();
  });

  it("renderiza dentro de un elemento footer", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toBeTruthy();
  });
});