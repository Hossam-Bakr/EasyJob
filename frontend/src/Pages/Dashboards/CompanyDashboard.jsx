import React, { useState } from "react";
import styles from "./CompanyDashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faBriefcase,
  faCrown,
  faEnvelopeOpenText,
  faGear,
  faHouse,
  faIdCardClip,
  faPhoneVolume,
  faUserTie,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import huwawei from "../../images/logo/huwawei.webp";
import Packageconsumption from "../../Components/charts/Packageconsumption";
import AdminsInvitations from "./../../Components/charts/AdminsInvitations";
import TotalApplications from "../../Components/charts/TotalApplications";
import ListedEmployees from "./../../Components/Ui/ListedEmployees";
import CompanyAdmins from "../CompanyAdmins/CompanyAdmins";
import CompanyAccountSetting from "./../AccountSetting/CompanyAccountSetting";
import ContactUs from "./../ContactUs/ContactUs";
import CurrentJobs from "../../Components/Ui/CurrentJobs";
import { useQuery } from "@tanstack/react-query";
import { getCompanyRelatedJobs } from "../../util/Http";
import { useParams } from "react-router-dom";
import NoDataBox from "../../Components/Ui/NoDataBox";
import FloatingPopup from "../../Components/Ui/FloatingPopup";


const myEmployees = [
  {
    id: "e1",
    name: "Omar Nasr",
    title: "Software Engineering Team Leader",
    country: "Egypt",
    city: "Cairo",
    photo: "p1",
    type: "full-time",
    state: "pending",
  },
  {
    id: "e2",
    name: "Atef Alaa Eldin",
    title: "Frontend Developer Angular",
    country: "Egypt",
    city: "Cairo",
    photo: "p2",
    type: "part-time",
    state: "rejected",
  },
  {
    id: "e3",
    name: "Sameh GadAllah",
    title: "Accounting",
    country: "Egypt",
    city: "Cairo",
    photo: "p3",
    type: "full-time",
    state: "pending",
  },
  {
    id: "e4",
    name: "Ramdan Kareem",
    title: "Unit Tester| Mern Stack",
    country: "Egypt",
    city: "Cairo",
    photo: "p4",
    type: "full-time",
    state: "accepted",
  },
  {
    id: "e5",
    name: "Mohsen Ali",
    title: "sales & marketing director",
    country: "Egypt",
    city: "Cairo",
    photo: "p5",
    type: "freelance",
    state: "pending",
  },
  {
    id: "e6",
    name: "Mohand Mostafa",
    title: "Assistant Floor @Huwawei",
    country: "Egypt",
    city: "Cairo",
    photo: "p6",
    type: "part-time",
    state: "pending",
  },
];

