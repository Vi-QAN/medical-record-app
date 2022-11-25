import React from 'react';
import url from '../constants/link';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, CloseButton, Button } from 'react-bootstrap';
import profileImg from '../assets/profile.jpg';
import Header from '../components/Header';
import ToggleDisplay from '../components/ToggleDisplayBar';
import * as Colors from '../constants/colors';
import { Formik } from 'formik';

// displays patient profile
function PatientProfile({id}){
    const [ profile, setProfile] = React.useState(null);
    const [ message, setMessage] = React.useState(null);
    const [ editing, setEditing] = React.useState(false);
    const [ updating, setUpdating] = React.useState(false);

    const [imageURL, setImageURL] = React.useState(null)

    // read only fields
    const readOnly = ['id','name','dob'];

    React.useEffect(() => {
        fetch(url + '/patient/' + id)
        .then(res => res.json())
        .then(result => {
            const info = {...result, 
                id: result._id, 
                dob: new Date(result.DOB).toLocaleDateString('en-GB',{timeZone: 'UTC'})};
            console.log(info);
            setProfile(info)});
    },[])

    const onUploadImage = (e) => {
        setImageURL(
            URL.createObjectURL(e.target.files[0])
        );
    }

    const onUpdate = (values) => {
        setUpdating(true);

        const update = {
            token: localStorage.getItem('token'),
            email: values.email,
            password: values.password,
            gender: values.gender[0].toUpperCase() + values.gender.substring(1),
            address: values.address,
            image: imageURL,
        }
        // console.log(update)
        fetch(url + '/patient/' + id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(update)
        }).then(res => res.json()).then(result => setMessage('Updated Successfully'))
        .catch(error => setMessage('Error'))
        .finally(() => {setUpdating(false);setEditing(false)});
    }

    return (
        <Container>

            {profile && 
            <Card className="d-flex flex-column p-3 mb-3" style={{backgroundColor: Colors.white, width: '100%' }}>
                <Card.Body className="d-flex flex-lg-row flex-column align-items-lg-start align-items-center" style={{width: '100%'}}>
                    <Card.Img className="d-none d-md-flex mb-3" style={{width:'17%', height: '15%', marginRight: '1rem'}} src={profile.image}/>
                    <Formik
                        // validationSchema={}
                        onSubmit={(values) => onUpdate(values)}
                        initialValues={profile}
                    >
                        {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        submitForm,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                        <Form className='d-flex flex-column col-9 justify-content-center' onSubmit={handleSubmit}>
                            {['Id', 'Email','Password','Name','DOB','Gender','Address'].map((field) => {
                                const lowerCase = field.toLowerCase();
                                return (
                                    <Form.Group className="d-flex flex-column flex-lg-row align-items-center mb-3" controlId={"validationFormik" + field} >
                                        <Form.Label className="col-lg-3 w-sm-auto">{field}</Form.Label>
                                        <Form.Control 
                                            className="col-lg"
                                            type={field === 'email' ? 'email' : 'text'} 
                                            placeholder={profile[lowerCase]}
                                            name={lowerCase}
                                            value={values[lowerCase]}
                                            onChange={handleChange}
                                            disabled={!editing || (readOnly.indexOf(lowerCase) > -1)}
                                        />
                                    
                                    </Form.Group>)
                                    })
                                }
                                <Form.Group className="d-flex flex-column flex-lg-row align-items-center mb-3" controlId={"validationFormik"} >
                                    <Form.Label className="col-lg-3 w-sm-auto">{'Upload Image'}</Form.Label>
                                    <Form.Control 
                                        className="col-lg"
                                        type='file'
                                        placeholder='Upload Image'
                                        name='imageFile'
                                        value={values.imageFile}
                                        onChange={onUploadImage}
                                        disabled={!editing}
                                    />
                                    
                                </Form.Group>
                            
                            {editing && <Container className="d-flex justify-content-lg-end align-items-center flex-lg-row flex-column">
                                <Button style={{backgroundColor: Colors.white, color: Colors.lighterBlue, border: `1px solid ${Colors.lighterBlue}`, height: '2.5rem', width: '8rem'}} onClick={() => setEditing(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={Colors.lighterBlue} class="bi bi-x-octagon" viewBox="0 0 20 20">
                                        <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                    Cancel
                                </Button>
                                <Button type='submit' style={{backgroundColor: Colors.lightBlue, border: 'none', height: '2.5rem', width: '8rem'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 20 20">
                                        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                                        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                                    </svg>
                                    Update
                                </Button>
                        
                                </Container>}
                            </Form>
                            
                        )}
                    </Formik>
                    <Button className='h-25 col' style={{backgroundColor: Colors.white, border: 'none'}} onClick={() => setEditing(true)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={Colors.lightBlue} class="bi bi-pencil" viewBox="0 0 20 20">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                    </Button>
                </Card.Body>
                
                
            </Card>}
            
        </Container>
    )
}
// this function is used to make appintment with doctor
function MakeAppointment(){
    const [searching, setSearching] = React.useState(false);
    const aptList = [{
        date: new Date(),
        SelectTime: "",
        
    }]
    
    return (
        <Container className="d-flex flex-column align-items-center">
            <Formik
            
            onSubmit={(values) => console.log(values)}
            initialValues={{
                doctor: '',
                date: new Date().toLocaleDateString(),
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
            }) => (
                <Form className='form w-75 d-flex flex-row mb-5' onSubmit={handleSubmit}>
                    <Form.Group className="col-6" controlId="validationFormik11">
                        <Form.Select
                            itemType='text'
                            name='doctor'
                            onChange={handleChange}
                            disabled={searching}>
                                <option>{'Select doctor'}</option>
                            {/* {practiceOptions.map((option) => {
                                return (
                                    <option>{option}</option>
                                )
                            })} */}
                        </Form.Select>

                    </Form.Group>
                    <Form.Group className="col-6" controlId="validationFormik10">
                        <Form.Control 
                            type="date" 
                            name='date'
                            onChange={handleChange}
                            value={values.date}
                            disabled={searching}
                        />

                    </Form.Group>
                    <Button type="submit" style={{backgroundColor: Colors.white, border:'none'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={Colors.darkBlue} class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>  
                    </Button>
    
                    </Form>
                )}
            </Formik>
            {aptList.map((request) => {
                return (
                    <Card className="d-flex w-100 flex-row p-3 mb-3" style={{backgroundColor: Colors.white }}>
                        
                        <Card.Body className="d-flex flex-column w-auto align-items-start">
                          
                            <Card.Text style={{fontSize: '16px'}} className="mb-2">time: {request.time}</Card.Text>
                            <Card.Text style={{fontSize: '16px'}} className="mb-1">Date: {request.date.toLocaleDateString()}</Card.Text>
                        </Card.Body>
                        <Container className="w-auto d-flex justify-content-lg-end justify-content-start flex-lg-row flex-column">
                            <Button style={{backgroundColor: Colors.lightGreen, border: 'none', height: '2.5rem', width: '8rem'}} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 20 20">
                                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                                </svg>
                                Confirm
                            </Button>
                           
                           
                           
                        </Container>
                        
                    </Card>
                    
                )
            })}
        </Container>

    )
}
function ViewAppointment({id}){
    const [ appointments, setAppointments] = React.useState(null);
    const [ searching, setSearching] = React.useState(false);

    const [ message, setMessage ] = React.useState(null);

    React.useEffect(() => {
        fetch(url + '/patient/' + id + '/appointments')
        .then(res => res.json())
        .then(result => {
            const filtered = result.appointments.filter((item) => (new Date(item.startDate) - new Date()) > 0)
            setAppointments(filtered);
        })
    },[]);

    const onSearch = ({title, date}) => {
        let filtered = [...appointments];
        
        if (title && date){
            filtered = filtered.filter(a => (a.title.toLowerCase().includes(title.toLowerCase())) && (new Date(a.startDate).toLocaleDateString() === new Date(date).toLocaleDateString()) )
        }
        else if (title){
            filtered = filtered.filter(a => a.title.toLowerCase().includes(title.toLowerCase()))
        }
        else if (date){
            filtered = filtered.filter(a => new Date(a.startDate).toLocaleDateString() === new Date(date).toLocaleDateString());
        }
        console.log(filtered);
        setAppointments(filtered);
    }
    const onCancel = ({aptID}) => {
        fetch(url + '/patient/' + id + '/appointment/' + aptID + '/cancel',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                patientID: '',
                state: 'Available',
            })
        }).then(res => res.json()).then(setMessage('Cancel Successfully'));
        setAppointments(appointments => appointments.filter(a => a._id !== aptID));
    }
    return (
        <Container className="d-flex flex-column align-items-center">
            {appointments && <Formik
            
                onSubmit={(values) => onSearch(values)}
                initialValues={{
                    title: '',
                    date: '',
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                }) => (
                    <Form className='form w-75 d-flex flex-row mb-5 justify-content-center' onSubmit={handleSubmit}>
                        <Form.Group className="col-6" controlId="validationFormik11">
                        <Form.Control 
                            type="text" 
                            name='title'
                            placeholder='Enter title'
                            onChange={handleChange}
                            value={values.title}
                            disabled={searching}
                        />
                        </Form.Group>
                        
                        <Form.Group className="col-6" controlId="validationFormik10">
                            <Form.Control 
                                type="date" 
                                name='date'
                                onChange={handleChange}
                                value={values.date}
                                disabled={searching}
                            />

                        </Form.Group>
                        
                        <Button type="submit" style={{backgroundColor: Colors.white, border:'none'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={Colors.darkBlue} class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>  
                        </Button>

                    </Form>
                )}
            </Formik>}
                    
            {!appointments && <Card className="d-flex w-100 flex-row p-3 mb-3" style={{backgroundColor: Colors.white }}>
                    
                    <Container className="w-auto d-flex justify-content-lg-end justify-content-start flex-lg-row flex-column">
                        <h3>You have not made any appointment yet</h3>

                    </Container>
                    
                </Card>}
                
            {appointments && 
                <Container style={{overflowY: 'auto'}}> {appointments.map((appointment) => {
                        return (
                            <Card className="d-flex w-100 flex-row p-3 mb-3" style={{overflowY: 'auto', backgroundColor: Colors.white }}>    
                            <Card.Body className="d-flex flex-column w-auto align-items-start">
                                <Card.Text style={{fontSize: '16px'}} className="mb-2">Title: {appointment.title}</Card.Text>
                                <Card.Text style={{fontSize: '16px'}} className="mb-2">Date: {new Date(appointment.startDate).toLocaleDateString()}</Card.Text>
                                <Card.Text style={{fontSize: '16px'}} className="mb-2">From: {new Date(appointment.startDate).toLocaleTimeString()}</Card.Text>
                                <Card.Text style={{fontSize: '16px'}} className="mb-1">To: {new Date(appointment.endDate).toLocaleTimeString()}</Card.Text>
                            </Card.Body>
                            <Container className="w-auto d-flex justify-content-lg-end justify-content-start flex-lg-row flex-column">
                                <Button style={{backgroundColor: Colors.lightGreen, border: 'none', height: '2.5rem', width: '8rem'}} onClick={() => onCancel({aptID: appointment._id})}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 20 20">
                                        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                                        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                                    </svg>
                                    Cancel
                                </Button>     
                            </Container>

                            </Card>)}
                        )}   
                    </Container>
                }
            
            
            
            
           
           
    
        </Container>
        
    )}
   

export default function PatientPage() {
    // set id 
    const [ id, setID] = React.useState();

    // navigation
    const navigate = useNavigate();

    // trigger visibility of other info
    const [visibleInfo, setVisibleInfo] = React.useState(false);
    const [viewAppointment, setViewAppointment] = React.useState(false);
    const [bookedAppointments, setBookedAppointments] = React.useState(false);

    
    React.useEffect(() => {
        // verify token
        fetch(url + "/auth", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token')
            })
        }).then(res => res.json())
        .then(result => {
            if (result.login){
                setID(result.id);
            }
            else {
                navigate('/')
            }
        }).catch(err => {
            if (err) {
                navigate('/');
            }
            
        })
    },[])
    return (
        <React.Fragment>
            <Header isPatient={true} id={id} />
            <Container fluid className="d-flex flex-column align-items-center my-5 px-lg-5 px-sm-2" id="info" >
                <ToggleDisplay title="Profile" setVisible={setVisibleInfo} state={visibleInfo}/>
                {visibleInfo && <PatientProfile id={id}/>}
                
            </Container>
            
           
            <Container fluid className="d-flex flex-column align-items-center my-5 px-lg-5 px-sm-2" id="makeAppointment">
                <ToggleDisplay title="Make Appointment" setVisible={setViewAppointment} state={viewAppointment} />
                
                {viewAppointment && <MakeAppointment id={id}/>}

            </Container>
            <Container fluid className="d-flex flex-column align-items-center my-5 px-lg-5 px-sm-2" id="registrationRequest">
                <ToggleDisplay title="View Appointment" setVisible={setBookedAppointments} state={bookedAppointments} />
                {bookedAppointments && <ViewAppointment id={id}/>}

            </Container>


        </React.Fragment>
    )
}