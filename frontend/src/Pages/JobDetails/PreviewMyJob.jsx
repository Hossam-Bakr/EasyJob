import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJobsDetails } from "../../util/Http";
import Loading from "../../Components/Ui/Loading";
import styles from "./JobDetails.module.css";
import noLogo from "../../images/noLogo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faBriefcase,
  faClock,
  faCoins,
  faCopy,
  faEdit,
  faMapLocationDot,
  faShare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { formatedTimeHandler } from "../../Components/logic/Logic";
import MainButtonTwo from "../../Components/Ui/MainButtonTwo";
import { Badge, Col, Container, Dropdown, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import FloatingPopup from "../../Components/Ui/FloatingPopup";
import CustomDropDownItem from "../../Components/Ui/CustomDropDownItem";
import SectionMainTitle from "../../Components/Ui/SectionMainTitle";
import EasyJobLocation from "../../Components/Maps/EasyJobLocation";
import ConfirmModal from "../../Components/Ui/ConfirmModal";
import UpdateJobModal from "../PostAJob/UpdateJobModal";
const PreviewMyJob = () => {
  const { jobId } = useParams();
  const [profilePic, setProfilePic] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [showModal, setShowModal] = useState();

  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);
  const [formatedTime, setFormatedTime] = useState("");
  const token = useSelector((state) => state.userInfo.token);
  const textRef = useRef(null);
  const navigate = useNavigate();

  const { data, refetch } = useQuery({
    queryKey: ["jobDetails"],
    queryFn: () => getJobsDetails({ jobId, token }),
  });

  const handleCopy = () => {
    const textToCopy = textRef.current.innerText;
    navigator.clipboard
      .writeText(textToCopy)
      .catch((error) => console.error("Failed to copy:", error));
  };

  const navigateToJobStages = () => {
    navigate(`/stages/${jobId}`);
  };

  const navigateToDashboard = () => {
    navigate(`/company-dashboard/${data?.CompanyId}`);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                  <Link to={`/company-profile/${data.CompanyId}`}>
                    <h4>{data.Company.name} </h4>
                  </Link>
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
                      Min Experience {data.minExperience}{" "}
                      {data.minExperience > 1 ? "years" : "year"}
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className="special_main_color me-1"
                        icon={faMapLocationDot}
                      />
                      {data.city},{data.country}
                    </li>

                    <li>
                      <FontAwesomeIcon
                        className="special_main_color me-1"
                        icon={faCoins}
                      />
                      <span>
                        Salary: ({data.salaryRangeMin} to {data.salaryRangeMax})
                      </span>
                      <span className="special_main_color"> $</span>
                    </li>

                    <li>
                      <FontAwesomeIcon
                        className="special_main_color me-1"
                        icon={faBrain}
                      />
                      {data.careerLevel}
                    </li>
                  </ul>
                </Col>
                <Col md={6} className="d-flex flex-column align-items-end">
                  <div className="d-flex justify-content-center align-items-start">
                    <div
                      className={styles.bookmark_icon}
                      title="ediet job"
                      onClick={() => setShowModal(true)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
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
                                http://localhost:3001/preview-job/{jobId}
                              </p>
                            </span>
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <div
                      className={`${styles.bookmark_icon} bg-danger text-white`}
                      title="delete job"
                      onClick={() => setConfirmModalShow(true)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                  </div>
                  <div className="mt-1">
                    <MainButtonTwo
                      onClick={navigateToJobStages}
                      text="Control Stages"
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div>
              <hr className="my-5" />
              <div>
                <section className={styles.det_section}>
                  <h2 className={styles.sec_title}>Job Description</h2>
                  <div className={styles.requirements_div}>
                    <p>{data.description}</p>
                  </div>
                </section>

                <section className={styles.det_section}>
                  <h2 className={styles.sec_title}>Job Requirements</h2>
                  <div
                    className={styles.requirements_div}
                    dangerouslySetInnerHTML={{ __html: data.requirements }}
                  />
                </section>

                <div>
                  <h3 className={styles.sec_title}>Required Skills</h3>
                  <section
                    className={` ${styles.skills_div} ${styles.det_section} py-5 position-relative`}
                  >
                    <Container className="my-4">
                      <Row className={`${styles.candidate_skills} gy-2 w-100`}>
                        {data.RequiredSkills.map((skill) => (
                          <Col
                            sm={3}
                            lg={2}
                            title={`skill level is (${
                              skill.minLevel === 2
                                ? "mid-level"
                                : skill.minLevel === 3
                                ? "expert"
                                : "entry-level"
                            }) & min years of experience from (${
                              skill.minYearsOfExperience
                            }) years`}
                            className={`${styles.skill} ${
                              skill.minLevel === 2
                                ? styles.orange
                                : skill.minLevel === 3
                                ? styles.green
                                : styles.red
                            } mx-2 position-relative`}
                            key={skill.id}
                          >
                            <span>{skill.name}</span>
                            <Badge
                              className={`${
                                skill.minLevel === 2
                                  ? "bg-warning"
                                  : skill.minLevel === 3
                                  ? "bg-success"
                                  : "bg-danger"
                              } position-absolute top-0 start-100 translate-middle badge rounded-pill`}
                            >
                              {skill?.minYearsOfExperience}
                            </Badge>
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
                </div>

                <hr className="my-5" />
                <section className="my-5 py-5">
                  <section className={` ${styles.ourLocation}`}>
                    <SectionMainTitle title="Job Location on Map" />
                    <EasyJobLocation myPosition={data.location?.coordinates} />
                  </section>
                </section>
              </div>
            </div>
          </div>
          <FloatingPopup
            showResponse={showResponse}
            setShowResponse={setShowResponse}
            message={responseMessage}
            success={successResponse}
          />
          <ConfirmModal
            show={confirmModalShow}
            onHide={() => setConfirmModalShow(false)}
            jobId={jobId}
            btnText="Delete"
            text="Are you sure you want to delete this job"
            type="deleteJob"
            refetch={navigateToDashboard}
            setShowResponse={setShowResponse}
            setResponseMessage={setResponseMessage}
            setSuccessResponse={setSuccessResponse}
          />
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
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default PreviewMyJob;
