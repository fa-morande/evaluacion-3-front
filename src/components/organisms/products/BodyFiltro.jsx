import React from "react";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import '../../../styles/components/organisms/products/BodyFiltro.css';

// 1. Recibimos 'categoriaActiva' para pintar el botón correcto
function BodyFiltro({ onSearch, onFilterChange, categoriaActiva }) {
    
    // Definimos las categorías que coinciden con tu base de datos
    const FILTROS_CATEGORIAS = [
        { key: "todos", label: "Todos", categoria: "" },
        { key: "perros", label: "Perros", categoria: "Perro" },
        { key: "gatos", label: "Gatos", categoria: "Gato" },
        { key: "accesorios", label: "Accesorios", categoria: "Accesorios" }
    ];

    const handleFiltroClick = (filtro) => {
        onFilterChange(filtro.categoria);
    };

    // Helper para saber si un botón está activo
    const isActive = (filtro) => {
        if (!categoriaActiva && filtro.key === "todos") return true;
        return categoriaActiva === filtro.categoria;
    };

    return (
        <div className="seccion-filtro"> 
            <div className="controles-filtro">
                
                {/*--> Seccion de Busqueda */}
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

                {/*--> Seccion de Categorias */}
                <div className="seccion-categorias">
                    <Text variant="h3" className="titulo-seccion">
                        Categorías
                    </Text>
                    <div className="botones-filtro">
                        {FILTROS_CATEGORIAS.map((filtro) => (
                            <Button 
                                key={filtro.key}
                                text={filtro.label}
                                // 2. Lógica visual corregida usando la prop recibida
                                variant={isActive(filtro) ? 'primary' : 'secondary'}
                                onClick={() => handleFiltroClick(filtro)}
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