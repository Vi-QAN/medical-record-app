import React, { useState } from 'react';
import { Button, Nav, Form } from 'react-bootstrap';
import url from '../constants/link';
import { Formik } from 'formik';
import * as Yup from 'yup';

function DoctorForm({setModal}){
    const practiceOptions = ['In house', 'In hosptial'];
    const registerSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required(),
        password: Yup.string().min(5, 'Too Short!').required(),
        fullName: Yup.string().required(),
        registration: Yup.string().required(),
        practice: Yup.string().required(),
    })

    const onDoctorRegister = (values) => {
        fetch(url + "/register/doctor", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then((res) => res.json())
        .then(result => {
            console.log('Success: ',result);
        })
    }

    return (
        <Formik
            validationSchema={registerSchema}
            onSubmit={(values) => onDoctorRegister(values)}
            initialValues={{
                email: '',
                password: '',
                fullName: '',
                registration: '',
                practice: '',
            }}
            >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
            <Form className='form' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationFormik01">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isValid={touched.email && !errors.email}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback>Valid</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="validationFormik02">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback>Valid</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="validationFormik03">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter full name"
                        name='fullName'
                        value={values.fullName}
                        onChange={handleChange}
                        isValid={touched.fullName && !errors.fullName}
                        isInvalid={!!errors.fullName}
                    />
                    <Form.Control.Feedback>Valid</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationFormik04">
                    <Form.Label>Registration</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter registration number"
                        name='registration'
                        value={values.registration}
                        onChange={handleChange}
                        isValid={touched.registration && !errors.registration}
                        isInvalid={!!errors.registration}/>
                    <Form.Control.Feedback>Valid</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.registration}</Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="validationFormik05">
                    <Form.Label>Practice</Form.Label>
                    
                    <Form.Select
                        itemType='text'
                        placeholder='Select practice'
                        name='practice'
                        onChange={handleChange}
                        isValid={touched.practice && !errors.practice}
                        isInvalid={!!errors.practice}>
                        {practiceOptions.map((option) => {
                            return (
                                <option>{option}</option>
                            )
                        })}
                    </Form.Select>

                </Form.Group>
                    
                
                <Nav className='link-wrapper'>
                    <Nav.Link className='link' onClick={() => setModal(true,'Login')}>Already have an account?</Nav.Link>
                </Nav>

                <Button className='btn' type="submit">
                    Register
                </Button>
            </Form>
            )}
        </Formik>
    )
}

function PatientForm(){
    const onPatientRegister = (values) => {
        fetch(url + "/register/Patient", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then((res) => res.json())
        .then(result => {
            console.log('Success: ',result);
        })
    }

}

export default function RegisterModal({setModal}){
    const [userRole, setUserRole] = useState('');
    const ROLES = {
        DOCTOR: 'doctor',
        PATIENT: 'patient',
    }
    React.useEffect(() => {
        setUserRole(ROLES.DOCTOR);
    },[])

    return (
        <React.Fragment>
            <Nav className="mb-3" variant="tabs" defaultActiveKey="doctor" onSelect={(eventKey) => setUserRole(eventKey)}>
                <Nav.Item>
                    <Nav.Link eventKey={ROLES.DOCTOR}>Doctor</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={ROLES.PATIENT}>Patient</Nav.Link>
                </Nav.Item>
            </Nav>
            {userRole === ROLES.DOCTOR ? <DoctorForm setModal={setModal} /> : <PatientForm setModal={setModal}/> }
            
        </React.Fragment>
        
    )
}