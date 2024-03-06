import React, { useState } from "react";
import SectionMainTitle from "./../../Components/Ui/SectionMainTitle";
import styles from "./Saved.module.css";
import JobItem from "../../Components/Ui/JobItem";
import MainBtnThree from "./../../Components/Ui/MainBtnThree";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import FloatingPopup from "../../Components/Ui/FloatingPopup";
import { Link } from "react-router-dom";
import emptyCart from "../../images/emptyCart.jpg";

const Saved = () => {
  // const mySavedJobs = [
  //   {
  //     key: 1,
  //     name: "huwawei",
  //     jobTitle: "Call Center",
  //     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
  //     logo: "L2",
  //     full: true,
  //     remote: true,
  //     part: false,
  //     freelance: false,
  //     country:"Egypt",
  //     city:"Cairo",
  //     time: "5 min",
  //   },
  //   {
  //     key: 2,
  //     name: "Huwawei",
  //     jobTitle: "Electrical Engineer",
  //     desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
  //     logo: "L2",
  //     full: true,
  //     remote: true,
  //     part: false,
  //     freelance: false,
  //     country:"Egypt",
  //     city:"Cairo",
  //     time: "2 days",
  //   },
  //   {
  //     key: 3,
  //     name: "huwawei",
  //     jobTitle: "Frontend React Developer",
  //     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
  //     logo: "L2",
  //     freelance: true,
  //     full: true,
  //     part: false,
  //     remote: false,
  //     country:"Egypt",
  //     city:"Cairo",
  //     time: "5 months",
  //   },
  //   {
  //     key: 4,
  //     name: "huwawei",
  //     jobTitle: "Financial Advisor",
  //     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
  //     logo: "L2",
  //     part: true,
  //     freelance: true,
  //     remote: false,
  //     full: false,
  //     country:"Egypt",
  //     city:"Cairo",
  //     time: "2 years",
  //   },
  // ];
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
                      id={job}
                      key={job.id}
                      name={job.name}
                      jobTitle={job.jobTitle}
                      req={job.req}
                      logo={job.logo}
                      type={job.type}
                      workplace={job.workplace}
                      time={job.time}
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

                <div className="text-center">
                  <MainBtnThree text="Load More" />
                </div>
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
        <span className="mini_word">you didnot add any job yet, explore new jobs <Link className="special_main_color" to={"/jobs"}>here</Link></span>
        </div>
       </div>
      )}
    </>
  );
};

export default Saved;
