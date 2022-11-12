import React from 'react';
import { Button, Nav, Form } from 'react-bootstrap';
import url from '../constants/link';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function LoginModal({setModal}){
    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required')
    })

    const onLogin = (values) => {
        fetch(url + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values),
        }).then((response) => response.json())
        .then((result) => {
          console.log('Success:', result);
        }).catch(error => console.log())
    }

    return (
        <Formik
            validationSchema={loginSchema}
            onSubmit={values => console.log("Submitted" + values.email + values.password)}
            initialValues={{
                email: '',
                password: ''
            }}>
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
                <Form noValidate onSubmit={handleSubmit} className='form'>
                    <Form.Group className="mb-3" controlId="validationFormik01">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isValid={touched.email && !errors.email}
                            isInvalid={!!errors.email}
                            placeholder="Enter email" />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="validationFormik02">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="password"
                            onChange={handleChange}
                            isValid={touched.password && !errors.password}
                            isInvalid={!!errors.password}
                            placeholder="Enter password" />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Nav className='link-wrapper'>
                        <Nav.Link className="link" onClick={() => setModal(false,'Register')}>Create an account?</Nav.Link>
                    </Nav>
                    <Button className='btn' type="submit">
                        Login
                    </Button>
                </Form>
            )}

        </Formik>

        
    )
}