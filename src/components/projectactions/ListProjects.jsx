import React, {useState, useEffect} from "react";
import { Table, Alert} from "react-bootstrap";
import File from '../../images/file.png';
import ModifyProject from "./ModifyProject";
import EraseProject from "./EraseProject";
import API from '../../services/Api'
export default function ListProjects({admin}){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(
        function consultar(){
            let datos = {

            }
            if(admin){
                datos = {
                    user : JSON.parse(sessionStorage.getItem('sesion')).email,
                }
            }else{
                datos = {
                    user : JSON.parse(sessionStorage.getItem('sesion')).id,
                }
            }
            setTimeout(()=>{
            
            admin ?
                API.post('/api/proyectos/consultar_proyectos_admin', datos).then(
                    response => {
                        setData(JSON.parse(response.data.DATA))
                        setLoading(true)
                    }
                ) 
                :
                API.post('/api/proyectos/consultar_proyectos_autor', datos).then(
                    response => {
                        setData(JSON.parse(response.data.DATA))
                        setLoading(true)
                    }
                )
            },1000)
            
        }
    );
    return(
        <>
            <div className="mx-5">
                <h1>
                    Proyectos {admin ? "Disponibles" : "Creados"}
                </h1>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Autores</th>
                            <th>Estado</th>
                            {admin ? <th>Evaluacion</th> : <></>}
                            <th>Fecha Proyecto</th>
                            <th>Archivos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ?
                                data.length > 0 ? 
                                    data.map(item => (
                                        <tr >
                                            <td>{item.titulo}</td>
                                            <td>{item.autor}</td>
                                            <td>{item.estado}</td>
                                            <td>No Evaluada</td>
                                            <td>{item.fecha_creacion}</td>
                                            <td><img src={File} alt="" width="30" /></td>
                                            <td><ModifyProject id_proyecto = {item.id_proyecto} /></td>
                                        </tr>

                                    ))
                                :   
                                    <tr>
                                        <td colSpan={admin?"7":"6"}>
                                            No existen registros.
                                        </td>
                                        
                                    </tr>
                            :
                            
                                <tr>
                                    <td colSpan={admin?"7":"6"}>
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