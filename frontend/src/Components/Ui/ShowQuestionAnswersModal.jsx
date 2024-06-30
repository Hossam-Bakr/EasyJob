import React from "react";
import styles from "./UpdateWorkExperienceModal.module.css";
import Modal from "react-bootstrap/Modal";
import { useQuery } from "@tanstack/react-query";
import { getJobApplications } from "../../util/Http";

const ShowQuestionAnswersModal = ({ onHide, show,appId, jobId }) => {
    
    const token = JSON.parse(localStorage.getItem("token"));

    const { data } = useQuery({
      queryKey: ["getSpeceficJobApplicaton",appId],
      queryFn: () => getJobApplications({ jobId, token,appId }),
    });
    //data.data.job.Questions
    console.log(data);
  


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
          Question Answers
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        appid:{appId} questionId {jobId}
      </Modal.Body>
    </Modal>
  )
}

export default ShowQuestionAnswersModal
