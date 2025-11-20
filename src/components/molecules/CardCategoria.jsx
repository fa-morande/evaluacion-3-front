import React from "react";
import Text from "../atoms/Text";
// Asegúrate que tu átomo se llama 'Image.jsx' y lo importamos con 'Image' mayúscula
import Image from "../atoms/Image"; 

// 1. Recibe las propiedades que definimos en la sección de Categorías
function CardCategoria ({ imagen, titulo, descripcion }){ 
    return (
        /* El div principal de la Molécula */
        <div className="main-cardCategoria">
            <div className="body-cardCategoria" >
                
                {/* 2. CORRECCIÓN CRÍTICA: Usamos el nombre correcto del componente: <Image> */}
                <Image 
                    src={imagen} 
                    className="card-img-top" 
                    // Usamos la prop 'titulo' directamente
                    alt={titulo} 
                /> 
                
                {/* 3. Título y Descripción */}
                <Text variant="h5" className="title-cardCategoria">{titulo}</Text>
                <Text variant="p" className="desc-cardCategoria">{descripcion}</Text>
                
            </div>
        </div>
    );
}

export default CardCategoria;