import React, { useEffect, useState } from "react";
import CardProductGeneral from "../../molecules/cards/CardProductGeneral"; 
import Text from "../../atoms/Text";
import { getProductos } from "../../../services/api/productos"; 
import "../../../styles/components/organisms/products/SeccionDestacados.css";

function SeccionDestacados({ agregarAlCarrito }) { 
    
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /*--> GetProductos*/
        getProductos()
        .then((respuesta) => {
            const productosArray = Array.isArray(respuesta) ? respuesta : (respuesta.data || []);
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
                        imagen={item.imagenUrl || "/img/placeholder.jpg"}
                        titulo={item.nombre}
                        categoria={item.categoria?.nombre || "Mascotas"} 
                        precio={item.precio}
                        subtitulo={item.descripcion}
                        onAddToCart={() => agregarAlCarrito(item)} 
                    />
                ))}
            </div>
        </section>
    );
}

export default SeccionDestacados;