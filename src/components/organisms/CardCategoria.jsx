import React from "react";
import CardBody from "../molecules/CardBody";
import Text from "../atoms/Text";

function CardCategoria ({title, CardBody,}){
    return (
        /* --> div Principal para el CSS*/
        <div className="main-cardCategoria">
            <CardBody>
                <Imagen ></Imagen>
            </CardBody>
        </div>
    );
}

export default CardCategoria;