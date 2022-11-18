import React, { useState } from 'react';
import { Button, Nav, Form, Spinner } from 'react-bootstrap';
import url from '../constants/link';
import { Formik } from 'formik';
import * as Yup from 'yup';

function DoctorForm({setModal, setInfo}){
    // message from server
    const [ message, setMessage] = useState();

    // submission status
    const [ submitting, setSubmitting] = useState(false);

    // available practices list
    const practiceOptions = ['Please choose an option','In house', 'In hosptial'];

    // 
    React.useEffect(() => {
        if (message?.id){
            setInfo(message)
        }
    },[message])

    // validation schema
    const registerSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required(),
        password: Yup.string().min(5, 'Too Short!').required(),
        fullName: Yup.string().required(),
        registration: Yup.string().required(),
        practice: Yup.string().required(),
    })


    const onDoctorRegister = (values) => {
        setSubmitting(true);
        fetch(url + "/register/doctor", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then((res) => res.json())
        .then(result => {
            // set response message
            setMessage(result);
            console.log(message);

            
            
        })
        .catch(err => console.log(err))
        .finally(() => {
            // submission status
            setSubmitting(false)
        });
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
                        isInvalid={!!errors.email || message?.errorEmail}
                        disabled={submitting}
                    />
                    {/* trigger when there is an response */}
                    {message?.errorEmail && <Form.Control.Feedback type="invalid">{message.message}</Form.Control.Feedback>}
                    {!message && <Form.Control.Feedback>Valid</Form.Control.Feedback> }
                    {!message && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> }
                    
                
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
                        disabled={submitting}
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
                        disabled={submitting}
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
                        isInvalid={!!errors.registration || message?.errorReg}
                        disabled={submitting}
                    />
                    {message?.errorReg && <Form.Control.Feedback type="invalid">{message.message}</Form.Control.Feedback>}
                    {!message && <Form.Control.Feedback>Valid</Form.Control.Feedback>}
                    {!message && <Form.Control.Feedback type="invalid">{errors.registration}</Form.Control.Feedback>}
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="validationFormik05">
                    <Form.Label>Practice</Form.Label>
                    
                    <Form.Select
                        itemType='text'
                        placeholder='Select practice'
                        name='practice'
                        onChange={handleChange}
                        isValid={touched.practice && !errors.practice}
                        isInvalid={!!errors.practice}
                        disabled={submitting}>
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

                <Button disabled={submitting} className='btn' type="submit">
                    {submitting && <Spinner as="span" animation='grow' size="sm" role="status" aria-hidden="true" /> }
                    {submitting ? "Submitting" : "Register"}
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

export default function RegisterModal({setModal, setInfo}){
    
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
            {userRole === ROLES.DOCTOR ? <DoctorForm setModal={setModal} setInfo={setInfo}/> : <PatientForm setModal={setModal}/> }
            
        </React.Fragment>
        
    )
}