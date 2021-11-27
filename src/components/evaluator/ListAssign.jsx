import React from "react";
import { Table } from "react-bootstrap";
import File from '../../images/file.png';
import EvalComponent from './EvalComponent';
export default function ListAssign(){
    return(
        <>
            <div>
                <h1>
                    Proyectos Asignados
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
                        <tr>
                            <td>Nombre Prueba #1</td>
                            <td>Mark</td>
                            <td>12/12/12</td>
                            <td>
                                <a href="/" className="w-100">
                                    <div className="w-25 mx-auto">
                                        <img src={File} alt="" width="30" />
                                    </div>
                                </a>
                            </td>
                            <td>
                                <EvalComponent evalData ="" />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre Prueba #2</td>
                            <td>Mark</td>
                            <td>12/12/12</td>
                            <td>
                                <a href="/" className="w-100">
                                    <div className="w-25 mx-auto">
                                        <img src={File} alt="" width="30" />
                                    </div>
                                </a>
                            </td>
                            <td>
                                <EvalComponent evalData ="" />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre Prueba #3</td>
                            <td>Mark</td>
                            <td>12/12/12</td>
                            <td>
                                <a href="/" className="w-100">
                                    <div className="w-25 mx-auto">
                                        <img src={File} alt="" width="30" />
                                    </div>
                                </a>
                            </td>
                            <td>
                                <EvalComponent evalData ="" />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre Prueba #4</td>
                            <td>Mark</td>
                            <td>12/12/12</td>
                            <td>
                                <a href="/" className="w-100">
                                    <div className="w-25 mx-auto">
                                        <img src={File} alt="" width="30" />
                                    </div>
                                </a>
                            </td>
                            <td>
                                <EvalComponent evalData ="" />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre Prueba #5</td>
                            <td>Mark</td>
                            <td>12/12/12</td>
                            <td>
                                <a href="/" className="w-100">
                                    <div className="w-25 mx-auto">
                                        <img src={File} alt="" width="30" />
                                    </div>
                                </a>
                            </td>
                            <td>
                                <EvalComponent evalData ="" />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre Prueba #6</td>
                            <td>Mark</td>
                            <td>12/12/12</td>
                            <td>
                                <a href="/" className="w-100">
                                    <div className="w-25 mx-auto">
                                        <img src={File} alt="" width="30" />
                                    </div>
                                </a>
                            </td>
                            <td>
                                <EvalComponent evalData ="" />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre Prueba #7</td>
                            <td>Mark</td>
                            <td>12/12/12</td>
                            <td>
                                <a href="/" className="w-100">
                                    <div className="w-25 mx-auto">
                                        <img src={File} alt="" width="30" />
                                    </div>
                                </a>
                            </td>
                            <td>
                                <EvalComponent evalData ="" />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre Prueba #8</td>
                            <td>Mark</td>
                            <td>12/12/12</td>
                            <td>
                                <a href="/" className="w-100">
                                    <div className="w-25 mx-auto">
                                        <img src={File} alt="" width="30" />
                                    </div>
                                </a>
                            </td>
                            <td>
                                <EvalComponent evalData ="" />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre Prueba #9</td>
                            <td>Mark</td>
                            <td>12/12/12</td>
                            <td>
                                <a href="/" className="w-100">
                                    <div className="w-25 mx-auto">
                                        <img src={File} alt="" width="30" />
                                    </div>
                                </a>
                            </td>
                            <td>
                                <EvalComponent evalData ="" />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre Prueba #10</td>
                            <td>Mark</td>
                            <td>12/12/12</td>
                            <td>
                                <a href="/" className="w-100">
                                    <div className="w-25 mx-auto">
                                        <img src={File} alt="" width="30" />
                                    </div>
                                </a>
                            </td>
                            <td>
                                <EvalComponent evalData ="" />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}