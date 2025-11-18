import React from "react";
import CardCategoria from "../molecules/CardCategoria"; // Tu componente existente
import Text from "../atoms/Text";

/* --> Diccionario para productos locales*/
const IMG_LOCALES = {
    "Gatos": "/img/gato-jugando.webp",
    "Perros": "/img/perro-comiendo.webp",
    "Accesorios": "/img/collar.webp",
    "default": "/img/logo-mascotas.webp"
    };

    /* --> Datos estaticos*/
    const DATA_INICIAL = [
    { id: 1, nombre: "Perros", desc: "Alimento y juguetes" },
    { id: 2, nombre: "Gatos", desc: "Lo mejor para tu michi" },
    { id: 3, nombre: "Accesorios", desc: "Correas y más" }
    ];

    function SeccionCategorias() {
    /* --> Variable generica para items*/
    const items = DATA_INICIAL; 

    return (
        <section className="seccion-contenedor">
        <div className="encabezado">
            <Text variant="h2" className="titulo-seccion">Nuestras Categorías</Text>
        </div>

        <div className="grid-simple"> 
            {items.map((item) => (
            <CardCategoria 
                key={item.id}
                /* --> Busca imagen y si no la encuentra muestra las default*/
                imagen={IMG_LOCALES[item.nombre] || IMG_LOCALES["default"]}
                titulo={item.nombre}
                descripcion={item.desc}
            />
            ))}
        </div>
        </section>
    );
}

export default SeccionCategorias;