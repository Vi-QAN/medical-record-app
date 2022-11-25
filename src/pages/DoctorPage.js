import React, { useState } from 'react';
import url from '../constants/link';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, CloseButton, Button } from 'react-bootstrap';
import DoctorScheduler from '../components/DoctorScheduler';
import profileImg from '../assets/profile.jpg';
import Header from '../components/Header';
import ToggleDisplay from '../components/ToggleDisplayBar';
import * as Colors from '../constants/colors';


function PatientInfo({id}){
    const [ patients, setPatients ] = useState(null);
    const [ loading, setLoading ] = useState(false); 
    
    React.useEffect(() => {
        setLoading(true);
        const list = fetch(url + '/doctor/' + id + '/patients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(res => {
            // get patient list from doctor database
            // then pass to promise all to fetch concurrently
            // return a promise all
            return Promise.all(res.patientList.map(id => 
                fetch(url + '/patient/' + id).then(responses => {return responses.json()})))
        }); 
        // get result from promise all
        list.then(result => setPatients(result));
        setLoading(false);
    },[])


    return (
        <Container fluid>
            {patients && patients.map((info) => {
                return (
                    <Card className="d-flex flex-row p-3 mb-3" style={{backgroundColor: Colors.white }}>
                        <Card.Img className="d-none d-md-flex" style={{width: '6rem', height: '100px', marginRight: '1rem'}} src={profileImg}/>
                        <Card.Body className="d-flex flex-column w-auto align-items-start">
                            <Card.Text style={{fontSize: '14px'}} className="mb-2">{info._id}</Card.Text>
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

function PatientRequests({id}){
    const [ requests, setRequests ] = useState(null); 
    const [ loading, setLoading ] = useState(false);

    React.useEffect(() => {
        setLoading(true);
        fetch(url + '/doctor/' + id + '/requests', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(result => {
            console.log(result)
            setRequests(result);
        }); 
        setLoading(false);
    },[])

    const removeRequest = ({requestID}) => {
        fetch(url + '/request/' + requestID, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            }
        }).then(res => res.json()).then(console.log("removed"));
        setRequests(requests => requests.filter(request => request._id !== requestID))
    }

    const acceptRequest = ({patientID}) => {
        fetch(url + '/doctor/' + id + '/patients' , { 
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                patientID: patientID
            })
        }).then(res => res.json()).then(res => console.log(res))
    }

    const onAccept = ({requestID, patientID}) => {
        acceptRequest({patientID: patientID});
        removeRequest({requestID: requestID});
    }

    const onReject = ({requestID}) => {
        removeRequest({requestID: requestID});
    }
    return (
        <Container>
            {requests && requests.map((request) => {
                return (
                    <Card className="d-flex w-100 flex-row p-3 mb-3" style={{backgroundColor: Colors.white }}>
                        <Card.Img className="d-none d-md-flex" style={{width: '6rem', height: '100px', marginRight: '1rem'}} src={profileImg}/>
                        <Card.Body className="d-flex flex-column w-auto align-items-start">
                            <Card.Text style={{fontSize: '16px'}} className="mb-2">From: {request.from}</Card.Text>
                            <Card.Text style={{fontSize: '16px'}} className="mb-1">Date: {new Date(request.date).toLocaleDateString()}</Card.Text>
                        </Card.Body>
                        <Container className="w-auto d-flex justify-content-lg-end justify-content-start flex-lg-row flex-column">
                            <Button style={{backgroundColor: Colors.lightGreen, border: 'none', height: '2.5rem', width: '8rem'}} onClick={() => onAccept({requestID: request._id, patientID: request.from})}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 20 20">
                                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                                </svg>
                                Accept 
                            </Button>
                            <Button style={{backgroundColor: '#d75965', border: 'none', height: '2.5rem', width: '8rem'}} onClick={() => onReject({requestID: request._id})}>
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

export default function DoctorPage() {
    // set id 
    const [ id, setID] = React.useState();

    // navigation
    const navigate = useNavigate();

    // trigger visibility of other info
    const [visibleSchedule, setVisibleSchedule] = React.useState(false);
    const [visiblePatients, setVisiblePatients] = React.useState(false);
    const [visibleRequests, setVisibleRequests] = React.useState(false);

    
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
            <Header isDoctor={true} id={id} />
            <Container fluid className="d-flex flex-column align-items-center my-5 px-lg-5 px-sm-2" id="scheduler">
                <ToggleDisplay title="Your Schedule" setVisible={setVisibleSchedule} state={visibleSchedule}/>
                {visibleSchedule && <DoctorScheduler id={id}/>}
            </Container>
            <Container fluid className="d-flex flex-column align-items-center my-5 px-sm-2 px-lg-5 " id="patientList">
                <ToggleDisplay title="Patient List" setVisible={setVisiblePatients} state={visiblePatients} />
                {visiblePatients && <PatientInfo id={id}/>}
            </Container>
            <Container fluid className="d-flex flex-column align-items-center my-5 px-lg-5 px-sm-2" id="registrationRequest">
                <ToggleDisplay title="Registration Request" setVisible={setVisibleRequests} state={visibleRequests} />
                {visibleRequests && <PatientRequests id={id}/>}
            </Container>
        </React.Fragment>
    )
}