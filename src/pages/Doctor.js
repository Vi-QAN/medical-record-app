import React from 'react';
import url from '../constants/link';
import { Container } from 'react-bootstrap';
import DoctorScheduler from '../components/DoctorScheduler';


export default function Doctor({id}) {
    const [info, setInfo] = React.useState();
    
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
            <Container id="info" >
                
            </Container>
            <Container id="scheduler">
                <DoctorScheduler />
            </Container>
            <Container id="patientList">

            </Container>
            <Container id="registrationRequest">

            </Container>
        </React.Fragment>
    )
}