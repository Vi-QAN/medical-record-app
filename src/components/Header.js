import React from "react";
import { Navbar, Container, Nav, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HeaderStyle.css';

export default function Header({setShowModal}) {
    return (
        <Navbar 
            collapseOnSelect  
            expand="lg" 
            className="header-wrapper">
            <Container>
                <Navbar.Brand href="#home">Diagnose</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="link-wrapper me-auto">
                        <Nav.Link className="link" href="#home">Home</Nav.Link>
                        <Nav.Link className="link" href="#home">About</Nav.Link>
                        <Nav.Link className="link" href="#home">Contact</Nav.Link>
                    </Nav>
                    <Nav>
                        <Button onClick={() => setShowModal(true)} className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 20 20">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            </svg> Sign in</Button>
                    </Nav>
                </Navbar.Collapse>
                </Container>
        </Navbar>
    )
}