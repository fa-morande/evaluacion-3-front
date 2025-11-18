// src/test/components/molecules/BlogDetallesCard.spec.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import BlogDetallesCard from "../../../components/molecules/BlogDetallesCard";

const MockRouter = ({ children }) => {
  const router = createMemoryRouter(
    [{ path: "*", element: children }],
    { initialEntries: ["/"] }
  );
  return <RouterProvider router={router} />;
};

describe("BlogDetallesCard Component", () => {
  const mockBlogDetalle = {
    id: 1,
    name: "Blog detallado",
    description: "Descripción completa del blog",
    image: "detalle.jpg"
  };

  it("renderiza la imagen del blog", () => {
    render(
      <MockRouter>
        <BlogDetallesCard blogDetalle={mockBlogDetalle} />
      </MockRouter>
    );
    const img = screen.getByRole("img");
    expect(img).toBeTruthy();
    expect(img.getAttribute("src")).toBe("detalle.jpg");
  });

  it("renderiza la descripción del blog", () => {
    render(
      <MockRouter>
        <BlogDetallesCard blogDetalle={mockBlogDetalle} />
      </MockRouter>
    );
    expect(screen.getByText("Descripción completa del blog")).toBeTruthy();
  });

  it("renderiza el botón Volver atrás", () => {
    render(
      <MockRouter>
        <BlogDetallesCard blogDetalle={mockBlogDetalle} />
      </MockRouter>
    );
    expect(screen.getByText("Volver atrás")).toBeTruthy();
  });
});