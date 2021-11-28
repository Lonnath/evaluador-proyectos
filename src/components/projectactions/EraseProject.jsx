import React, {useState, useEffect} from 'react'
import {Button, Alert, Modal} from 'react-bootstrap';
import SpinnerComponent from '../spinner/SpinnerComponent.jsx';
import API from '../../services/Api'
export default function EraseProject ({data, disabled}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(true);
    const [alerta, setAlerta] = useState("");
    const [boton, setBoton] = useState("boton"+data.id_proyecto+"erase");
    useEffect(
        function boton_funcion (){
            if(disabled){
                document.getElementById(boton).disabled = true;
            }else{
                document.getElementById(boton).disabled = false;
            }
        }
    );
    const eliminar = () => {
        setLoading(false);
        let datos = {
            id_proyecto: data.id_proyecto,
            id_user: JSON.parse(sessionStorage.getItem('sesion')).id,
        };
        API.post('/api/proyectos/eliminar_proyectos', datos).then(
            (response) => {
                    setAlerta(<Alert variant={response.data.CODE === 1 ? 
                        "success" : "warning"} className="vanish">{response.data.MESSAGE}</Alert>)
                    setLoading(true)

                    setTimeout(
                        () => {
                            setAlerta("");
                            handleClose();
                        }
                    , 4000);
                
            }
        ) 
    }
    return (
        <>
            <Button id = {boton} variant={disabled? "outline-danger" :  "danger"} className="w-50 mr-2" onClick={handleShow} >
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
                <div id ="alerta" className="mx-5">
                    {
                        loading ? alerta : <div class="d-flex justify-content-center mb-2"><SpinnerComponent /></div>
                    }
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button variant="danger" onClick={eliminar}>ELIMINAR</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
  }