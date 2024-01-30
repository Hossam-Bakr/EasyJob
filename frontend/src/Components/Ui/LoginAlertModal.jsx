import React from 'react';
import styles from './LoginAlertModal.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useNavigate } from 'react-router-dom';
import MainButton from './MainButton';

const LoginAlertModal = (props) => {

  const navigate=useNavigate();
  const navigateToSignUpPage=()=>{
    props.onHide();
    navigate('user-register');
 }
  const navigateToLoginPage=()=>{
    props.onHide();
    navigate('login');
 }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.modal_container}
    >
     <Modal.Body className={styles.modal_body}>
        <h4>Sorry! you need to sign up or login to continue your work</h4>
      </Modal.Body>
      <Modal.Footer className={styles.modal_footer}>
        <Button variant='danger' className={styles.close_btn} onClick={props.onHide}>Close</Button>
        <MainButton onClick={navigateToSignUpPage} text='Sign Up'/>
        <MainButton onClick={navigateToLoginPage} text='Login' />
      </Modal.Footer>
    </Modal>
  )
}

export default LoginAlertModal
