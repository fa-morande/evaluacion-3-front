import { lazy } from 'react';

// --- 1. Definición de Componentes (Lazy Load) ---
// Solo importamos las páginas que existen
const Inicio = lazy(() => import('../pages/Inicio.jsx'));
const Productos = lazy(() => import('../pages/Productos.jsx'));
const Nosotros = lazy(() => import('../pages/Nosotros.jsx'));
const Contacto = lazy(() => import('../pages/Contacto.jsx'));
const Carrito = lazy(() => import('../pages/Carrito.jsx'));

// Páginas que NO deben llevar Header/Footer
const Login = lazy(() => import('../pages/Login.jsx'));
const Registro = lazy(() => import('../pages/registro.jsx'));

// --- 2. Definición de Rutas Públicas (appRoutes) ---
const publicRoutes = [
  // RUTAS PRINCIPALES (showNavbar: true)
  { path: '/', element: Inicio, showNavbar: true },
  { path: '/productos', element: Productos, showNavbar: true },
  { path: '/nosotros', element: Nosotros, showNavbar: true },
  { path: '/contacto', element: Contacto, showNavbar: true },
  { path: '/carrito', element: Carrito, showNavbar: true },

  // RUTAS SIN LAYOUT (showNavbar: false)
  { path: '/login', element: Login, showNavbar: false },
  { path: '/registro', element: Registro, showNavbar: false },
];

// --- 3. Exportación ---
const notFoundRoute = {
  path: '*',
  element: () => <div className="text-center py-10 text-2xl">404 | Página no encontrada 😔</div>,
  showNavbar: false,
};

export const appRoutes = [...publicRoutes, notFoundRoute];