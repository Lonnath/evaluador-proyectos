import React, {useState, useEffect} from 'react'
import File from '../../images/file.png';
import { Button, Modal, Table, Container } from 'react-bootstrap'
import API from '../../services/Api';
export default function ModalEvaluaciones ({data}){
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [evaluaciones, setEvaluaciones] = useState({});
    useEffect(
        function consultar () {
            let datos = {
                user : JSON.parse(sessionStorage.getItem('sesion')).id,
                proyecto_id : data.id_proyecto,  
            }
            API.post('/api/consultar_evaluaciones', datos).then(
                (response) => {
                    setEvaluaciones(JSON.parse(response.data.DATA));
                    setLoading(true);
                }
            );
        }
    );
    return (
        <>
            <Button variant="outline-info" className="w-100" onClick={handleShow}>
                Evaluaciones
            </Button>
    
            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header>
                        <Modal.Title>Evaluaciones Proyecto: {data.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Evaluador</th>
                                    <th>Fecha Evaluación</th>
                                    <th>Observación</th>
                                    <th>Archivo</th>
                                    <th>Evaluación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ?
                                        evaluaciones.length > 0 ? 
                                            evaluaciones.map(item => (
                                                <tr >
                                                    <td>
                                                        {item.evaluador}
                                                    </td>
                                                    <td>
                                                        {item.fecha_reporte}
                                                    </td>
                                                    <td>
                                                        {item.observacion}
                                                    </td>
                                                    <td>
                                                        <img src={File} alt="" width="30" />
                                                    </td>
                                                    <td>
                                                        {item.evaluacion}
                                                    </td>
                                                </tr>

                                            ))
                                        :   
                                            <tr>
                                                <td colSpan="6">
                                                    No existen registros.
                                                </td>
                                                
                                            </tr>
                                    :
                                    
                                        <tr>
                                            <td colSpan="6">
                                                Cargando...
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </Table>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}