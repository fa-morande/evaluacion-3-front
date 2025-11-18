import React from "react";
import Text from "../atoms/Text";
import Image from "../atoms/Image";

function CardBody({ imagen, title, onClick}) {
    return (
        /* --> div Principal para el CSS*/
        <div className="card" onClick={onClick}>
            <Image src={imagen} className="card-imagen" alt={title}></Image>
            <div className="card-body">
                <Text variant="h5" className="titulo">{title}</Text>
            </div>
        </div>
    );
}

export default CardBody;
