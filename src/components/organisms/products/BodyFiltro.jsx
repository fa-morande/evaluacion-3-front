import React, { useState } from "react";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import productos from "../../../services/data/productos";
import '../../../styles/components/organisms/products/BodyFiltro.css';

function BodyFiltro({ onSearch, onFilterChange }) {
    const [filtroActivo, setFiltroActivo] = useState("todos");

    // Extraer categorías dinámicamente de productos.js
    const categorias = Object.keys(productos.categoria);
    
    // Crear array de filtros con "Todos" primero
    const FILTROS_CATEGORIAS = [
        { key: "todos", label: "Todos", categoria: "" }
    ].concat(
        categorias.map(cat => ({
            key: cat.toLowerCase(),
            label: cat,
            categoria: cat
        }))
    );

    const handleFiltroClick = (filtroKey) => {
        const filtroSeleccionado = FILTROS_CATEGORIAS.find(f => f.key === filtroKey);
        setFiltroActivo(filtroKey);
        onFilterChange(filtroSeleccionado.categoria);
    };

    return (
        <div className="seccion-filtro"> 
            <div className="controles-filtro">
                
                {/* Sección de Búsqueda */}
                <div className="seccion-busqueda">
                    <Text variant="h3" className="titulo-seccion">
                        Buscar Productos
                    </Text>
                    <div className="wrapper-busqueda">
                        <Input 
                            placeholder="Buscar por nombre..."
                            onChange={(e) => onSearch(e.target.value)}
                            className="input-busqueda"
                        />
                    </div>
                </div>
                {/* Sección de Categorías */}
                <div className="seccion-categorias">
                    <Text variant="h3" className="titulo-seccion">
                        Categorías
                    </Text>
                    <div className="botones-filtro">
                        {FILTROS_CATEGORIAS.map((filtro) => (
                            <Button 
                                key={filtro.key}
                                text={filtro.label}
                                variant={filtroActivo === filtro.key ? 'primary' : 'secondary'}
                                onClick={() => handleFiltroClick(filtro.key)}
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