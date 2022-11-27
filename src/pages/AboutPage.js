import React, { useState } from 'react';
import { Card,Container, Row, Button } from 'react-bootstrap';
import Header from '../components/Header';
import PopupModal from '../components/Modal';
import pic1 from '../assets/pa.png';
import p2 from '../assets/pb.png';
import picc from '../assets/pc.png';
import * as Colors from '../constants/colors';


import url from '../constants/link';
import { useNavigate } from 'react-router-dom';


export default function Main() {
    const [showModal, setShowModal] = useState(false);

    const contentData = [
        {
            content: 
            <Card className="d-flex flex-row p-5 mb-2" style={{backgroundColor: Colors.white }}>
                        <Card.Img className="d-none d-md-flex" style={{width: '10rem', height: '100px', marginRight: '1rem'}} src={pic1}/>
             </Card>           

        }, 
        {
            content: 
            <Card className="d-flex flex-row p-5 mb-2" style={{backgroundColor: Colors.white }}>
                        <Card.Img className="d-none d-md-flex" style={{width: '10rem', height: '100px', marginRight: '1rem'}} src={p2}/>
             </Card>    
        },
        {
            content: 
            <Card className="d-flex flex-row p-5 mb-2" style={{backgroundColor: Colors.white }}>
                        <Card.Img className="d-none d-md-flex" style={{width: '10rem', height: '100px', marginRight: '1rem'}} src={picc}/>
             </Card>  
        }
    ];
    return (
        <React.Fragment>
            <Header setShowModal={setShowModal} isMain={true}/>
            <PopupModal setShowModal={setShowModal} showModal={showModal}/>
            <Container fluid>
                <Row className=''>
                    <Container 
                        direction="d-flex flex-column" 
                        style={{
                            height: '30%',
                            padding: '5% 10px 7% 10px'
                        }} className='justify-content-space-between'>
                        <h3 className='mb-3'>Welcome to Our Clinic</h3>
                        <p> This practice was started by the late Dr. Anthony Craig in 1988. 
                            We aim to keep up his high standards of care and compassion for all of our patients.
                            We provide all GP services, catering for the health of the entire family.
                            We pride ourselves on being a small patient-orientated practice,
                            where each patient is respected as an individual, in his/ her unique family or social context.</p>
                            <Button>Learn More</Button>
                    </Container>
                    <h2 className='mb-4'>OUR TEAM</h2>
                    <Container
                        className='d-flex flex-lg-row flex-column ' >
                        {contentData.map((item) => {
                            return <ContentBox header={item.header} content={item.content}/>
                        })}
                    </Container>
                </Row>
            </Container>
        </React.Fragment>
        
    )
}

function ContentBox({header, content}){
    const style = {
        container: {
            width: '30%',
            borderRadius: '1rem',
        }
    }
    return (
        <Container className='d-flex flex-column px-4' style={style}>
            <h4 className='mb-4'>{header}</h4>
            <p>{content}</p>
        </Container>)
}