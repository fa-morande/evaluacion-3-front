// src/test/components/molecules/BlogCard.spec.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import BlogCard from "../../../components/molecules/BlogCard";

const MockRouter = ({ children }) => {
  const router = createMemoryRouter(
    [{ path: "*", element: children }],
    { initialEntries: ["/"] }
  );
  return <RouterProvider router={router} />;
};

describe("BlogCard Component", () => {
  const mockBlog = {
    id: 1,
    name: "Blog de prueba",
    description: "Descripción del blog",
    image: "test.jpg"
  };

  it("renderiza el nombre del blog", () => {
    render(
      <MockRouter>
        <BlogCard blog={mockBlog} />
      </MockRouter>
    );
    expect(screen.getByText("Blog de prueba")).toBeTruthy();
  });

  it("renderiza la descripción del blog", () => {
    render(
      <MockRouter>
        <BlogCard blog={mockBlog} />
      </MockRouter>
    );
    expect(screen.getByText("Descripción del blog")).toBeTruthy();
  });

  it("renderiza la imagen del blog", () => {
    render(
      <MockRouter>
        <BlogCard blog={mockBlog} />
      </MockRouter>
    );
    const img = screen.getByAltText("Blog de prueba");
    expect(img).toBeTruthy();
    expect(img.getAttribute("src")).toBe("test.jpg");
  });

  it("renderiza el botón Leer Más", () => {
    render(
      <MockRouter>
        <BlogCard blog={mockBlog} />
      </MockRouter>
    );
    expect(screen.getByText("Leer Más")).toBeTruthy();
  });
});