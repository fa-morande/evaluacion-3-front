import React, { useEffect, useState } from "react";
import CardBody from "../molecules/CardBody"; 
import Text from "../atoms/Text";
import ProductoService from "../../services/ProductoService";

function SeccionDestacados() {
    /* --> Variables de estado*/
    const [data, setData] = useState([]); 

    useEffect(() => {
        ProductoService.getAllProductos()
        .then((res) => {

            /* --> Se guardan los 4 primeros*/
            setData(res.data.slice(0, 4));
        })
        .catch((err) => console.error("Error:", err));
    }, []);

    return (
        <section className="seccion-contenedor">
        <Text variant="h2" className="titulo-seccion">Destacados</Text>
        <Text variant="p" className="subtitulo">Los favoritos de nuestros clientes</Text>

        <div className="grid-cards">
            {data.map((item) => (
            /* --> hay que hacer otro componente mas para esta funcion*/
            <CardBody
                /* --> Id del back*/
                key={item.id}
                
                /* --> Mapeo back items a front props*/
                imagen={item.imagenUrl || "https://via.placeholder.com/150"}
                title={item.nombre}
                price={item.precio}
                
                onClick={() => console.log("Click en ID:", item.id)}
            />
            ))}
        </div>
        </section>
    );
}

export default SeccionDestacados;