import React from "react";
import { ListGroup} from "react-bootstrap";
export default function ListInterestComponent (){
    return (
        <ListGroup defaultActiveKey="#link1">
            <h3>
                Bibliotecas de Interes 
            </h3>    
            <ListGroup.Item action href="https://dl.acm.org" target="_blank">
                ACM Biblioteca
            </ListGroup.Item>
            <ListGroup.Item action href="https://www.ebsco.com/es/bibliotecas-academicas" target="_blank">
                EBSCO Biblioteca
            </ListGroup.Item>
            <ListGroup.Item action href="https://ieeexplore.ieee.org/Xplore/home.jsp" target="_blank">
                IEEE Explore Biblioteca
            </ListGroup.Item>
            <ListGroup.Item action href="https://vlex.com.co" target="_blank">
                VLEX Biblioteca
            </ListGroup.Item>
            <ListGroup.Item action href="https://www.micromedexsolutions.com/micromedex2/librarian/ssl/true" target="_blank">
                MicroMedex Solutions Biblioteca
            </ListGroup.Item>
        </ListGroup>
    )
}