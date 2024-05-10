import styles from "./PostAJob.module.css";
import JobForm from "./JobForm";
import { useEffect, useState } from "react";
import AOS from "aos";
import FloatingPopup from "../../Components/Ui/FloatingPopup";

function PostAJob() {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.headerBox}>
        <h1 className={styles.mainHeader}>
          Post New <span>Job.</span>
        </h1>
      </div>
      <div
        data-aos="zoom-in-up"
        data-aos-duration="800"
        className={styles.FormContainer}
      >
        <JobForm
          setShowResponse={setShowResponse}
          setResponseMessage={setResponseMessage}
          setSuccessResponse={setSuccessResponse}
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
}

export default PostAJob;
