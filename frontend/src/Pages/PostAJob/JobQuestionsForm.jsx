import React, { useEffect, useState } from "react";
import styles from "./JobForm.module.css";
import UpdateJobModal from "./UpdateJobModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faPlusSquare,
  faTrash,
  faYinYang,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getJobsDetails } from "../../util/Http";
import AddQuestionModal from "../../Components/Ui/AddQuestionModal";
import QuestionBox from "../../Components/Ui/QuestionBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobQuestionsForm = ({
  jobId,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState();
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state) => state.userInfo.token);
  const navigate = useNavigate();

  const { data, refetch } = useQuery({
    queryKey: ["jobDetails"],
    queryFn: () => getJobsDetails({ jobId, token }),
  });

  const saveQuestionIntoMainForm = (newQuestion) => {
    let exitingQuestion=questions.find((question)=>question.questionText===newQuestion.questionText);
    if(exitingQuestion){
      setResponseMessage({
        title:"question already exist",
        content:"this question already exist please create new one"
      })
      setShowResponse(true)
      setSuccessResponse(false)
    }
    else{
      let updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
    }

  };

  const addJobQuestions = async () => {
    setIsLoading(true);
    if (questions.length > 0) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_Base_API_URl}jobs/${jobId}/questions`,
          {questions:questions},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === "success") {
          console.log(response);

          setResponseMessage({
            title: "Added Successfully",
            content: "Your Questions has been Added successfully",
          });
          setSuccessResponse(true);
          setShowResponse(true);
          setIsLoading(false);
          navigate("/candidates");
        } else {
          setResponseMessage({
            title: "Request Faild",
            content: "Your Questions faild to be Added please try again",
          });
          setSuccessResponse(false);
          setShowResponse(true);
        }
      } catch (error) {
        console.error(error);
        setResponseMessage({
          title: "Request Faild",
          content: "Your Questions faild to be Added please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    } else {
      setResponseMessage({
        title: "Request Faild",
        content: "you must add at least one question to submit",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    }
    setIsLoading(false);
  };

  const deleteQuestion=(quesText)=>{
    let updatedQuestions=questions.filter((question)=>question.questionText!==quesText);
    setQuestions(updatedQuestions)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className={styles.questions}>
        {questions.length > 0 ? (
          <div>
            {questions.map((question) => (
              <QuestionBox
                key={question.questionText}
                questionText={question.questionText}
                type={question.type}
                deleteQuestion={deleteQuestion}
              />
            ))}
          </div>
        ) : (
          <span className="text-dark">Start Adding Questions For This Job</span>
        )}
        <div className={styles.questions_controller}>
          <FontAwesomeIcon
            title="Add Questions"
            onClick={() => setShowQuestionModal(true)}
            icon={faPlusSquare}
            className={styles.add_question_icon}
          />
          {questions.length > 0 &&<FontAwesomeIcon
            title="Remove All"
            onClick={() => setQuestions([])}
            icon={faTrash}
            className={styles.remove_questions}
          />}
        </div>
      </div>

      <div className="text-end">
        <div className="d-flex justify-content-between align-items-center mt-3 px-2">
          <button
            className={styles.Ediet_btn}
            type="button"
            onClick={() => setShowModal(true)}
          >
            <FontAwesomeIcon className="me-2" icon={faArrowLeft} />
            Ediet Job
          </button>
          {isLoading ? (
            <button
              className={styles.save_btn_question}
              type="button"
            >
              <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
            </button>
          ) : (
            <button
              onClick={addJobQuestions}
              className={styles.save_btn_question}
              type="submit"
            >
              Submit All{" "}
              <FontAwesomeIcon className="ms-2" icon={faArrowRight} />
            </button>
          )}
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
      <AddQuestionModal
        onHide={() => setShowQuestionModal(false)}
        show={showQuestionModal}
        setShowResponse={setShowResponse}
        setResponseMessage={setResponseMessage}
        setSuccessResponse={setSuccessResponse}
        saveQuestionIntoMainForm={saveQuestionIntoMainForm}
      />
    </>
  );
};

export default JobQuestionsForm;