const CompanyDashboard = () => {

  const [activeLink, setActiveLink] = useState("main");
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);
  const {companyId:id} = useParams();


  const { data: relatedJobs,refetch} = useQuery({
    queryKey: ["relatedJobs"],
    queryFn: () => getCompanyRelatedJobs({id}),
  });


  return (
    <>
      <div className={styles.profile_layer}></div>
      <Container className={styles.container}>
        <div className={styles.sideBar}>
          <div className={styles.company_header}>
            <img src={huwawei} alt="company Logo" />
            <h3>Huwawei</h3>
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
              className={activeLink === "jobs" ? styles.active_link : ""}
              onClick={() => setActiveLink("jobs")}
            >
              <FontAwesomeIcon icon={faBriefcase} />
              <h6>jobs</h6>
            </li>
            <li
              className={activeLink === "users" ? styles.active_link : ""}
              onClick={() => setActiveLink("users")}
            >
              <FontAwesomeIcon icon={faUsers} />
              <h6>users</h6>
            </li>
            <li
              className={activeLink === "candidates" ? styles.active_link : ""}
              onClick={() => setActiveLink("candidates")}
            >
              <FontAwesomeIcon icon={faUserTie} />
              <h6>candidates</h6>
            </li>
            <li
              className={activeLink === "invitations" ? styles.active_link : ""}
              onClick={() => setActiveLink("invitations")}
            >
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
              <h6>Invitations</h6>
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
                <Col md={5}>
                  <div className={`${styles.box} ${styles.plan}`}>
                    <div className="d-flex justify-content-between">
                      <h6>
                        <FontAwesomeIcon
                          className={styles.crown}
                          icon={faCrown}
                        />{" "}
                        Golden Package
                        <br />
                        <span className={`${styles.plan_date} mini_word`}>
                          7 days left
                        </span>
                      </h6>
                      <span className={styles.price}>$5000/month</span>
                    </div>

                    <div className={styles.plan_btns}>
                      <button className={styles.upgrade_btn} title="upgrade">
                        <FontAwesomeIcon icon={faArrowUp} />
                      </button>
                      <button className={styles.recharge_btn}>Recharge</button>
                    </div>
                  </div>
                </Col>
              )}
              {(activeLink === "main" ||
                activeLink === "invitations" ||
                activeLink === "analysis") && (
                <Col md={7}>
                  <div className={`${styles.box} ${styles.admins_invitations}`}>
                    <AdminsInvitations />
                  </div>
                </Col>
              )}
              {(activeLink === "main" ||
                activeLink === "jobs" ||
                activeLink === "candidates" ||
                activeLink === "analysis") && (
                <Col md={8}>
                  <div className={`${styles.box} ${styles.applications}`}>
                    <TotalApplications />
                  </div>
                </Col>
              )}

              {(activeLink === "main" ||
                activeLink === "candidates" ||
                activeLink === "analysis") && (
                <Col md={4}>
                  <div className={`${styles.box} ${styles.consumption}`}>
                    <Packageconsumption />
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
                          <th>employee</th>
                          <th>title</th>
                          <th>type</th>
                          <th>show</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myEmployees.map((employee) => {
                          return (
                            <tr key={employee.id}>
                              <ListedEmployees
                                id={employee.id}
                                pic={employee.photo}
                                name={employee.name}
                                title={employee.title}
                                type={employee.type}
                                grid="table"
                              />
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Col>
              )}
              {(activeLink === "main" || activeLink === "jobs") && (
                <>
                  {relatedJobs && (
                    <Col md={12}>
                      <div className={`${styles.box}`}>
                        <h5 className="fw-bold mt-3">Current Jobs</h5>
                        {relatedJobs.data?.length > 0 ? (
                          <table className={`${styles.employee_table} my-4`}>
                            <thead>
                              <tr className={styles.table_header}>
                                <th>title</th>
                                <th>Location</th>
                                <th>controls</th>
                              </tr>
                            </thead>
                            <tbody>
                              <>
                                {relatedJobs.data?.map((job) => {
                                  return (
                                    <tr key={job.id}>
                                      <CurrentJobs
                                        key={job.id}
                                        jobId={job.id}
                                        job={job}
                                        setShowResponse={setShowResponse}
                                        setResponseMessage={setResponseMessage}
                                        setSuccessResponse={setSuccessResponse}
                                        refetch={refetch}
                                      />
                                    </tr>
                                  );
                                })}
                              </>
                            </tbody>
                          </table>
                        ) : (
                          <NoDataBox
                            className="m-auto"
                            text="you don't have any current jobs yet if there is problem you can call support team"
                          />
                        )}
                      </div>
                    </Col>
                  )}
                </>
              )}
              {(activeLink === "main" || activeLink === "users") && (
                <Col>
                  <div className={`${styles.box}`}>
                    <CompanyAdmins />
                  </div>
                </Col>
              )}
              {(activeLink === "main" ||
                activeLink === "candidates" ||
                activeLink === "invitations") && (
                <Col md={12}>
                  <div className={`${styles.box}`}>
                    <h5 className="fw-bold mt-3">Track Invitations</h5>
                    <table className={`${styles.employee_table} my-4`}>
                      <thead>
                        <tr className={styles.table_header}>
                          <th>employee</th>
                          <th>title</th>
                          <th>State</th>
                          <th>show</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myEmployees.map((employee) => {
                          return (
                            <tr key={employee.id}>
                              <ListedEmployees
                                id={employee.id}
                                pic={employee.photo}
                                name={employee.name}
                                title={employee.title}
                                state={employee.state}
                                grid="table"
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
            </Row>
          </Container>
        </div>
      </Container>
      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </>
  );
};

export default CompanyDashboard;
