import React from 'react'
import {Button, Form, Alert} from 'react-bootstrap'
import SpinnerComponent from '../spinner/SpinnerComponent.jsx';
import API from '../../services/Api'
export default class ModifyProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            keysword : "",
            resumen : "",
            topic : "",
            autor : "",
            file : "",
            alert : "",
            loading : true,
            handleClose : props.handleClose,
            id_proyecto : props.id_proyecto,
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
        const data = {
            id_proyecto : this.state.id_proyecto,
            title: this.state.title,
            keysword : this.state.keysword,
            resumen : this.state.resumen,
            topic : this.state.topic,
            autor : JSON.parse(sessionStorage.getItem('sesion')).user_id,
            file : this.state.file,
        }
        this.setState({loading:false}); 
        setTimeout(() => {
            API.post('/api/proyectos/modificar_proyectos_autor', data).then(
                response => this.setState({alerta : <Alert variant={response.data.CODE === 1 ? 
                    "success" : "warning"}>{response.data.MESSAGE}</Alert>, loading : true})
            ) 
        }, 1000);
        
        
        event.preventDefault(); 
    }
    render() {
      return (
        <div className="d-block w-100 mx-auto">
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
                <Form.Group className="mx-1 my-3">
                    <Form.Label>Autores:</Form.Label>
                    <Form.Control type="text" className="form-control"  name="autor" value={this.state.autor} onChange={this.handleInputChange} maxLength="100" required/>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Cargar documentacion del proyecto</Form.Label>
                        <Form.Control type="file" name="file" value={this.state.file} onChange={this.handleInputChange} />
                    </Form.Group>
                <div className="d-flex justify-content-end mb-2"> 
                    <Button variant="secondary" onClick={this.state.handleClose} className="close-button me-4">
                        Cerrar
                    </Button>
                    <Button variant="warning mx-2" className="close-button" type="submit">
                        Modificar
                    </Button>
                </div>
                <div id ="alerta" className="mt-3">
                    {
                        this.state.loading ? this.state.alert : <div className="d-flex justify-content-center"><SpinnerComponent /></div> 
                    }
                </div>
            </Form>
        </div>
      );
    }
  }