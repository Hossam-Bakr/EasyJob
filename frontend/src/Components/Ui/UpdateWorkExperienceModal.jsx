import React from "react";
import styles from "./UpdateWorkExperienceModal.module.css";
import Modal from "react-bootstrap/Modal";
import UpdateWorkExperienceForm from "../EdietProfilesInfo/UpdateWorkExperienceForm";

const UpdateWorkExperienceModal = ({
  onHide,
  show,
  title,
  type,
  description,
  startDate,
  endDate,
  organization,
  expId,
  category,
  setSecResponseMsg,
  setSecSuccess,
  setSecShowResponse
}) => {
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.modal_container}
    >
      <Modal.Header closeButton className={styles.modal_header}>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Work Experience
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        <UpdateWorkExperienceForm
          expId={expId}
          title={title}
          type={type}
          description={description}
          startDate={startDate}
          endDate={endDate}
          organization={organization}
          category={category}
          onHide={onHide}
          setSecResponseMsg={setSecResponseMsg}
          setSecSuccess={setSecSuccess}
          setSecShowResponse={setSecShowResponse}
        />
      </Modal.Body>
    </Modal>
  );
};

export default UpdateWorkExperienceModal;
