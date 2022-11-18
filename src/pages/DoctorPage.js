import React from 'react';
import url from '../constants/link';

import { Container, Card, Form, CloseButton, Button } from 'react-bootstrap';
import DoctorScheduler from '../components/DoctorScheduler';
import profileImg from '../assets/profile.jpg';
import ToggleDisplay from '../components/ToggleDisplayBar';
import * as Colors from '../constants/colors';



function PatientInfo(){
    const infoList = [
        {
            id: 'P12H4',
            name: 'QAN',
            DOB: new Date(),
            gender: 'Male',
        },
        {
            id: 'P12H7',
            name: 'NEW',
            DOB: new Date(),
            gender: 'Male',
        }
    
    ]
    React.useEffect(() => {

    })
    return (
        <Container fluid>
            {infoList.map((info) => {
                return (
                    <Card className="d-flex flex-row p-3 mb-3" style={{backgroundColor: Colors.white }}>
                        <Card.Img className="d-none d-md-flex" style={{width: '6rem', height: '100px', marginRight: '1rem'}} src={profileImg}/>
                        <Card.Body className="d-flex flex-column w-auto align-items-start">
                            <Card.Text style={{fontSize: '14px'}} className="mb-2">{info.id}</Card.Text>
                            <Card.Subtitle style={{fontSize: '20px'}} className="mb-1">{info.name}</Card.Subtitle>
                            <Card.Text style={{fontSize: '16px'}} className="mb-1">{info.gender}</Card.Text>
                        </Card.Body>
                        <Button className='h-25' style={{backgroundColor: Colors.white, border: 'none'}} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={Colors.lightBlue} class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                            </svg>
                        </Button>
                    </Card>
                )
            })}
        </Container>
    )
}

function PatientRequests(){
    const requestList = [{
        from: 'P12H4',
        date: new Date(),
    }]
    return (
        <Container>
            {requestList.map((request) => {
                return (
                    <Card className="d-flex w-100 flex-row p-3 mb-3" style={{backgroundColor: Colors.white }}>
                        <Card.Img className="d-none d-md-flex" style={{width: '6rem', height: '100px', marginRight: '1rem'}} src={profileImg}/>
                        <Card.Body className="d-flex flex-column w-auto align-items-start">
                            <Card.Text style={{fontSize: '16px'}} className="mb-2">From: {request.from}</Card.Text>
                            <Card.Text style={{fontSize: '16px'}} className="mb-1">Date: {request.date.toLocaleDateString()}</Card.Text>
                        </Card.Body>
                        <Container className="w-auto d-flex justify-content-lg-end justify-content-start flex-lg-row flex-column">
                            <Button style={{backgroundColor: Colors.lightGreen, border: 'none', height: '2.5rem', width: '8rem'}} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 20 20">
                                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                                </svg>
                                Accept 
                            </Button>
                            <Button style={{backgroundColor: '#d75965', border: 'none', height: '2.5rem', width: '8rem'}} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-octagon" viewBox="0 0 20 20">
                                    <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                                Reject 
                            </Button>
                        </Container>
                        
                    </Card>
                )
            })}
        </Container>
    )
}

export default function DoctorPage({id}) {
    const [info, setInfo] = React.useState();

    const [visibleInfo, setVisibleInfo] = React.useState(false);
    const [visibleSchedule, setVisibleSchedule] = React.useState(false);
    const [visiblePatients, setVisiblePatients] = React.useState(false);
    const [visibleRequests, setVisibleRequests] = React.useState(false);
    
    // React.useEffect(() => {
    //     fetch(url + '/doctor/' + id ,{
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(setInfo)
    //     .catch(err => {
            
    //     }) 
    // },[])
    return (
        <React.Fragment>
            <Container fluid className="d-flex flex-column align-items-center my-5 px-lg-5 px-sm-2" id="info" >
                <ToggleDisplay title="Profile" setVisible={setVisibleInfo} state={visibleInfo}/>
                {visibleInfo && 
                <Card className="d-flex flex-row" style={{ width: '80%'}}>
                    <Card.Img className='d-none d-md-flex' style={{width: '20%', height: '100%'}} src={profileImg} />
                    
                    <Card.Body className="d-flex flex-column">
                        <Form>
                            <Form.Group>

                            </Form.Group>
                        </Form>
                    </Card.Body>
                    <CloseButton className='d-none d-md-flex px-3 py-3' onClick={() => setVisibleInfo(false)} ></CloseButton>  
                </Card>}
            </Container>
            <Container fluid className="d-flex flex-column align-items-center my-5 px-lg-5 px-sm-2" id="scheduler">
                <ToggleDisplay title="Your Schedule" setVisible={setVisibleSchedule} state={visibleSchedule}/>
                {visibleSchedule && <DoctorScheduler />}
            </Container>
            <Container fluid className="d-flex flex-column align-items-center my-5 px-sm-2 px-lg-5 " id="patientList">
                <ToggleDisplay title="Patient List" setVisible={setVisiblePatients} state={visiblePatients} />
                {visiblePatients && <PatientInfo />}
            </Container>
            <Container fluid className="d-flex flex-column align-items-center my-5 px-lg-5 px-sm-2" id="registrationRequest">
                <ToggleDisplay title="Registration Request" setVisible={setVisibleRequests} state={visibleRequests} />
                {visibleRequests && <PatientRequests />}
            </Container>
        </React.Fragment>
    )
}