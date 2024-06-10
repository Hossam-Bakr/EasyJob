import React, { useState } from "react";
import SectionMainTitle from "./../../Components/Ui/SectionMainTitle";
import styles from "./Saved.module.css";
import JobItem from "../../Components/Ui/JobItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import FloatingPopup from "../../Components/Ui/FloatingPopup";
import { Link } from "react-router-dom";
import emptyCart from "../../images/emptyCart.jpg";

const Saved = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const mySavedJobs = useSelector((state) => state.savedJobs.jobData);
  
  return (
    <>
      {mySavedJobs.length !== 0 ? (
        <>
          <Container className="my-5">
            <SectionMainTitle title="Manage Your Saved Jobs" />
            <div className={`${styles.main_style} ${styles.job_section}`}>
              <Row className="mt-4">
                {mySavedJobs.map((job) => {
                  return (
                    <JobItem
                      id={job.SavedJob.id}
                      jobId={job.id}
                      key={job.SavedJob.id}
                      name={job.Company.name}
                      jobTitle={job.title}
                      req={job.requirements}
                      type={job.type}
                      workplace={job.workplace}
                      time={job.SavedJob.createdAt}
                      careerLevel={job.careerLevel}
                      grid={false}
                      profile={true}
                      country={job.country}
                      city={job.city}
                      formatType="saved"
                      setResponseMessage={setResponseMessage}
                      setSuccessResponse={setSuccessResponse}
                      setShowResponse={setShowResponse}
                    />
                  );
                })}
              </Row>
            </div>
          </Container>
          <FloatingPopup
            showResponse={showResponse}
            setShowResponse={setShowResponse}
            message={responseMessage}
            success={successResponse}
          />
        </>
      ) : (
       <div className={styles.emptyCart_container}>
        <div className={styles.emptyCart}>
        <img src={emptyCart} alt="emptyCart" />
        <span className="mini_word">You Didn't Add any job yet, explore new jobs <Link className="special_main_color" to={"/jobs"}>here</Link></span>
        </div>
       </div>
      )}
    </>
  );
};

export default Saved;
