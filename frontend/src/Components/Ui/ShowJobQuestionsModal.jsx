import React, { useState } from "react";
import styles from "./UpdateWorkExperienceModal.module.css";
import Modal from "react-bootstrap/Modal";
import { useQuery } from "@tanstack/react-query";
import { getSpecificJob } from "../../util/Http";
import QuestionBox from "./QuestionBox";
import MainBtnThree from "./MainBtnThree";
import FloatingPopup from "./FloatingPopup";


const ShowJobQuestionsModal = ({ onHide, show, jobId, token }) => {
  
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const { data, refetch } = useQuery({
    queryKey: ["getSpeceficJob"],
    queryFn: () => getSpecificJob({ jobId, token }),
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
          Questions related to your job
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        <>
          {data ? (
            data.data?.job?.Questions.length > 0 ? (
              data.data?.job?.Questions.map((question) => (
                <QuestionBox
                  key={question.id}
                  questionId={question.id}
                  jobId={question.JobId}
                  questionText={question.questionText}
                  type={question.type}
                  refetch={refetch}
                  setShowResponse={setShowResponse}
                  setResponseMessage={setResponseMessage}
                  setSuccessResponse={setSuccessResponse}
                  isMyProfile={true}
                />
              ))
            ) : (
              <div className="text-center">
                <div className="alert alert-warning my-5 text-center">
                  <span>You Didn't Add Questions to this Job yet!</span>
                </div>
                {/* //handle that */}
                <MainBtnThree text="Add Questions" />
              </div>
            )
          ) : (
            ""
          )}
        </>
      </Modal.Body>
      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </Modal>
  );
};

export default ShowJobQuestionsModal;
