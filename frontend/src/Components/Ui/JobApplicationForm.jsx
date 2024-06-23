import React, { useEffect, useState } from "react";
import styles from "./JobApplicationForm.module.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { AudioRecorder } from "react-audio-voice-recorder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MainButton from "./MainButton";

const JobApplicationForm = ({
  questions,
  setResponseMessage,
  setSuccessResponse,
  setShowResponse,
}) => {
  const { jobId } = useParams();
  const [record, setRecord] = useState(null);
  const [formValues, setFormValues] = useState(new FormData());
  const [voicesAnswers, setVoicesAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noVoiceQuestions, setNoVoiceQuestions] = useState([]);
  const [voiceQuestions, setVoiceQuestions] = useState([]);

  const token = useSelector((state) => state.userInfo.token);
  const navigate = useNavigate();

  const addAudioElement = (blob, id) => {
    const url = URL.createObjectURL(blob);
    setRecord(url);
    const file = new File([blob], `recorder.webm`, { type: "audio/webm" });
    let newVoice = { id, file };
    let existVoice = voicesAnswers.find((voice) => voice.id === id);
    if (existVoice) {
      voicesAnswers[existVoice] = newVoice;
    } else {
      let updatedVoiceAnswers = [...voicesAnswers, newVoice];
      setVoicesAnswers(updatedVoiceAnswers);
    }
  };

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

  const clearDataOnLeave=()=>{
    setNoVoiceQuestions([])
    setVoiceQuestions([])
  }

  useEffect(() => {
    seperateQuestions();
    return()=>{
      clearDataOnLeave();
    }
  }, [questions]);

  const saveData = (e) => {
    let inputElement = e.target;
    const qnumber = inputElement.getAttribute("data-qnumber");
    const question = inputElement.getAttribute("data-question");
    const value = inputElement.value;
    const newName = inputElement.name;

    formValues.append(`${question}`, qnumber);
    formValues.append(`${newName}`, value);
  };

  const handleSubmittedForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (voicesAnswers.length > 0) {
      console.log("myAnswers", voicesAnswers);
      voicesAnswers.map((voice, index) => {
        formValues.append(`voiceAnswer${index + 1}`, voice.file);
        formValues.append(`voices[${index}][voiceAnswer]`, `${index + 1}`);
        formValues.append(`voices[${index}][QuestionId]`, `${voice.id}`);
        return null;
      });
    }

    if (formValues && token) {
      const formDataObject = {};
      for (const [key, value] of formValues.entries()) {
        formDataObject[key] = value;
      }
      console.log(formDataObject);
      try {
        const res = await axios.post(
          `http://127.0.0.1:3000/api/v1/jobs/${jobId}/apply`,
          formValues,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            },
          }
        );
        console.log("response", res);
        if (res.statusText === "Created") {
          setResponseMessage({
            title: "Sent Successfully",
            content: "your Answers have been sent successfully",
          });
          setSuccessResponse(true);
          setShowResponse(true);
          navigate("/jobs");
        } else {
          setResponseMessage({
            title: "Request Faild",
            content: "your Answers faild to be sent please try again",
          });
          setSuccessResponse(false);
          setShowResponse(true);
        }
      } catch (error) {
        if (
          error.response.data.message ===
          "You have already applied for this job"
        ) {
          setResponseMessage({
            title: "Already Applied",
            content: "You have already applied for this job",
          });
          setSuccessResponse(false);
          setShowResponse(true);
        }
        if (
          error.response.data.message === "You must answer all the questions"
        ) {
          setResponseMessage({
            title: "Answer All Questions",
            content: "You Must Answer All the Questions",
          });
          setSuccessResponse(false);
          setShowResponse(true);
        }
        console.log("error", error);
      }
    }

    setIsLoading(false);
    setVoicesAnswers([]);
    setFormValues(new FormData());
    // setRecord(null);
    // myClaerButtonRef.current.click();
  };

  return (
    <>
      {questions?.length !== 0 ? (
        <form onSubmit={handleSubmittedForm}>
          <>
            {noVoiceQuestions.map((question, index) =>
              question.type === "text" ? (
                //text question

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
                    name={`answers[${index}][textAnswer]`}
                    data-question={`answers[${index}][QuestionId]`}
                    data-qnumber={question.id}
                    onChange={saveData}
                    id={`textQuestion${index}`}
                  />
                </div>
              ) : (
                //yes/no question

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
                            name={`answers[${index}][yesNoAnswer]`}
                            data-question={`answers[${index}][QuestionId]`}
                            data-qnumber={question.id}
                            value={true}
                            onChange={saveData}
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
                            name={`answers[${index}][yesNoAnswer]`}
                            data-question={`answers[${index}][QuestionId]`}
                            data-qnumber={question.id}
                            onChange={saveData}
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
                    <AudioRecorder
                      onRecordingComplete={(blob) =>
                        addAudioElement(blob, question.id)
                      }
                      audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                      }}
                      downloadOnSavePress={false}
                      downloadFileExtension="webm"
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
            There is no questions for this job
          </h4>
          <div className="text-center">
            <MainButton text="submit" />
          </div>
        </div>
      )}
    </>
  );
};

export default JobApplicationForm;

