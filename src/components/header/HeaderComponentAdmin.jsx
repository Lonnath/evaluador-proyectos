import React from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';
import Close from '../../services/close'
export default function HeaderComponentAdmin(){
    const cerrar = () => {
        new Close();
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                        <Navbar.Brand href="/">Evaluador Proyectos</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Nav>
                                <a href="/Admin" className="text-sha btn btn-dark text-start">Inicio</a>
                                <a href="/AssignProjects" className="text-sha btn btn-dark text-start">Asignar Proyectos</a>
                                <div onClick={cerrar} className="text-sha btn btn-dark text-start">Cerrar Sesion</div>
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}