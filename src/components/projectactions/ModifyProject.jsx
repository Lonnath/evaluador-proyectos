import React, {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import ModifyProjectForm from "./ModifyProjectForm"
export default function ModifyProject ({id_proyecto}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="outline-warning" className="w-50" onClick={handleShow} >
                Modificar
            </Button>
    
            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                        <Modal.Title>Modificar Proyecto </Modal.Title>
                </Modal.Header>
            
                <Modal.Body>
                    <ModifyProjectForm handleClose = {handleClose} />
                </Modal.Body>
            </Modal>
        </>
    );
  }