import React, {useState} from 'react'
import { Row, Col, Button, Modal, Table } from 'react-bootstrap'
import AssignForm from './AssignForm';
export default function AssignComponent ({data, setFirstOpt}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
            <Button variant="outline-success" className="w-100" onClick={handleShow}>
                Asignar
            </Button>
    
            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header>
                        <Modal.Title>ASIGNAR EVALUADOR</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="100000">
                                <Row className="border-bottom">
                                    <Col>
                                        <span className="font-32">
                                            Información de Proyecto
                                        </span> 
                                    </Col>
                                </Row>
                                <Table striped bordered hover size="sm">
                                    <tbody>
                                        <tr>
                                            <td><strong>Nombre Proyecto : </strong></td>
                                            <td>{data.titulo}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Autor : </strong></td>
                                            <td>{data.autor}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Fecha de Creación : </strong></td>
                                            <td>{data.fecha_creacion}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Estado : </strong></td>
                                            <td>{data.estado}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Palabras Clave : </strong></td>
                                            <td>{data.keysword}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Resumen : </strong></td>
                                            <td>{data.resumen}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Tópico : </strong></td>
                                            <td>{data.topico}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                
                            </div>
                            <div class="carousel-item" data-bs-interval="100000">
                                <AssignForm assign = {data} handleClose = {handleClose} setFirst = {setFirstOpt}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                
                            </div>
                        
                            <div className="col">
                                <div className="d-flex justify-content-end">
                                        
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                    
                                </div>

                                
                            </div>
                        </div>
                        <Row>
                            <Col>
                                <div className="d-flex justify-content-end mb-2"> 
                                    <Button variant="secondary" onClick={handleClose} className="close-button me-4">
                                        Cerrar
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    
                    
                </Modal.Body>
            </Modal>
        </>
    );
  }
    