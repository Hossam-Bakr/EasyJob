import React, { useEffect, useState } from "react";
import styles from "./CompanyDashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowUp,
  faCrown,
  faEnvelopeOpenText,
  faGear,
  faHouse,
  faIdCardClip,
  faPhoneVolume,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Packageconsumption from "../../Components/charts/Packageconsumption";
import TotalApplications from "../../Components/charts/TotalApplications";
import ListedEmployees from "./../../Components/Ui/ListedEmployees";
import CompanyAccountSetting from "./../AccountSetting/CompanyAccountSetting";
import ContactUs from "./../ContactUs/ContactUs";
import { useSelector } from "react-redux";
import noAvatar from "../../images/noLogo.jpg";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getJobApplications, scheduleInterview } from "../../util/Http";

const CompanyDashboard = () => {
  const [activeLink, setActiveLink] = useState("main");
  const companyProfileData = useSelector((state) => state.profileInfo.data);
  const [profileLogo, setProfileLogo] = useState(null);
  const navigate = useNavigate();

  const { companyId } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));

  const { data: jobApp } = useQuery({
    queryKey: ["jobApplicationsDashboard"],
    queryFn: () => getJobApplications({ jobId: companyId, token: token }),
  });
  console.log(jobApp);
  const { data: interviews } = useQuery({
    queryKey: ["interviews"],
    queryFn: () => scheduleInterview({ token: token, method: "get" }),
  });

  // const { data: subscription } = useQuery({
  //   queryKey: ["getSubscriptions"],
  //   queryFn: () => getSubscriptions({ token: token }),
  // });

  useEffect(() => {
    if (companyProfileData?.logo) {
      const logoURL = `http://127.0.0.1:3000/companies/${companyProfileData.logo}`;
      setProfileLogo(logoURL);
    }
  }, [companyProfileData]);

  const navigateToPackages = () => {
    navigate("/packages");
  };
  return (
    <>
      <div className={styles.profile_layer}></div>
      <Container className={styles.container}>
        <div className={styles.sideBar}>
          <div className={styles.company_header}>
            <img
              src={profileLogo ? profileLogo : noAvatar}
              alt="company Logo"
            />
            <h3>{companyProfileData?.Company?.name}</h3>
          </div>
          <ul>
            <li
              className={activeLink === "main" ? styles.active_link : ""}
              onClick={() => setActiveLink("main")}
            >
              <FontAwesomeIcon icon={faHouse} />
              <h6 className={styles.side_name}>main</h6>
            </li>
            <li
              className={activeLink === "analysis" ? styles.active_link : ""}
              onClick={() => setActiveLink("analysis")}
            >
              <FontAwesomeIcon icon={faIdCardClip} />
              <h6>Analysis</h6>
            </li>
            <li
              className={activeLink === "candidates" ? styles.active_link : ""}
              onClick={() => setActiveLink("candidates")}
            >
              <FontAwesomeIcon icon={faUserTie} />
              <h6>candidates</h6>
            </li>
            <li
              className={activeLink === "Interview" ? styles.active_link : ""}
              onClick={() => setActiveLink("Interview")}
            >
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
              <h6>Interview</h6>
            </li>
            <li
              className={activeLink === "setting" ? styles.active_link : ""}
              onClick={() => setActiveLink("setting")}
            >
              <FontAwesomeIcon icon={faGear} />
              <h6>setting</h6>
            </li>
            <li
              className={activeLink === "contact" ? styles.active_link : ""}
              onClick={() => setActiveLink("contact")}
            >
              <FontAwesomeIcon icon={faPhoneVolume} />
              <h6>contact</h6>
            </li>
          </ul>
        </div>

        <div className={styles.dashboard_body}>
          <Container className="my-5">
            <Row className="gy-5">
              {activeLink === "main" && (
                <>
                  <Col md={8}>
                    <div className={`${styles.box} ${styles.plan}`}>
                      <div className="d-flex justify-content-between">
                        <h6>
                          <FontAwesomeIcon
                            className={styles.crown}
                            icon={faCrown}
                          />{" "}
                          <br />
                          <span className={`${styles.plan_date} mini_word`}>
                            7 days left
                          </span>
                        </h6>
                        <span className={styles.price}>$2500/month</span>
                      </div>
                      <div>
                        <ul>
                          <li className="my-1">
                            <FontAwesomeIcon
                              className="me-2 text-warning"
                              icon={faArrowRight}
                            />
                            <span>Invitations</span>
                          </li>
                          <li className="my-1">
                            <FontAwesomeIcon
                              className="me-2 text-warning"
                              icon={faArrowRight}
                            />
                            <span>Posts</span>
                          </li>
                          <li className="my-1">
                            <FontAwesomeIcon
                              className="me-2 text-warning"
                              icon={faArrowRight}
                            />
                            <span>Invitations</span>
                          </li>
                          <li className="my-1">
                            <FontAwesomeIcon
                              className="me-2 text-warning"
                              icon={faArrowRight}
                            />
                            <span>Unlocks</span>
                          </li>
                        </ul>
                      </div>
                      <div className={styles.plan_btns}>
                        <button className={styles.upgrade_btn} title="upgrade">
                          <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <button
                          onClick={navigateToPackages}
                          className={styles.recharge_btn}
                        >
                          Recharge
                        </button>
                      </div>{" "}
                    </div>
                  </Col>
                </>
              )}

              <>
                {(activeLink === "main" ||
                  activeLink === "candidates" ||
                  activeLink === "analysis") && (
                  <Col md={4}>
                    <div className={`${styles.box} ${styles.consumption}`}>
                      <Packageconsumption />
                    </div>
                  </Col>
                )}
                {(activeLink === "main" ||
                  activeLink === "jobs" ||
                  activeLink === "candidates" ||
                  activeLink === "analysis") && (
                  <Col md={12}>
                    <div className={`${styles.box} ${styles.applications}`}>
                      <TotalApplications />
                    </div>
                  </Col>
                )}
                {(activeLink === "main" || activeLink === "candidates") && (
                  <Col md={12}>
                    <div className={`${styles.box}`}>
                      <h5 className="fw-bold mt-3">Accepted Employees</h5>
                      <table className={`${styles.employee_table} my-4`}>
                        <thead>
                          <tr className={styles.table_header}>
                            <th>Employee</th>
                            <th>title</th>
                            <th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jobApp?.data?.applications?.map((employee) => {
                            return (
                              <tr key={employee.id}>
                                <ListedEmployees
                                  id={employee.id}
                                  UserId={employee.UserId}
                                  // JobId={employee.JobId}
                                />
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                )}

                {(activeLink === "main" ||
                  activeLink === "candidates" ||
                  activeLink === "Interview") && (
                  <Col md={12}>
                    <div className={`${styles.box}`}>
                      <h5 className="fw-bold mt-3">Interview Schedule</h5>
                      <table className={`${styles.employee_table} my-4`}>
                        <thead>
                          <tr className={styles.table_header}>
                            <th>Employee</th>
                            <th>Date</th>
                            <th>Job</th>
                          </tr>
                        </thead>
                        <tbody>
                          {interviews?.data?.map((interview) => {
                            return (
                              <tr key={interview.id}>
                                <ListedEmployees
                                  id={interview.id}
                                  interview={interview}
                                  type="interview"
                                  UserId={interview.UserId}
                                />
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                )}

                {activeLink === "setting" && (
                  <Col md={12}>
                    <div className={styles.box}>
                      <CompanyAccountSetting />
                    </div>
                  </Col>
                )}
                {activeLink === "contact" && (
                  <Col md={12}>
                    <ContactUs />
                  </Col>
                )}
              </>
            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
};

export default CompanyDashboard;
