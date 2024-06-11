import React from "react";
import styles from "./UpdateJob.module.css";
import Modal from "react-bootstrap/Modal";
import UpdateJobQuestionForm from "./UpdateJobQuestionForm";

const UpdateJobQuestionModal = ({
  onHide,
  show,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
  jobId,
  refetch,
  questionText,
  type,
  questionId,
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
        <Modal.Title id="contained-modal-title-vcenter">
          Update Job Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        <div>
          <UpdateJobQuestionForm
            questionText={questionText}
            type={type}
            questionId={questionId}
            onHide={onHide}
            setShowResponse={setShowResponse}
            setResponseMessage={setResponseMessage}
            setSuccessResponse={setSuccessResponse}
            jobId={jobId}
            refetch={refetch}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateJobQuestionModal;
