import React from "react";
import styles from "./LoginAlertModal.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MainButton from "./MainButton";
import { useDispatch, useSelector } from "react-redux";
import { saveIsLoginState } from "../../Store/userInfo-actions";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../Store/userInfo-slice";
import axios from "axios";

const ConfirmModal = ({
  onHide,
  show,
  text,
  btnText,
  onSubmit,
  type,
  jobId,
  refetch,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.userInfo.token);

  const handleDeletingAccount = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    dispatch(userActions.setIsLogin(false));
    dispatch(saveIsLoginState(false));
    onHide();
    onSubmit();
    navigate("/");
  };

  const deleteMyJob = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_Base_API_URl}jobs/${jobId}`,
        { headers: {
          Authorization:`Bearer ${token}`
        } }
      );
  
      console.log(response.data);  
      setResponseMessage({
        title: "Deleted Successfully",
        content: "Your Job has been Deleted successfully",
      });
      setSuccessResponse(true);
      setShowResponse(true);
      refetch()
      onHide() 
    } catch (error) {
      setResponseMessage({
        title: "Faild to Delete job",
        content: "Your Job Faild to be Deleted Please try again later",
      });
      setSuccessResponse(false);
      setShowResponse(true);
      console.log(error)
    }

  };

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
        <Button
          variant="secondary"
          className={styles.close_btn}
          onClick={onHide}
        >
          Cancel
        </Button>
        <MainButton
          onClick={type === "deleteJob" ? deleteMyJob : handleDeletingAccount}
          text={btnText}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
