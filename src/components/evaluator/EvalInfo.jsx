import React from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap'
export default function EvalInfo ({data, handleClose}){
    return (
        <>
           
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
            <Row className="my-5">
                <Col>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="close-button me-4">
                            Cerrar
                        </Button>
                    </div>
                </Col>
            </Row>
                            
        </>
    );
}