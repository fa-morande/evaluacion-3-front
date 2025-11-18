// src/test/components/molecules/LoginForm.spec.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import LoginForm from "../../../components/molecules/LoginForm";

const MockRouter = ({ children }) => {
  const router = createMemoryRouter(
    [{ path: "*", element: children }],
    { initialEntries: ["/"] }
  );
  return <RouterProvider router={router} />;
};

describe("LoginForm Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renderiza el formulario de login", () => {
    render(
      <MockRouter>
        <LoginForm />
      </MockRouter>
    );
    expect(screen.getByRole("heading", { name: "Iniciar sesión" })).toBeTruthy();
    expect(screen.getByLabelText("Correo electrónico")).toBeTruthy();
    expect(screen.getByLabelText("Contraseña")).toBeTruthy();
  });

  it("actualiza los campos al escribir", () => {
    render(
      <MockRouter>
        <LoginForm />
      </MockRouter>
    );
    const emailInput = screen.getByLabelText("Correo electrónico");
    const passwordInput = screen.getByLabelText("Contraseña");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(emailInput.value).toBe("test@test.com");
    expect(passwordInput.value).toBe("123456");
  });

  it("muestra error con credenciales incorrectas", () => {
    localStorage.setItem("usuarioEmail", "correcto@test.com");
    localStorage.setItem("usuarioContrasena", "correcta");

    render(
      <MockRouter>
        <LoginForm />
      </MockRouter>
    );

    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "incorrecto@test.com" }
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "incorrecta" }
    });
    
    const submitButton = screen.getByRole("button", { name: "Iniciar sesión" });
    fireEvent.click(submitButton);

    expect(screen.getByText("Correo o contraseña incorrectos. Intenta de nuevo.")).toBeTruthy();
  });
});