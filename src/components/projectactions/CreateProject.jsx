import React from "react";
import {Button, Form, Alert, Row, Col} from 'react-bootstrap';
import SpinnerComponent from '../spinner/SpinnerComponent.jsx';
import API from '../../services/Api'
export default class CreateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            keysword : "",
            resumen : "",
            topic : "",
            file : "",
            alert : "",
            loading : true,
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
        let today = new Date();
        const timenow = String(today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + today.getDate()).padStart(2, '0');
        const data = {
            title: this.state.title,
            keysword : this.state.keysword,
            resumen : this.state.resumen,
            topic : this.state.topic,
            autor : JSON.parse(sessionStorage.getItem('sesion')).id,
            file : this.state.file,
            now : timenow,
        }
        this.setState({loading:false}); 
        API.post('/api/proyectos/postular_proyecto', data).then(
                response => this.setState({alerta : <Alert variant={response.data.CODE === 1 ? 
                    "success" : "warning"} className="vanish">{response.data.MESSAGE}</Alert>, loading : true})
            ) 
        
        
        event.preventDefault(); 
    }
    render() {
      return (
        <div className="d-block w-50 mx-auto">
            <Row className="border-bottom">
                <Col>
                    <span className="font-32">
                        Postular Proyecto
                    </span> 
                </Col>
            </Row>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mx-1 my-3">
                    <Form.Label>Titulo:</Form.Label>
                    <Form.Control type="text" className="form-control"  name="title" value={this.state.title} onChange={this.handleInputChange} maxLength="100" required/>
                </Form.Group>
                <Form.Group className="mx-1 my-3">
                    <Form.Label>Palabras Clave:</Form.Label>
                    <Form.Control type="text" className="form-control"  name="keysword" value={this.state.keysword} onChange={this.handleInputChange} maxLength="100" required/>
                </Form.Group>
                <Form.Group className="mx-1 my-3">
                    <Form.Label>Resumen:</Form.Label>
                    <Form.Control type="text" className="form-control"  name="resumen" value={this.state.resumen} onChange={this.handleInputChange} maxLength="100" required/>
                </Form.Group>
                <Form.Group className="mx-1 my-3">
                    <Form.Label>tópico:</Form.Label>
                    <Form.Control type="text" className="form-control"  name="topic" value={this.state.topic} onChange={this.handleInputChange} maxLength="100" required/>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Cargar documentacion del proyecto</Form.Label>
                        <Form.Control type="file" name="file" value={this.state.file} onChange={this.handleInputChange} />
                </Form.Group>
                
                <div id ="alerta">
                    {
                        this.state.loading ? this.state.alerta : <div class="d-flex justify-content-center mb-2"><SpinnerComponent /></div>
                    }
                </div>
                <div className="d-flex justify-content-end mb-2"> 
                    <Button variant="success mx-2" className="close-button" type="submit">
                        Postular
                    </Button>
                </div>
            </Form>
        </div>
      );
    }
  }