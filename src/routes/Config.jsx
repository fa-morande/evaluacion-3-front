import { lazy } from 'react';

// --- 1. Definición de Componentes (Lazy Load para rendimiento) ---
// Usamos lazy() para cargar cada página SOLO cuando se necesita.
const Inicio = lazy(() => import('../pages/Inicio'));
const Productos = lazy(() => import('../pages/Productos'));
const Nosotros = lazy(() => import('../pages/Nosotros'));
const Contacto = lazy(() => import('../pages/Contacto'));
const Carrito = lazy(() => import('../pages/Carrito'));
const Blogs = lazy(() => import('../pages/Blogs'));
const BlogsDetalle = lazy(() => import('../pages/Blogsdetalle'));

// Páginas que ocultan Header/Footer
const Login = lazy(() => import('../pages/Login'));
const Registro = lazy(() => import('../pages/registro'));

// --- 2. Definición de Rutas Públicas ---
const publicRoutes = [
    // Páginas con Header y Footer (showNavbar: true)
    { path: '/', element: Inicio, showNavbar: true },
    { path: '/productos', element: Productos, showNavbar: true },
    { path: '/nosotros', element: Nosotros, showNavbar: true },
    { path: '/contacto', element: Contacto, showNavbar: true },
    { path: '/carrito', element: Carrito, showNavbar: true },
    { path: '/blogs', element: Blogs, showNavbar: true },
    // Usamos :id para que la ruta sepa que debe esperar un parámetro
    { path: '/blogsdetalle/:id', element: BlogsDetalle, showNavbar: true }, 

    // Páginas sin Header ni Footer (showNavbar: false)
    { path: '/login', element: Login, showNavbar: false },
    { path: '/registro', element: Registro, showNavbar: false },
    ];

    // --- 3. Definición de Rutas Especiales ---
    // La ruta 404
    const notFoundRoute = {
    path: '*',
    // Usamos una función simple que devuelve JSX, como si fuera un componente
    element: () => <div className="text-center py-10 text-2xl">404 | Error, página no encontrada 😔</div>,
    showNavbar: false,
};

// --- 4. Exportación Final ---
// Combinamos todas las rutas
export const appRoutes = [...publicRoutes, notFoundRoute];