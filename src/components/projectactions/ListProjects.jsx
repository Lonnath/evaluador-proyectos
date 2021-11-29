import React from "react";
import { Table } from "react-bootstrap";
import File from '../../images/file.png';
import ModifyProject from "./ModifyProject";
import EraseProject from "./EraseProject";
import ModalEvaluaciones from "./ModalEvaluaciones";
import API from '../../services/Api'
export default class ListProjects extends React.Component{
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
        API.post('/api/proyectos/consultar_proyectos', datos).then(
                response => {
                    this.setState({data:JSON.parse(response.data.DATA), loading : true});
                }
        );
        
    }
    componentDidUpdate(){
        this.consultar();
    }
    render(){ 
        return(
            <>
                <div className="mx-5">
                    <h1>
                        Proyectos {this.state.admin ? "Disponibles" : "Creados"}
                    </h1>

                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Autores</th>
                                <th>Estado</th>
                                {this.state.admin ? <th>Evaluacion</th> : <></>}
                                <th>Fecha Proyecto</th>
                                <th>Archivos</th>
                                <th>Acciones</th>
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
                                                <td>{item.estado}</td>
                                                {this.state.admin ? <th><ModalEvaluaciones data={item} /></th> : <></>}
                                                <td>{item.fecha_creacion}</td>
                                                <td><img src={File} alt="" width="30" /></td>
                                                <td>
                                                    <ModifyProject data = {item} disabled = {this.state.admin ? false : item.num_estado === 2 ? false : true} />
                                                    <EraseProject data = {item} disabled = {this.state.admin ? false : item.num_estado === 2 ? false : true} />
                                                </td>
                                            </tr>

                                        ))
                                    :   
                                        <tr>
                                            <td colSpan={this.state.admin?"7":"6"}>
                                                No existen registros.
                                            </td>
                                            
                                        </tr>
                                :
                                
                                    <tr>
                                        <td colSpan={this.state.admin?"7":"6"}>
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