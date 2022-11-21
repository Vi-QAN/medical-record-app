import React, { useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import Header from '../components/Header';
import PopupModal from '../components/Modal';


export default function Main() {
    const [showModal, setShowModal] = useState(false);

    const contentData = [
        {
            header: 'GP visit Cards',
            content: "With a GP visit card you don't have to pay to see your GP. Find out about the types of GP visit cards and how to apply."
        },
        {
            header: 'General GP visit card',
            content: "Anyone can apply for a GP visit card. Applications for GP visit cards and medical cards are made through the same system. You will first be assessed for a medical card. If you don't qualify, you will then be assessed for a GP visit card."
        },
        {
            header: 'Status of a registration',
            content: "You can use your reference number to check the status of your GP visit card registration online. When you apply online, you get a reference number at the end of the application process. If you don't give a mobile number, we send a reference number by post."
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
                        <h5 className='mb-5'>Web Site Main Ingredients:</h5>
                        <Button>Learn More</Button>
                    </Container>
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