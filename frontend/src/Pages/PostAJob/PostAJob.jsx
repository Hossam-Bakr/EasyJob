import styles from "./PostAJob.module.css";
import JobForm from "./JobForm";
import { useEffect, useState } from "react";
import AOS from "aos";
import FloatingPopup from "../../Components/Ui/FloatingPopup";
import JobQuestionsForm from "./JobQuestionsForm";

function PostAJob() {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [jobPostId, setJobPostId] = useState(null);

  useEffect(() => {
    AOS.init();
    window.scrollTo(0, 0)
  }, []);

  const getJobIdFromPost = (jobId) => {
    setJobPostId(jobId);
    setShowQuestions(true);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.headerBox}>
        {showQuestions ? (
          <h1 className={styles.mainHeader}>
            <span className={styles.title_number_two}>2</span> Add Some <span>Questions.</span>
          </h1>
        ) : (
          <h1 className={styles.mainHeader}>
            <span className={styles.title_number_one}>1</span> Post New <span>Job.</span>
          </h1>
        )}
      </div>
      {!showQuestions && (
        <div
          data-aos="zoom-in-up"
          data-aos-duration="800"
          className={styles.FormContainer}
        >
          <JobForm
            setShowResponse={setShowResponse}
            setResponseMessage={setResponseMessage}
            setSuccessResponse={setSuccessResponse}
            getJobIdFromPost={getJobIdFromPost}
          />
        </div>
      )}
      {showQuestions && (
        <div
          data-aos="zoom-in-up"
          data-aos-duration="800"
          className={styles.FormContainer}
        >
          <JobQuestionsForm
            setShowResponse={setShowResponse}
            setResponseMessage={setResponseMessage}
            setSuccessResponse={setSuccessResponse}
            jobId={jobPostId}
          />
        </div>
      )}

      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </div>
  );
}

export default PostAJob;
