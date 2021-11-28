import React from "react";
import {Row, Col, Button, Form, Alert} from 'react-bootstrap';
import SpinnerComponent from '../spinner/SpinnerComponent.jsx';
import API from '../../services/Api';
export default class AssignForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            observaciones : "",
            evaluacion : "",
            archivo : undefined,
            evaluator : "",
            handleClose : props.handleClose,
            evaluadores : {},
            alerta : undefined,
            loading : true,
            setFirstOpt : props.setFirstOpt,
        };
        const datos = {
            id_admin : JSON.parse(sessionStorage.getItem('sesion')).id,
        }
        API.post('api/consultar_evaluadores', datos).then(
            (response) => {
                this.setState({evaluadores:response.data.DATA})
            }
        );
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
  
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        let today = new Date();
        const now = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
        const data = {
            observaciones : this.state.observaciones,
            evaluacion : this.state.evaluacion,
            archivo : this.state.archivo,
            evaluator : this.state.evaluator,
        }
        
        this.setState({loading:false});  
        setTimeout(() => {
            this.setState({alerta:<Alert key="alert" variant="success">
                Evaluación Realizada con exito.
              </Alert>})
            this.setState({loading:true});
            this.state.setFirstOpt();

        }, 2000);
        event.preventDefault();    
    }
    render() {
        return (
            <div>
                <Row className="border-bottom">
                    <Col>
                        <span className="font-32">
                            Formulario de Asignación - Evaluación
                        </span> 
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Observaciones</Form.Label>
                        <Form.Control as="textarea" rows={3} name="observaciones" value={this.state.observaciones} onChange={this.handleInputChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="my-2">
                        <Form.Label>Cargar documentacion con las correcciones del proyecto</Form.Label>
                        <Form.Control type="file" name="archivo" value={this.state.archivo} onChange={this.handleInputChange}  />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mx-1 my-2">
                                <Form.Label>Evaluacion:</Form.Label>
                                <Form.Control size="sm" as="select" name="evaluacion" value={this.state.evaluacion} onChange={this.handleInputChange} >
                                    <option>Aceptado</option>
                                    <option>Rechazado</option>
                                    <option>Devuelto</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mx-1 my-2">
                                <Form.Label>Evaluador:</Form.Label>
                                <Form.Control size="sm" as="select" name="evaluator " value={this.state.evaluator    } onChange={this.handleInputChange} >
                                {
                                    
                                    this.state.evaluadores.length > 0 ? 
                                        this.state.evaluadores.map(item => (
                                            <option value={item.id}>{item.documento} ~ {item.nombre}</option>
                                        ))
                                    :   <option value="">No Seleccionar</option>
                                        
                                }
                                </Form.Control>
                            </Form.Group>
                        
                        </Col>
                    </Row>
                    
                    <div id ="alerta">
                        {
                            this.state.loading ? this.state.alerta : <div class="d-flex justify-content-center mb-2"><SpinnerComponent /></div>
                        }
                    </div>
                    <div className="d-flex justify-content-end mb-2"> 
                        <Button variant="success" className="close-button" type="submit">
                            Asignar
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}