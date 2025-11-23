import React from "react";
import CardCategoria from "../molecules/CardCategoria";
import Text from "../atoms/Text";
import nosotrosData from "../../data/nosotros.js"; // <-- Importamos desde nosotros.js
import "../../styles/components/organisms/SeccionCategorias.css";

function SeccionCategorias() {
    // Obtenemos el array de categorías directamente desde nosotros.js
    const listaCategorias = nosotrosData.categorias;

    return (
        <section className="seccion-categorias-container">
            <div className="encabezado-categorias">
                <Text variant="h2" className="titulo-seccion-cat">Explora por Categoría</Text>
                <Text variant="p" className="subtitulo-seccion-cat">Encuentra rápidamente lo que buscas</Text>
            </div>

            <div className="categorias-grid">
                {listaCategorias.map((cat, index) => (
                    <CardCategoria 
                        key={index}
                        titulo={cat.nombre}      // "Perros", "Gatos", etc.
                        imagen={cat.image}       // La URL de la imagen
                        descripcion={cat.extra}  // "Alimentos, juguetes..."
                    />
                ))}
            </div>
        </section>
    );
}

export default SeccionCategorias;