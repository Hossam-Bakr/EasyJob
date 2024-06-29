import React, { useEffect, useState } from "react";
import styles from "./JobApplicationForm.module.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MainButton from "./MainButton";
import UploadVoiceRecord from "../UploadVoice/UploadVoiceRecord";

const JobApplicationForm = ({
  questions,
  setResponseMessage,
  setSuccessResponse,
  setShowResponse,
}) => {
  const { jobId } = useParams();
  const [record, setRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [noVoiceQuestions, setNoVoiceQuestions] = useState([]);
  const [voiceQuestions, setVoiceQuestions] = useState([]);
  const [myAnswers, setMyAnswers] = useState([]);
  const token = useSelector((state) => state.userInfo.token);
  const navigate = useNavigate();

  const seperateQuestions = () => {
    const noVoice = [];
    const voice = [];
    questions.forEach((question) => {
      if (question.type === "text" || question.type === "yes/no") {
        noVoice.push(question);
      } else if (question.type === "voice") {
        voice.push(question);
      }
    });
    setNoVoiceQuestions(noVoice);
    setVoiceQuestions(voice);
  };

  const clearDataOnLeave = () => {
    setNoVoiceQuestions([]);
    setVoiceQuestions([]);
  };

  useEffect(() => {
    seperateQuestions();
    return () => {
      clearDataOnLeave();
    };
  }, [questions]);

  const saveNoVoiceData = (e) => {
    let inputElement = e.target;
    const qnumber = inputElement.getAttribute("data-qnumber");
    const value = inputElement.value;

    setMyAnswers((prevAnswers) => [
      ...prevAnswers.filter(answer => answer.QuestionId !== qnumber),
      { QuestionId: `${qnumber}`, answer: `${value}` },
    ]);
  };

  const saveVoiceDataLink = (myLink, id, myRecord) => {
 
    const filteredAnswers=myAnswers.filter((answer) => Number(answer.QuestionId) !== id)
    setMyAnswers([...filteredAnswers,{ QuestionId: `${id}`, answer: myLink }],
    );
  };

  const handleSubmittedForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(myAnswers)
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_Base_API_URl}jobs/${jobId}/apply`,
        { answers: myAnswers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", res);
      if (res.status === 201) {
        setResponseMessage({
          title: "Sent Successfully",
          content: "Your answers have been sent successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
        navigate("/jobs");
      } else {
        setResponseMessage({
          title: "Request Failed",
          content: "Your answers failed to be sent, please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    } catch (error) {
      if (error.response.data.message === "You have already applied for this job") {
        setResponseMessage({
          title: "Already Applied",
          content: "You have already applied for this job",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
      if (error.response.data.message === "You must answer all the questions") {
        setResponseMessage({
          title: "Answer All Questions",
          content: "You must answer all the questions",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
      console.log("error", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {questions?.length !== 0 ? (
        <form onSubmit={handleSubmittedForm}>
          <>
            {noVoiceQuestions.map((question, index) =>
              question.type === "text" ? (
                <div
                  className={`${styles.input_field} ${styles.checks_group}`}
                  key={question.id}
                >
                  <label
                    className={styles.question_label}
                    htmlFor={`textQuestion${index}`}
                  >
                    {question.questionText}
                  </label>
                  <input
                    type="text"
                    data-qnumber={question.id}
                    onChange={saveNoVoiceData}
                    id={`textQuestion${index}`}
                  />
                </div>
              ) : (
                <div
                  className={`${styles.input_field} ${styles.checks_group}`}
                  key={question.id}
                >
                  <label className={styles.question_label}>
                    {question.questionText}
                  </label>
                  <div>
                    <Row
                      className={`${styles.select_group} gy-1`}
                      role="group"
                      aria-label="Basic radio toggle button group"
                    >
                      <Col
                        className="d-flex justify-content-center align-items-center"
                        sm={6}
                      >
                        <div className="d-flex justify-content-center align-items-center">
                          <input
                            type="radio"
                            className="btn-check"
                            id={`answerYes${index}`}
                            data-qnumber={question.id}
                            value={true}
                            onChange={saveNoVoiceData}
                            autoComplete="off"
                          />
                          <label
                            className={`${styles.yesNoLabel} btn btn-outline-primary`}
                            htmlFor={`answerYes${index}`}
                          >
                            Yes
                          </label>
                        </div>
                      </Col>

                      <Col
                        className="d-flex justify-content-center align-items-center "
                        sm={6}
                      >
                        <div className="d-flex justify-content-center align-items-center">
                          <input
                            type="radio"
                            className="btn-check"
                            id={`answerNo${index}`}
                            data-qnumber={question.id}
                            onChange={saveNoVoiceData}
                            value={false}
                            autoComplete="off"
                          />
                          <label
                            className={`${styles.yesNoLabel} btn btn-outline-primary`}
                            htmlFor={`answerNo${index}`}
                          >
                            No
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              )
            )}

            {voiceQuestions &&
              voiceQuestions.map((question) => (
                <div
                  className={`${styles.input_field} ${styles.checks_group}`}
                  key={question.id}
                >
                  <label className={styles.question_label}>
                    {question.questionText}
                  </label>
                  <div className={styles.record_field}>
                    <UploadVoiceRecord
                      question={question}
                      saveVoiceDataLink={saveVoiceDataLink}
                      setResponseMessage={setResponseMessage}
                      setSuccessResponse={setSuccessResponse}
                      setShowResponse={setShowResponse}
                    />
                  </div>

                  <div className={styles.record_result}>
                    {record ? (
                      <audio src={record} controls></audio>
                    ) : (
                      <h6 className="mini_word">
                        Answer by Recording Your Voice
                      </h6>
                    )}
                  </div>
                </div>
              ))}
          </>

          <div className="text-center mt-4 mb-3">
            {isLoading ? (
              <button type="submit" className={styles.submit_btn}>
                <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
              </button>
            ) : (
              <button type="submit" className={styles.submit_btn}>
                Send Answer
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="px-5">
          <h4 className={`${styles.no_ques} alert alert-primary`}>
            There are no questions for this job
          </h4>
          <div className="text-center">
            <MainButton text="Submit" />
          </div>
        </div>
      )}
    </>
  );
};

export default JobApplicationForm;
