import React from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

// Aquí llamarías al ProductoService para obtener la lista de Categorías reales si fuera necesario
const CATEGORIAS_MOCK = ["Perros", "Gatos", "Accesorios", "Ofertas"]; 

function BodyFiltro({ onSearch, onFilterChange }) {
    return (
        <div className="seccion-filtro">
            <Text variant="h3" className="titulo-seccion">Catálogo de Productos</Text>
            
            {/* Input de Búsqueda */}
            <Input 
                placeholder="Buscar por nombre..." 
                onChange={(e) => onSearch(e.target.value)}
                className="input-busqueda"
            />

            {/* Botones de Categorías */}
            <div className="contenedor-botones">
                <Text variant="p">Filtrar por:</Text>
                {CATEGORIAS_MOCK.map((categoria) => (
                    <Button 
                        key={categoria} 
                        className="btn-categoria" 
                        onClick={() => onFilterChange(categoria)}>
                        {categoria}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default BodyFiltro;