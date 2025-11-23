import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // IMPORTANTE: Importar esto
import App from "./App";

// CSS global
import "./styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* AQUÍ está la clave: El Router debe envolver a toda la App */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);