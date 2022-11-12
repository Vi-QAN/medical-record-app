import React from 'react';
import url from '../constants/link';
import { Container, Form } from 'react-bootstrap';
export default function Doctor({id}) {
    const [info, setInfo] = React.useState();
    
    React.useEffect(() => {
        fetch(url + '/doctor/' + id ,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(setInfo)
        .catch(err => {
            
        }) 
    },[])
    return (
        <React.Fragment>
            <Container id="info" >
                <Form>
                </Form>
            </Container>
            <Container id="calendar">
                
            </Container>
            <Container id="patientList">

            </Container>
            <Container>

            </Container>
        </React.Fragment>
    )
}