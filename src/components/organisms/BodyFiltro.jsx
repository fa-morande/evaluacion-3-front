import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import '../../styles/organisms/BodyFiltro.css';

// Filtros definidos con sus claves y etiquetas
const FILTROS_CATEGORIAS = [
    { key: "todos", label: "Todos", categoria: "" },
    { key: "perros", label: "Perros", categoria: "Perros" },
    { key: "gatos", label: "Gatos", categoria: "Gatos" },
    { key: "accesorios", label: "Accesorios", categoria: "Accesorios" }
];

function BodyFiltro({ onSearch, onFilterChange }) {
    const [filtroActivo, setFiltroActivo] = useState("todos");

    const handleFiltroClick = (filtroKey) => {
        const filtroSeleccionado = FILTROS_CATEGORIAS.find(f => f.key === filtroKey);
        setFiltroActivo(filtroKey);
        // Enviamos la categoría real al padre (vacío para 'todos')
        onFilterChange(filtroSeleccionado.categoria);
    };

    return (
        <div className="seccion-filtro">
            <div className="encabezado-filtro">
                <Text variant="h3" className="titulo-seccion">Catálogo</Text>
                <Text variant="p" className="subtitulo-seccion">Encuentra lo mejor para tu mascota</Text>
            </div>
            
            <div className="controles-filtro">
                {/* Input de Búsqueda */}
                <div className="wrapper-busqueda">
                    <Input 
                        placeholder="Buscar productos..." 
                        onChange={(e) => onSearch(e.target.value)}
                        className="input-busqueda"
                    />
                </div>

                {/* Botones de Categorías */}
                <div className="wrapper-categorias">
                    <Text variant="span" className="texto-filtro">Categorías:</Text>
                    <div className="botones-filtro">
                        {FILTROS_CATEGORIAS.map((filtro) => (
                            <Button 
                                key={filtro.key}
                                // CORRECCIÓN 1: Usamos 'text' en lugar de children
                                text={filtro.label}
                                // CORRECCIÓN 2: Usamos 'variant' para el estado activo/inactivo
                                // Si está activo = primary (Naranja), si no = secondary (Azul borde)
                                variant={filtroActivo === filtro.key ? 'primary' : 'secondary'}
                                onClick={() => handleFiltroClick(filtro.key)}
                                // Opcional: size="small" para que se vean más compactos
                                size="small"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BodyFiltro;