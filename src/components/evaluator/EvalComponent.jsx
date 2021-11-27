import React, {useState} from 'react'
import {Button, Modal, Table} from 'react-bootstrap'
import EvalForm from './EvalForm';
export default function EvalComponent ({evalData}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="outline-success" className="w-100" onClick={handleShow}>
                Evaluar
            </Button>
    
            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                        <Modal.Title>Información de Proyecto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover size="sm">
                        
                        <tbody>
                            <tr>
                                <td><strong>Nombre Proyecto : </strong></td>
                                <td>Proyecto Nombre Ejemplo</td>
                            </tr>
                            <tr>
                                <td><strong>Autor : </strong></td>
                                <td>Autor Nombre Ejemplo</td>
                            </tr>
                        </tbody>
                    </Table>
                    <EvalForm eval = "123" handleClose = {handleClose} />
                </Modal.Body>
            </Modal>
        </>
    );
  }
    