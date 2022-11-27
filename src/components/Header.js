import React from "react";
import { Navbar, Container, Nav, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HeaderStyle.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom'

export default function Header({setShowModal, isMain, isDoctor, isPatient, id}) {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = React.useState(false);

    const onLogout = () => {
        // navigate back to home page
        navigate('/');

        // remove token
        localStorage.removeItem('token');
    }

    React.useEffect(() => {
        const id = localStorage.getItem('id');
        if (id) setIsLogin(true);
    },[])

    return (
        
            <Navbar 
                collapseOnSelect  
                expand="lg" 
                className="header-wrapper">
                <Container>
                    <Navbar.Brand href="/">Diagnose</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {(isMain || isPatient) && <Nav className="link-wrapper me-auto">
                            <Nav.Link className="link" href="/">Home</Nav.Link>
                            <Nav.Link className="link" href="/about">About</Nav.Link>
                            <Nav.Link className="link" href="/contact">Contact</Nav.Link>
                        </Nav>}
                        {isDoctor && <Nav className="link-wrapper me-auto">
                            <Nav.Link className="link" href="/">Home</Nav.Link>
                            <Nav.Link className="link" href="/notification">Notification</Nav.Link>
                        </Nav>}
                        <Nav>
                            {isMain && !isLogin && <Button onClick={() => setShowModal(true)} className="btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 20 20">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                </svg> Sign in</Button>}
                            {(isDoctor || isPatient || isLogin) && 
                                <DropdownButton
                                    title={id}
                                    style={{width: '100%'}}
                                >
                                    <Dropdown.Item eventKey="4" onClick={onLogout}>Logout</Dropdown.Item>
                                </DropdownButton>}
                            
                            
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
            </Navbar>
    )
}