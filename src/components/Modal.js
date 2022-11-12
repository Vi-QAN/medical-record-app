// form validation using Formik and Yup

import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

import '../styles/ModalStyle.css';

export default function PopupModal({showModal, setShowModal}) {
    const [loginMode, setLoginMode] = useState(true);
    const [title, setTitle] = useState('Login');

    const setModal = (mode, title) => {
        setLoginMode(mode);
        setTitle(title);
    }
    
    return (
        <React.Fragment>
            <Modal 
                show={showModal}
                dialogClassName="modal-90w"
                onHide={() => setShowModal(false)}
                centered={true}
                >
                <Modal.Header closeButton>
                    <Modal.Title className="title" id="example-custom-modal-styling-title">
                        {title}
                    </Modal.Title>
                    
                </Modal.Header>
                <Modal.Body className='form-wrapper'>
                    {loginMode ? <LoginModal setModal={setModal}/> : <RegisterModal setModal={setModal}/>}
                </Modal.Body>
            </Modal>
        </React.Fragment>

    )
}