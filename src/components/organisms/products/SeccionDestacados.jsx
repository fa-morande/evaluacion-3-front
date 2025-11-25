import React, { useEffect, useState } from "react";
// 1. Importamos la nueva Card
import CardProductGeneral from "../../molecules/cards/CardProductGeneral"; 
import Text from "../../atoms/Text";
// 2. Usamos el servicio actualizado (api/productos)
import { getProductos } from "../../../services/api/productos"; 
import "../../../styles/components/organisms/products/SeccionDestacados.css";

function SeccionDestacados({ agregarAlCarrito }) { 
    
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Llamamos a la función directa getProductos
        getProductos()
        .then((respuesta) => {
            // El nuevo servicio devuelve el array directo (json), no response.data
            // Pero por seguridad validamos ambas formas
            const productosArray = Array.isArray(respuesta) ? respuesta : (respuesta.data || []);
            
            // Filtramos o cortamos los primeros 4
            setData(productosArray.slice(0, 4));
            setError(null);
        })
        .catch((err) => {
            console.error("Error cargando destacados:", err);
            setError("No se pudieron cargar los productos destacados.");
            setData([]);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <section className="seccion-contenedor">
                <div style={{textAlign: 'center', padding: '2rem'}}>
                    <Text variant="p">Cargando favoritos...</Text>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="seccion-contenedor">
                <Text variant="p" style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            </section>
        );
    }
    
    if (!data || data.length === 0) {
        return (
            <section className="seccion-contenedor">
                <Text variant="p" style={{textAlign: 'center'}}>No hay productos destacados.</Text>
            </section>
        );
    }

    return (
        <section className="seccion-contenedor">
            <div className="header-seccion">
                <Text variant="h2" className="titulo-seccion">Destacados</Text>
                <Text variant="p" className="subtitulo">Los favoritos de nuestros clientes</Text>
            </div>

            <div className="grid-cards">
                {data.map((item) => (
                    <CardProductGeneral
                        key={item.id}
                        // Mapeo de datos del Backend -> Props del Componente
                        imagen={item.imagenUrl || "/img/placeholder.jpg"} // Fallback de imagen
                        titulo={item.nombre}
                        // Si categoria es objeto sacamos nombre, si es null ponemos "General"
                        categoria={item.categoria?.nombre || "Mascotas"} 
                        precio={item.precio}
                        subtitulo={item.descripcion} // Usamos descripción como subtítulo
                        
                        // Pasamos la función para el carrito
                        onAddToCart={() => agregarAlCarrito(item)} 
                    />
                ))}
            </div>
        </section>
    );
}

export default SeccionDestacados;