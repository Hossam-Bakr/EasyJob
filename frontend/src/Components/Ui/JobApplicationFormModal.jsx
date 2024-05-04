import React, { useEffect, useState } from "react";
import styles from "./JobApplicationForm.module.css";
import { useQuery } from "@tanstack/react-query";
import { getJobApplications } from "../../util/Http";
import JobApplicationForm from "./JobApplicationForm";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import FloatingPopup from "./FloatingPopup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import exam from "../../images/exam.png";
import AOS from "aos";

const JobApplicationFormModal = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const { jobId } = useParams();
  const token = localStorage.getItem("token");

  const { data } = useQuery({
    queryKey: ["jobApplicationForm"],
    queryFn: () => getJobApplications({ jobId, token }),
  });

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {data ? (
        <div className={styles.container}>
          <div className={styles.layer}></div>
          <div className={styles.title}>
            <h3 className={styles.main_title}>Let's Get to Know You Better</h3>
            <span className="mini_word">
              the form is an opportunity for applicants to showcase their
              qualifications and personality, Your Gateway to Opportunity: Start
              Here with Our Application Form <br />
              Unlock Your Potential: Complete Our Job Application Form
            </span>
          </div>

          <Row
            className={styles.form_container}
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <Col md={12} className={styles.img_side}>
              <img src={exam} alt="exam" />
            </Col>
            <Col md={12} className={styles.application_form_content}>
              <JobApplicationForm
                questions={data.data?.job?.Questions}
                setResponseMessage={setResponseMessage}
                setSuccessResponse={setSuccessResponse}
                setShowResponse={setShowResponse}
              />
            </Col>
          </Row>
        </div>
      ) : (
        <Loading />
      )}
      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </>
  );
};

export default JobApplicationFormModal;
