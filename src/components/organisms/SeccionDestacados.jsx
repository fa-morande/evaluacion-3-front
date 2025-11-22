import React, { useEffect, useState } from "react";
import CardBody from "../molecules/CardBody"; 
import Text from "../atoms/Text";
import ProductoService from "../../services/ProductoService";
import '../../styles/organisms/SeccionDestacados.css';

// 1. Recibe la función 'agregarAlCarrito' como prop desde App.jsx
function SeccionDestacados({ agregarAlCarrito }) { 
    
    /* --> Variables de estado mejoradas */
    const [data, setData] = useState(null); // Usamos null para diferenciar de [].
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ProductoService.getAllProductos()
        .then((res) => {
            // Aseguramos que la respuesta sea un array antes de usar slice
            const productosArray = Array.isArray(res.data) ? res.data : [];
            
            /* --> Se guardan los 4 primeros*/
            setData(productosArray.slice(0, 4));
            setError(null);
        })
        .catch((err) => {
            console.error("Error de conexión o API:", err);
            // Mensaje claro si la conexión falla (lo que causa la pantalla azul)
            setError("No fue posible cargar los productos. Por favor, verifica el Backend.");
            setData([]); // Previene crashes, ya que data es un array vacío
        })
        .finally(() => {
            setLoading(false); // Deja de cargar, sea cual sea el resultado
        });
    }, []);

    // 2. RENDERING CONDICIONAL (Manejo de Estados)
    if (loading) {
        return <section className="seccion-contenedor"><Text variant="p">Cargando productos...</Text></section>;
    }

    if (error) {
        // Muestra el mensaje de error si la API falló
        return <section className="seccion-contenedor"><Text variant="p" style={{ color: 'red', textAlign: 'center' }}>{error}</Text></section>;
    }
    
    if (data.length === 0) {
        // Muestra si la API responde correctamente, pero no hay datos en la BD
        return <section className="seccion-contenedor"><Text variant="p">No hay productos destacados para mostrar.</Text></section>;
    }

    // 3. RENDERIZADO FINAL CON DATOS
    return (
        <section className="seccion-contenedor">
            <Text variant="h2" className="titulo-seccion">Destacados</Text>
            <Text variant="p" className="subtitulo">Los favoritos de nuestros clientes</Text>

            <div className="grid-cards">
                {data.map((item) => (
                    <CardBody
                        key={item.id}
                        
                        /* --> Mapeo back items a front props*/
                        imagen={item.imagenUrl || "https://via.placeholder.com/150"}
                        title={item.nombre}
                        price={item.precio}
                        
                        onClick={() => console.log("Click en ID:", item.id)}
                        // 4. Conexión de la función del carrito
                        onAddToCart={() => agregarAlCarrito(item)} 
                    />
                ))}
            </div>
        </section>
    );
}

export default SeccionDestacados;