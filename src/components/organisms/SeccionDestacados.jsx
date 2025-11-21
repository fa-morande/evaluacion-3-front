import React, { useEffect, useState } from "react";
// ... (imports de CardBody y Text)
import CardBody from "../molecules/CardBody";
import Text from "../atoms/Text";
import ProductoService from "../../services/productoService";

function SeccionDestacados({ agregarAlCarrito }) { 
    // Usamos 'data' para el contenido y 'loading' para el estado
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ProductoService.getAllProductos()
        .then((res) => {
            // ¡Ya no necesitamos try/catch! Solo guardamos los datos.
            setData(res.data.slice(0, 4));
        })
        .finally(() => {
            // Se termina de cargar, sin importar si hay error o no (solo en mock)
            setLoading(false); 
        });
    }, []);

    // 1. Manejo del estado "Cargando" (Ahora se verá por 500ms)
    if (loading) {
        return <section className="seccion-contenedor"><Text variant="p">Cargando Productos Destacados...</Text></section>;
    }
    
    // 2. Manejo de estado "Vacío" (Si por error la data mock está vacía)
    if (!data || data.length === 0) {
        return <section className="seccion-contenedor"><Text variant="p">No hay datos locales para mostrar.</Text></section>;
    }

    // 3. RENDERIZADO FINAL CON DATOS
    return (
        <section className="seccion-contenedor">
            {/* ... Tu JSX de titulos y grid ... */}
            <div className="grid-cards">
                {data.map((item) => (
                    <CardBody
                        key={item.id}
                        imagen={item.imagenUrl || "https://via.placeholder.com/150"}
                        title={item.nombre}
                        price={item.precio}
                        
                        // Conexión del carrito
                        onAddToCart={() => agregarAlCarrito(item)} 
                    />
                ))}
            </div>
        </section>
    );
}

export default SeccionDestacados;