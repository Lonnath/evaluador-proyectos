import React, {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
export default function EraseProject ({data}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="outline-danger" className="w-50" onClick={handleShow} disabled={data}>
                Eliminar
            </Button>
    
            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                        <Modal.Title>Eliminar Proyecto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Esta seguro que desea realizar esta acción?, es irreversible.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button variant="danger" onClick={handleClose}>ELIMINAR</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
  }