import React from "react";
import { useNavigate } from "react-router-dom";
import CardCategoria from "../../molecules/cards/CardCategoria";
import Text from "../../atoms/Text.jsx";
import nosotrosData from "../../../services/data/nosotros.js";
import "../../../styles/components/organisms/products/SeccionCategorias.css";

function SeccionCategorias() {
    const listaCategorias = nosotrosData.categorias;
    const navigate = useNavigate();

    // Helper para traducir de la UI (Plural) a la BD (Singular)
    const mapearCategoriaParaBD = (nombreUI) => {
        const mapa = {
            "Perros": "Perro", // UI: Perros -> BD: Perro
            "Gatos": "Gato",   // UI: Gatos -> BD: Gato
            "Accesorios": "Accesorios"
        };
        // Si no está en el mapa, usamos el nombre original
        return mapa[nombreUI] || nombreUI;
    };

    const handleCategoriaClick = (nombreCategoria) => {
        const nombreParaFiltro = mapearCategoriaParaBD(nombreCategoria);
        // Navegamos con el nombre corregido
        navigate(`/productos?categoria=${encodeURIComponent(nombreParaFiltro)}`);
    };

    return (
        <section className="seccion-categorias-container">
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
                        className="card-wrapper" // Clase opcional para selectores
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