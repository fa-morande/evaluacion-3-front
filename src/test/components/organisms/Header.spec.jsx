// src/test/components/organisms/Header.spec.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Header from "../../../components/organisms/Header";

const MockRouter = ({ children }) => {
  const router = createMemoryRouter(
    [{ path: "*", element: children }],
    { initialEntries: ["/"] }
  );
  return <RouterProvider router={router} />;
};

describe("Header Component", () => {
  it("renderiza el componente Header", () => {
    const { container } = render(
      <MockRouter>
        <Header carrito={[]} />
      </MockRouter>
    );
    const header = container.querySelector("header");
    expect(header).toBeTruthy();
  });

  it("pasa el carrito al Navbar", () => {
    const mockCarrito = [{ id: 1 }, { id: 2 }];
    render(
      <MockRouter>
        <Header carrito={mockCarrito} />
      </MockRouter>
    );
    // Verifica que el badge del carrito muestre 2
    expect(screen.getByText("2")).toBeTruthy();
  });

  it("renderiza con carrito vacío", () => {
    render(
      <MockRouter>
        <Header carrito={[]} />
      </MockRouter>
    );
    // El navbar debe renderizarse sin errores
    expect(screen.getByText("Home")).toBeTruthy();
  });
});