import React, {useState, useEffect} from 'react'
import {Button, Modal} from 'react-bootstrap'
import ModifyProjectForm from "./ModifyProjectForm"
export default function ModifyProject ({data, disabled}){
    const [show, setShow] = useState(false);
    const [boton, setBoton] = useState("boton"+data.id_proyecto+"modify");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(
        
        function boton_funcion (){
            if(disabled){
                document.getElementById(boton).disabled = true;
            }else{
                document.getElementById(boton).disabled = false;
            }
        }
    );
    return (
        <>
            <Button id = {boton} variant={disabled ? "outline-warning" : "warning"} className="btn-per mr-2" onClick={handleShow}>
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
                    <ModifyProjectForm handleClose = {handleClose} data = {data}/>
                </Modal.Body>
            </Modal>
        </>
    );
  }