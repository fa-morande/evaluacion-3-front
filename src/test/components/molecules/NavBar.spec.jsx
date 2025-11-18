// src/test/components/molecules/Navbar.spec.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Navbar from "../../../components/molecules/Navbar";

const MockRouter = ({ children, initialRoute = "/" }) => {
  const router = createMemoryRouter(
    [{ path: "*", element: children }],
    { initialEntries: [initialRoute] }
  );
  return <RouterProvider router={router} />;
};

describe("Navbar Component", () => {
  it("renderiza todos los enlaces de navegación", () => {
    render(
      <MockRouter>
        <Navbar carrito={[]} />
      </MockRouter>
    );

    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Productos")).toBeTruthy();
    expect(screen.getByText("Registro")).toBeTruthy();
    expect(screen.getByText("Iniciar Sesión")).toBeTruthy();
    expect(screen.getByText("Nosotros")).toBeTruthy();
    expect(screen.getByText("Blogs")).toBeTruthy();
    expect(screen.getByText("Contacto")).toBeTruthy();
  });

  it("muestra el badge del carrito cuando hay productos", () => {
    const mockCarrito = [{ id: 1 }, { id: 2 }, { id: 3 }];
    render(
      <MockRouter>
        <Navbar carrito={mockCarrito} />
      </MockRouter>
    );

    expect(screen.getByText("3")).toBeTruthy();
  });

  it("no muestra el badge cuando el carrito está vacío", () => {
    render(
      <MockRouter>
        <Navbar carrito={[]} />
      </MockRouter>
    );

    expect(screen.queryByText("0")).toBeFalsy();
  });
});