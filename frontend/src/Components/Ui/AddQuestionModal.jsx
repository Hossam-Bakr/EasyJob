import React from "react";
import styles from "./UpdateWorkExperienceModal.module.css";
import Modal from "react-bootstrap/Modal";
import AddJobQuestionForm from "../../Pages/PostAJob/AddJobQuestionForm";
import UpdateJobQuestionForm from "../../Pages/PostAJob/UpdateJobQuestionForm";

const AddQuestionModal = ({
  onHide,
  show,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
  saveQuestionIntoMainForm,
  type,
  question,
}) => {
  const saveQuestionIntoModal = (newQuestion) => {
    saveQuestionIntoMainForm(newQuestion);
  };

  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="addQuestionModal"
      centered
      className={styles.modal_container}
    >
      <Modal.Header closeButton className={styles.modal_header}>
        <Modal.Title id="addQuestionModal">Add Job Question</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        {type === "update" ? (
          <UpdateJobQuestionForm
            question={question}
            onHide={onHide}
            setShowResponse={setShowResponse}
            setResponseMessage={setResponseMessage}
            setSuccessResponse={setSuccessResponse}
            saveQuestionIntoModal={saveQuestionIntoModal}
          />
        ) : (
          <AddJobQuestionForm
            onHide={onHide}
            setShowResponse={setShowResponse}
            setResponseMessage={setResponseMessage}
            setSuccessResponse={setSuccessResponse}
            saveQuestionIntoModal={saveQuestionIntoModal}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddQuestionModal;
