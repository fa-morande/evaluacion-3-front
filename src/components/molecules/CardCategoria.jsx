import React from "react";
import CardBody from "./CardBody";
import Text from "../atoms/Text";

function CardCategoria ({title, CardBody}){
    return (
        /* --> div Principal para el CSS*/
        <div className="main-cardCategoria">
            <CardBody className="body-cardCategoria" >
                /*falta asignar el src con la ruta*/
                <Imagen /*src={}*/ className=""/>
                /*falta asignar bien el titulo*/
                <Text className="title-cardCategoria">{title}</Text>
            </CardBody>
        </div>
    );
}

export default CardCategoria;