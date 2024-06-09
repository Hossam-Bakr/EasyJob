import React, { useEffect, useState } from "react";
import MainButtonTwo from "../../Components/Ui/MainButtonTwo";
import styles from "./JobForm.module.css";
import UpdateJobModal from "./UpdateJobModal";
import FloatingPopup from "../../Components/Ui/FloatingPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getJobsDetails } from "../../util/Http";

const JobQuestionsForm = ({ jobId }) => {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState();
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [showResponse, setShowResponse] = useState(false);
  const [successResponse, setSuccessResponse] = useState(true);


  const token = useSelector((state) => state.userInfo.token);

  const { data, refetch } = useQuery({
    queryKey: ["jobDetails"],
    queryFn: () => getJobsDetails({ jobId, token }),
  });
  console.log("data",data)
  console.log(jobId);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  
  return (
    <>
      <div className={styles.no_questions}>
        {questions.length > 0 ? (
          <div></div>
        ) : (
          <span className="text-dark">Start Adding Questions For This Job</span>
        )}
        <div className="text-start">
          <MainButtonTwo text="Add Questions" />
        </div>
      </div>
      <div className="text-end">
        <div className="d-flex justify-content-between align-items-center mt-3 px-2">
          <button className={styles.Ediet_btn} type="button" onClick={()=>setShowModal(true)}>
            <FontAwesomeIcon className="me-2" icon={faArrowLeft}/>Ediet Job
          </button>
          <button className={styles.save_btn_question} type="submit">
            Submit All <FontAwesomeIcon className="ms-2" icon={faArrowRight}/>
          </button>
        </div>
      </div>
      <UpdateJobModal
        onHide={() => setShowModal(false)}
        show={showModal}
        jobId={jobId}
        data={data}
        setShowResponse={setShowResponse}
        setResponseMessage={setResponseMessage}
        setSuccessResponse={setSuccessResponse}
        refetch={refetch}
      />
      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </>
  );
};

export default JobQuestionsForm;
