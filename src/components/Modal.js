import React, { useState } from 'react';
import { Modal, Form, Button, Nav } from 'react-bootstrap';
import url from '../constants/link'

import '../styles/ModalStyle.css';

export default function LoginModal({showModal, setShowModal}) {
    const [loginMode, setLoginMode] = useState(true);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState();
    const [error,setError] = useState();
    

    const onLogin = () => {
        const credential = {
            email: email,
            password: password,
            role: role,
        }
        fetch(url + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credential),
        }).then((response) => response.json())
        .then((result) => {
          console.log('Success:', result);
        }).catch(error => console.log())
    }

    const onDoctorRegister = () => {

    }

    const onPatientRegister = () => {

    }

    return (
        <React.Fragment>
            <Modal 
            
                show={showModal}
                dialogClassName="modal-90w"
                onHide={() => setShowModal(false)}
                centered={true}
                >
                <Modal.Header closeButton>
                    {loginMode ? 
                    <Modal.Title className="title" id="example-custom-modal-styling-title">
                        Login
                    </Modal.Title>
                    :
                    <Modal.Title className="title" id="example-custom-modal-styling-title">
                        Register
                    </Modal.Title> }
                    
                </Modal.Header>
                <Modal.Body className='form-wrapper'>
                    {loginMode ? 
                    <Form className='form'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Nav className='link-wrapper'>
                            <Nav.Link className="link" onClick={() => setLoginMode(false)}>Create an account?</Nav.Link>
                        </Nav>
                        <Button className='btn' type="submit">
                            Login
                        </Button>
                    </Form>
                    :
                    <Form className='form'>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required="true"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required="true"/>
                        </Form.Group>
                        <Nav className='link-wrapper'>
                            <Nav.Link className='link' onClick={() => setLoginMode(true)}>Already have an account?</Nav.Link>
                        </Nav>
                        <Button className='btn' type="submit">
                            Register
                        </Button>
                    </Form>
                }
                </Modal.Body>
            </Modal>
        </React.Fragment>

    )
}