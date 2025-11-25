import React from "react";
import { useNavigate } from "react-router-dom";
import CardCategoria from "../../molecules/cards/CardCategoria";
import Text from "../../atoms/Text.jsx";
import nosotrosData from "../../../services/data/nosotros.js";
import "../../../styles/components/organisms/products/SeccionCategorias.css";

function SeccionCategorias() {
    const listaCategorias = nosotrosData.categorias;
    const navigate = useNavigate();

    const handleCategoriaClick = (nombreCategoria) => {
        // Navegamos pasando el nombre de la categoría en la URL
        navigate(`/productos?categoria=${encodeURIComponent(nombreCategoria)}`);
    };

    return (
        <section className="seccion-categorias-container">
            {/* El contenido interno ahora es el que se centra con max-width */}
            <div className="encabezado-categorias">
                <Text variant="h2" className="titulo-seccion-cat">Explora por Categoría</Text>
                <Text variant="p" className="subtitulo-seccion-cat">Encuentra rápidamente lo que buscas</Text>
            </div>

            <div className="categorias-grid">
                {listaCategorias.map((cat, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleCategoriaClick(cat.nombre)}
                        style={{ cursor: 'pointer' }}
                    >
                        <CardCategoria 
                            titulo={cat.nombre}
                            imagen={cat.image}
                            descripcion={cat.extra}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default SeccionCategorias;