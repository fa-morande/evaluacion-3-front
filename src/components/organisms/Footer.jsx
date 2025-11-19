import React from "react";
import Text from "../atoms/Text";
import Image from "../atoms/Image";

// Datos estáticos (que podríamos traer del API de Categorías)
const ENLACES = [
    { label: "Inicio", url: "/" },
    { label: "Productos", url: "/productos" },
    { label: "Nosotros", url: "/nosotros" },
    { label: "Contacto", url: "/contacto" },
];

const CATEGORIAS_MOCK = ["Perros", "Gatos", "Accesorios", "Alimentos"];

function Footer() {
    return (
        <footer className="footer-principal">
            <div className="contenedor-columnas">
                {/* 1. Logo y Texto */}
                <div className="columna logo-col">
                    {/* Reemplaza con tu logo */}
                    <Image src="/img/logo-mascotas.webp" alt="Logo Tienda" className="logo-footer" /> 
                    <Text variant="p" className="texto-generico">La tienda de tu mejor amigo.</Text>
                </div>

                {/* 2. Enlaces Rápidos */}
                <div className="columna">
                    <Text variant="h5" className="titulo">Enlaces Rápidos</Text>
                    <ul>
                        {ENLACES.map((link, index) => (
                            <li key={index}><a href={link.url} className="enlace-footer">{link.label}</a></li>
                        ))}
                    </ul>
                </div>

                {/* 3. Categorías */}
                <div className="columna">
                    <Text variant="h5" className="titulo">Categorías</Text>
                    <ul>
                        {CATEGORIAS_MOCK.map((cat, index) => (
                            <li key={index}><a href={`/productos?cat=${cat}`} className="enlace-footer">{cat}</a></li>
                        ))}
                    </ul>
                </div>

                {/* 4. Contacto */}
                <div className="columna">
                    <Text variant="h5" className="titulo">Contacto</Text>
                    <Text variant="p">Email: contacto@tienda.cl</Text>
                    <Text variant="p">Teléfono: +56 9 1234 5678</Text>
                </div>
            </div>

            <hr className="separador" /> 
            
            {/* Derechos Reservados */}
            <div className="copyright">
                <Text variant="p">© {new Date().getFullYear()} Todos los derechos reservados.</Text>
            </div>
        </footer>
    );
}

export default Footer;