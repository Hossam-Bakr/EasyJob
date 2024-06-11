import React, { useState } from "react";
import styles from "./SkillBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import UpdateJobQuestionModal from "../../Pages/PostAJob/UpdateJobQuestionModal";

const QuestionBox = ({
  jobId,
  questionId,
  questionText,
  type,
  refetch,
  deleteQuestion,
  isMyProfile,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
  
}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className={styles.skill_box}>
        <div className={styles.question_control_box}>
          {isMyProfile ? (
            <FontAwesomeIcon
              onClick={() => setModalShow(true)}
              title="Ediet question"
              className={styles.control_btn}
              icon={faEdit}
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => deleteQuestion(questionText)}
              title="delete question"
              className={styles.control_btn}
              icon={faTrash}
            />
          )}
        </div>

        <span>
          {questionText} <span className="mini_word">({type})</span>
        </span>
      </div>

      <UpdateJobQuestionModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setShowResponse={setShowResponse}
        setResponseMessage={setResponseMessage}
        setSuccessResponse={setSuccessResponse}
        jobId={jobId}
        refetch={refetch}
        questionId={questionId}
        questionText={questionText}
        type={type}
      />
    </>
  );
};

export default QuestionBox;
