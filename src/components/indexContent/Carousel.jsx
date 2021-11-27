import React from "react";
import {Carousel} from "react-bootstrap";
export default function CarouselComponent (){
    return (
        <div className="w-100 mt-2">
            <Carousel variant="dark" prevLabel="Anterior" nextLabel="Siguiente" className="carousel-per">
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://img.freepik.com/foto-gratis/fondo-textura-papel-arrugado-negro-oscuro-cerca_99266-411.jpg?size=626&ext=jpg"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h5>Ultimos Avances</h5>
                    <p>Avances realizados por investigadores...</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://img.freepik.com/foto-gratis/fondo-textura-papel-arrugado-negro-oscuro-cerca_99266-411.jpg?size=626&ext=jpg"
                    alt="Second slide"
                    />
                    <Carousel.Caption>
                    <h5>Proyectos con mejor calificacion</h5>
                    <p>Visualice los proyectos que mejor reconocimiento han tenido por los evaluadores...</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://img.freepik.com/foto-gratis/fondo-textura-papel-arrugado-negro-oscuro-cerca_99266-411.jpg?size=626&ext=jpg"
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    <h5>Ultimas tendencias</h5>
                    <p>Conozca sobre los temas que mas investigación han recibido en el ultimo mes...</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}