import React from "react";
import {Button, Form, Alert} from 'react-bootstrap';
import SpinnerComponent from '../spinner/SpinnerComponent.jsx';
import API from '../../services/Api'
export default class LoginFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
            alerta : "",
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
        const data = {
            email : this.state.email,
            password : this.state.password,
        }
        event.preventDefault(); 
        this.setState({loading:false}); 
        setTimeout(() => {
            API.post('/api/login', data).then(
                response => {
                    response.data.CODE === 2 ? this.setState({alerta : <Alert variant={response.data.CODE === 2 ? "warning" : ""}>{response.data.MESSAGE}</Alert>, loading : true}) : console.log();
                    const datos = JSON.parse(response.data.DATA)
                    if(response.data.CODE===1){
                        sessionStorage.setItem('sesion', response.data.DATA);
                        if(datos.tipo_usuario === 1){
                            window.location = '/Admin';
                        }else if(datos.tipo_usuario === 2){
                            window.location = "/User";
                        }else if(datos.tipo_usuario === 3){
                            window.location = "/Evaluator";
                        }
                    }
                
            }
                
            );
        }, 2000);
        
        
        event.preventDefault(); 
    }
    render() {
      return (
        <div className="d-block">
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mx-1 my-3 control" controlId="formBasicEmail">
                    <Form.Label><strong>Email:</strong></Form.Label><span className="point mx-2">«</span>
                    <Form.Control type="email" className="form-control"  name="email" value={this.state.email} onChange={this.handleInputChange} maxLength="100" required/>
                </Form.Group>
                <Form.Group className="mx-1 my-3 control">
                    <Form.Label><strong>Contraseña:</strong></Form.Label><span className="point mx-2">«</span>
                    <Form.Control type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleInputChange} required/>
                </Form.Group>
                <div className="d-flex justify-content-end mb-2"> 
                    <a href="/RecoveryAccount" className="mx-2 mt-1"> Olvidaste tu contraseña </a>
                    <Button variant="success mx-2" className="close-button" type="submit">
                        Acceder
                    </Button>
                    <a href="/RegisterUser" variant="primary" className="btn btn-primary">
                        Registrarse
                    </a>
                </div>
                <div id ="alerta" className="mt-3">
                    {
                        this.state.loading ? this.state.alerta : <div className="d-flex justify-content-center"><SpinnerComponent /></div> 
                    }
                </div>
            </Form>
        </div>
      );
    }
  }