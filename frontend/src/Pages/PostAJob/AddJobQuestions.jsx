import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PostAJob.module.css";
import FloatingPopup from "../../Components/Ui/FloatingPopup";
import JobQuestionsForm from "./JobQuestionsForm";

const AddJobQuestions = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const { jobId } = useParams();

  return (
    <div className={styles.main_container}>
      <div className={styles.headerBox}>
        <h1 className={styles.mainHeader}>
          Add Some <span>Questions.</span>
        </h1>
      </div>

      <div
        data-aos="zoom-in-up"
        data-aos-duration="800"
        className={styles.FormContainer}
      >
        <JobQuestionsForm
          setShowResponse={setShowResponse}
          setResponseMessage={setResponseMessage}
          setSuccessResponse={setSuccessResponse}
          jobId={jobId}
        />
      </div>

      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </div>
  );
};

export default AddJobQuestions;
