import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobsDetails, saveJobsHandler } from "../../util/Http";
import Loading from "../../Components/Ui/Loading";
import styles from "./JobDetails.module.css";
import noLogo from "../../images/noLogo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faClock,
  faCoins,
  faCopy,
  faEnvelope,
  faMapLocationDot,
  faPhone,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { formatedTimeHandler } from "../../Components/logic/Logic";
import MainButtonTwo from "../../Components/Ui/MainButtonTwo";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { getSavedJobsHandler } from "../../Store/savedJobs-actions";
import FloatingPopup from "../../Components/Ui/FloatingPopup";
import CustomDropDownItem from "../../Components/Ui/CustomDropDownItem";

const JobDetails = () => {
  const params = useParams();
  const [profilePic, setProfilePic] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);
  const [formatedTime, setFormatedTime] = useState("");
  const token = useSelector((state) => state.userInfo.token);
  const dispatch = useDispatch();
  const textRef = useRef(null);

  const { data } = useQuery({
    queryKey: ["jobDetails"],
    queryFn: () => getJobsDetails(params.jobId),
  });
  console.log(data);
  const saveJobPost = async () => {
    if (token) {
      const res = await saveJobsHandler({ jobId: params.jobId, token: token });

      if (res.status === "success") {
        setResponseMessage({
          title: "Saved Successfully",
          content: "Your Job Added To Saved Jobs successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
      } else if (res === "Job already saved") {
        setResponseMessage({
          title: "Job Already Saved",
          content: "Your Job Already Added To Saved Jobs",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      } else {
        setResponseMessage({
          title: "Faild to Save job",
          content: "Your Job Did not Add To Saved Jobs Please try again later",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
      dispatch(getSavedJobsHandler(token));
    }
  };

  const handleCopy = () => {
    const textToCopy = textRef.current.innerText;
    navigator.clipboard
      .writeText(textToCopy)
      .catch((error) => console.error("Failed to copy:", error));
  };

  useEffect(() => {
    if (data) {
      if (data.Company) {
        if (data.Company.CompanyProfile) {
          if (data.Company.CompanyProfile.logo) {
            setProfilePic(null);
            const profileLogoUrl = `http://127.0.0.1:3000/companies/${data.Company.CompanyProfile.logo}`;
            setProfilePic(profileLogoUrl);
          }
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      formatedTimeHandler(data.createdAt, setFormatedTime);
    }
  }, [data]);

  return (
    <>
      {data ? (
        <>
          <div className={styles.profile_layer}></div>
          <div className={styles.main_container}>
            <div className={styles.job_header}>
              <div className={styles.company_logo}>
                <img src={profilePic ? profilePic : noLogo} alt="profilePic" />
              </div>
              <div className={styles.header_caption}>
                <h1>{data.title}</h1>
                <div
                  className={`${styles.name} w-100 d-flex justify-content-between align-items-center mt-1`}
                >
                  <h4>{data.Company.name} </h4>
                  <span> {data.openPositions} Open Position</span>
                </div>
                <span className="mini_word">
                  <FontAwesomeIcon icon={faClock} className="me-1" />
                  {formatedTime}
                </span>
              </div>
            </div>
            <div className={styles.general_info}>
              <Row className="w-100 gy-2">
                <Col md={6}>
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        className="special_main_color me-1"
                        icon={faClock}
                      />
                      {data.type} - {data.workplace}
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className="special_main_color me-1"
                        icon={faBriefcase}
                      />{" "}
                      minimum {data.minExperience}{" "}
                      {data.minExperience > 1 ? "years" : "year"}
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className="special_main_color me-1"
                        icon={faMapLocationDot}
                      />
                      {data.city},{data.country}
                    </li>
                    {data.hideSalary === false && (
                      <li>
                        <FontAwesomeIcon
                          className="special_main_color me-1"
                          icon={faCoins}
                        />
                        {data.salaryRangeMin}:{data.salaryRangeMax}{" "}
                        <span className="special_main_color">$</span>
                      </li>
                    )}
                  </ul>
                </Col>
                <Col md={6} className="d-flex flex-column align-items-end">
                  <div className="d-flex justify-content-center align-items-start">
                    <div
                      className={styles.bookmark_icon}
                      title="save job"
                      onClick={saveJobPost}
                    >
                      <FontAwesomeIcon icon={faBookmark} />
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle
                        as={CustomDropDownItem}
                        id="dropdown-custom-components"
                      >
                        <div className={styles.bookmark_icon} title="share job">
                          <FontAwesomeIcon icon={faShare} />
                        </div>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={handleCopy}>
                          <div
                            className="d-flex align-items-center"
                            title="copy url"
                          >
                            <FontAwesomeIcon
                              icon={faCopy}
                              className="special_main_color me-1"
                            />
                            <span className="mini_word">
                              <p className="m-0" ref={textRef}>
                                http://localhost:3001/job-details/{params.jobId}
                              </p>
                            </span>
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="mt-1">
                    <MainButtonTwo text="Apply Now" />
                  </div>
                </Col>
              </Row>
            </div>
            <div>
              <Tabs
                defaultActiveKey="jobDetails"
                id="uncontrolled-tab-example"
                className="mb-5 mt-5"
                fill
              >
                <Tab eventKey="jobDetails" title="Job Details">
                  <section className={styles.det_section}>
                    <h2 className={styles.sec_title}>Job Description</h2>
                    <p>{data.description}</p>
                  </section>

                  <section className={styles.det_section}>
                    <h2 className={styles.sec_title}>Job Requirements</h2>
                    <p>{data.requirements}</p>
                  </section>

                  <section
                    className={`${styles.main_style} ${styles.det_section} py-5 position-relative`}
                  >
                    <h3 className={styles.sec_title}>Required Skills</h3>
                    <Container className="my-4 ">
                      <Row className={`${styles.candidate_skills} gy-2 w-100`}>
                        {data.RequiredSkills.map((skill) => (
                          <Col
                            sm={3}
                            lg={2}
                            className={`${styles.skill} ${
                              skill.minLevel === 2
                                ? styles.orange
                                : skill.minLevel === 3
                                ? styles.green
                                : styles.red
                            } mx-2`}
                            key={skill.id}
                          >
                            <span>{skill.name}</span>
                          </Col>
                        ))}
                      </Row>
                    </Container>
                    <div className={`${styles.skill_color} d-flex`}>
                      <div className="d-flex justify-content-center align-items-center mx-2">
                        <div className={styles.red_circle}></div>
                        <span className="mini_word">Entry</span>
                      </div>
                      <div className="d-flex justify-content-center align-items-center mx-2">
                        <div className={styles.yellow_circle}></div>
                        <span className="mini_word">Medium</span>
                      </div>
                      <div className="d-flex justify-content-center align-items-center mx-2">
                        <div className={styles.green_circle}></div>
                        <span className="mini_word">Expert</span>
                      </div>
                    </div>
                  </section>
                </Tab>
                <Tab eventKey="companyDetails" title="Company Details">
                  <div className={styles.company_details}>
                    <h2 className={styles.sec_title}>
                      Contact With {data.Company.name}
                    </h2>
                    <ul>
                      <li>
                        <FontAwesomeIcon
                          className="special_main_color me-1"
                          icon={faPhone}
                        />{" "}
                        {data.Company.phone}
                      </li>
                      <li>
                        <FontAwesomeIcon
                          className="special_main_color me-1"
                          icon={faEnvelope}
                        />
                        {data.Company.email}
                      </li>
                    </ul>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
          <FloatingPopup
            showResponse={showResponse}
            setShowResponse={setShowResponse}
            message={responseMessage}
            success={successResponse}
          />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default JobDetails;
