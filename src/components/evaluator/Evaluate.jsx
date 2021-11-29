import React, {useEffect, useState} from "react";
import Notifications from './Notifications';
import { Table, Row, Col} from "react-bootstrap";
import File from '../../images/file.png';
import EvalComponent from './EvalComponent';
import API from '../../services/Api'
export default class Evaluate extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            notificacion: false,
            loading : false,
            data: {},
        };      
             
        this.consultar();  
    }
    consultar (){
        const datos = {
            user : JSON.parse(sessionStorage.getItem('sesion')).id,
        }
        API.post('/api/consultar_evaluaciones_evaluador', datos).then(
            response => {
                if(this.state.data.length!=JSON.parse(response.data.DATA).length){
                    this.state.notificacion = true;
                }
                this.setState({data:JSON.parse(response.data.DATA), loading : true});
            }
        )
        
    }
    componentDidUpdate(){
        this.consultar();
        if(this.state.notificacion===true){
            this.state.notificacion=false;
        }
    }

    render(){ 
        return(
            <>
                <div className="mx-5">
                    <Row>
                        <Col>
                            <h1>
                                Proyectos Por Asignar
                            </h1>
                            <div>
                                { this.state.notificacion ? <Notifications bool={this.state.notificacion} /> : <></>}
                            </div>
                            
                        </Col>
                    </Row>

                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Nombre Proyecto</th>
                                <th>Autor</th>
                                <th>Fecha Proyecto</th>
                                <th>Archivos</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.loading ?
                                    this.state.data.length > 0 ? 
                                        this.state.data.map(item => (
                                            <tr >
                                                <td>{item.titulo}</td>
                                                <td>{item.autor}</td>
                                                <td>{item.fecha_creacion}</td>
                                                <td><img src={File} alt="" width="30" /></td>
                                                <td>
                                                    <EvalComponent data = {item} />
                                                </td>
                                            </tr>

                                        ))
                                    :   
                                        <tr>
                                            <td colSpan="5">
                                                No existen registros.
                                            </td>
                                            
                                        </tr>
                                :
                                
                                    <tr>
                                        <td colSpan="5">
                                            Cargando...
                                        </td>
                                    </tr>
                                    
                            }
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }
}