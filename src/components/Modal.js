// form validation using Formik and Yup

import React, { useState } from 'react';
import { Button, Modal, Nav } from 'react-bootstrap';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

import '../styles/ModalStyle.css';



export default function PopupModal({showModal, setShowModal}) {
    // state for info modal
    const [info, setInfo] = useState();

    // state for triggering login/register modal
    const [loginMode, setLoginMode] = useState();
    const [title, setTitle] = useState();

    const setModal = (mode, title) => {
        setLoginMode(mode);
        setTitle(title);
    }
    
    return (
        <React.Fragment>
            <Modal 
                show={showModal}
                dialogClassName="modal-90w"
                onEnter={() => setModal(true,'Login')}
                onHide={() => setShowModal(false)}
                centered={true}
                >
                <Modal.Header closeButton>
                    <Modal.Title className="title" id="example-custom-modal-styling-title">
                        {title}
                    </Modal.Title>
                    
                </Modal.Header>
                {info ? 
                <Modal.Body>
                    <h4>{info?.message}</h4>
                    <p>Please note down your id: {info?.id}</p>
                    <Button onClick={() => {
                        setInfo(undefined);
                        setModal(true,'Login'); 
                    }}>Go to login</Button>
                </Modal.Body>
                :
                <Modal.Body className='form-wrapper'>
                    {loginMode ? <LoginModal setModal={setModal} setShowModal={setShowModal}/> : <RegisterModal setModal={setModal} setInfo={setInfo}/>}
                </Modal.Body>}

            </Modal>
        </React.Fragment>

    )
}