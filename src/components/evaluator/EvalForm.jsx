import React from "react";
import {Row, Col, Button, Form, Alert} from 'react-bootstrap';
import SpinnerComponent from '../spinner/SpinnerComponent.jsx';
import API from '../../services/Api';
export default class AssignForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            observaciones : "",
            archivo : "",
            evaluacion: 0,
            handleClose : props.handleClose,
            alerta : undefined,
            loading : true,
            data:  props.data ? props.data : "",
        };
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
        const informacion = {
            user: JSON.parse(sessionStorage.getItem('sesion')).id,
            proyecto: this.state.data.id_proyecto,
            evaluacion: this.state.evaluacion,
            observaciones: this.state.observaciones,
            archivo: this.state.archivo,
        }
        this.setState({loading:false}); 
        API.post('api/evaluar_proyecto_evaluador', informacion).then(
                (response) => {
                    this.setState({alerta : <Alert variant={response.data.CODE === 1 ? 
                    "success" : "warning"} className={response.data.CODE===1?"vanish" : ""}>{response.data.MESSAGE}</Alert>, loading : true})
                    setTimeout(()=>{
                        if(response.data.CODE===1){
                            this.setState({alerta:""})
                        }
                    }, 4000);
                }
            )
        
        event.preventDefault(); 
    }
    render() {
        return (
            <div>
                <Row className="border-bottom">
                    <Col>
                        <span className="font-32">
                            Formulario de Evaluación
                        </span> 
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Observaciones</Form.Label>
                        <Form.Control as="textarea" rows={3} name="observaciones" value={this.state.observaciones} onChange={this.handleInputChange} />
                    </Form.Group>
                    
                    <Row>
                        <Col>
                            <Form.Group controlId="formFile" className="my-2">
                                <Form.Label>Cargar soportes de evaluación.</Form.Label>
                                <Form.Control type="file" name="archivo" value={this.state.archivo} onChange={this.handleInputChange}  />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mx-1 my-2">
                                <Form.Label>Evaluacion:</Form.Label>
                                <Form.Control size="sm" as="select" name="evaluacion" value={this.state.evaluacion} onChange={this.handleInputChange} >
                                    <option value="0">No evaluar</option>
                                    <option value="1">Aceptado</option>
                                    <option value="2">Rechazado</option>
                                    <option value="3">Devuelto</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <div id ="alerta">
                        {
                            this.state.loading ? this.state.alerta : <div class="d-flex justify-content-center mb-2"><SpinnerComponent /></div>
                        }
                    </div>
                    <Row className="my-5">
                        <Col>
                            <div className="d-flex justify-content-end">

                                <Button variant="success" className="close-button me-3" type="submit">
                                    Asignar
                                </Button>
                                <Button variant="secondary" onClick={this.state.handleClose} className="close-button me-4">
                                    Cerrar
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
