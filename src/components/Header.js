import React from "react";
import { Navbar, Container, Nav, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HeaderStyle.css';

export default function Header() {
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
                        
                        <Button className="btn">Sign in</Button>
                    </Nav>
                </Navbar.Collapse>
                </Container>
        </Navbar>
    )
}