// src/test/Image.spec.jsx
import React from 'react';
import { render, screen } from "@testing-library/react";
import Image from "../../../components/atoms/Image";

describe("Image Component", () => {
 it("renderiza la imagen con src y alt correctos", () => {
  render(<Image src="test.png" alt="Imagen de prueba" className="img-test" />);
  const img = screen.getByAltText("Imagen de prueba");
  expect(img).toBeTruthy();
  expect(img.getAttribute("src")).toBe("test.png");
  expect(img).toHaveClass("img-test");
});
});
