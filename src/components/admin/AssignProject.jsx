import React, {useState, useEffect} from "react";
import { Table } from "react-bootstrap";
import File from '../../images/file.png';
import AssignComponent from './AssignComponent';
import API from '../../services/Api'
export default class ListAssign extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            admin: props.admin,
            data : "",
            loading : false,
        };      
        this.consultar();  
    }
    consultar (){
        let datos = {
            user : JSON.parse(sessionStorage.getItem('sesion')).id,
        }
        setTimeout(()=>{
            API.post('/api/proyectos/consultar_proyectos_evaluar', datos).then(
                response => {
                    this.setState({data:JSON.parse(response.data.DATA), loading : true});
                }
            )
        },2000)
        
    }
    componentDidUpdate(){
        this.consultar();
    }

    render(){
        return(
            <>
                <div className="mx-5">
                    <h1>
                        Proyectos Por Asignar
                    </h1>

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
                                                    <AssignComponent data = {item}></AssignComponent>
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