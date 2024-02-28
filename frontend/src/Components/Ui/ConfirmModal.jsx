import React from 'react';
import styles from './LoginAlertModal.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MainButton from './MainButton';
import { useDispatch } from 'react-redux';
import { saveIsLoginState } from '../../Store/userInfo-actions';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../Store/userInfo-slice';

const ConfirmModal = ({onHide,show,text,btnText,onSubmit}) => {

    const dispatch=useDispatch();
    const navigate=useNavigate();

   const handleDeletingAccount=()=>{
    localStorage.removeItem("userData");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    dispatch(userActions.setIsLogin(false));
    dispatch(saveIsLoginState(false));
    onHide();
    onSubmit();
    navigate("/");
    }

  return (
    <Modal
    show={show}
    onHide={onHide}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className={styles.modal_container}
  >
   <Modal.Body className={styles.modal_body}>
      <h4>{text}</h4>
    </Modal.Body>
    <Modal.Footer className={styles.modal_footer}>
      <Button variant='success' className={styles.close_btn} onClick={onHide}>Cancel</Button>
      <MainButton  onClick={handleDeletingAccount}  text={btnText} />
    </Modal.Footer>
  </Modal>
  )
}

export default ConfirmModal
