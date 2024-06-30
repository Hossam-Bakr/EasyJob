import React from "react";
import styles from "./UpdateWorkExperienceModal.module.css";
import Modal from "react-bootstrap/Modal";
import { useQuery } from "@tanstack/react-query";
import { getJobApplications } from "../../util/Http";
import NoDataBox from "../../Components/Ui/NoDataBox";

const ShowQuestionAnswersModal = ({ onHide, show, appId, jobId }) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const { data } = useQuery({
    queryKey: ["getSpeceficJobApplicaton", appId],
    queryFn: () => getJobApplications({ jobId, token, appId }),
  });

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  };

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
        <h4 className="special_main_color">Your Questions</h4>
        {data ? (
          data.data?.job?.Questions?.map((question) => (
            <div className={styles.question} key={question.id}>
              <h6>
                {question.questionText}(
                <span className="mini_word">{question.type}</span>)
              </h6>
            </div>
          ))
        ) : (
          <NoDataBox
            text="no data found if there is any problem call support"
            path="/contact"
          />
        )}
        <hr/>

        <h4 className="special_main_color">Answers</h4>
        {data ? (
          data.data?.application?.Answers?.map((answers) => (
            <div className={styles.question} key={answers.id}>
              <h6>
                {isValidUrl(answers.answer) ? (
                  <audio controls src={answers.answer}></audio>
                ) : (
                  answers.answer
                )}
              </h6>
            </div>
          ))
        ) : (
          <NoDataBox
            text="no data found if there is any problem call support"
            path="/contact"
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ShowQuestionAnswersModal;
