import React from "react";
import styles from "./UpdateJob.module.css";
import Modal from "react-bootstrap/Modal";
import UpdateJobPostForm from "./UpdateJobPostForm";

const UpdateJobModal = ({
  onHide,
  show,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
  id,
  job
}) => {
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.modal_container}
    >
      <Modal.Header closeButton className={styles.modal_header}>
        <Modal.Title id="contained-modal-title-vcenter">Update Job Post</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        <div>
            <UpdateJobPostForm
              onHide={onHide}
              setShowResponse={setShowResponse}
              setResponseMessage={setResponseMessage}
              setSuccessResponse={setSuccessResponse}  
              job={job}
            />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateJobModal;
