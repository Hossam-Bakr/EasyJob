import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import EdietPenIcon from "./EdietPenIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBuildingCircleCheck,
  faClockRotateLeft,
  faEnvelope,
  faLocationDot,
  faSquarePhone,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./CompanyProfileSections.module.css";
import JobPost from "./JobPost";
import MainBtnThree from "./MainBtnThree";
import ListedEmployees from "./ListedEmployees";

const CompanyProfileSections = () => {
  const myJobs = [
    {
      key: 1,
      name: "huwawei",
      jobTitle: "Call Center",
      desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      full: true,
      remote: true,
      part: false,
      freelance: false,
      time: "5 min",
    },
    {
      key: 2,
      name: "Huwawei",
      jobTitle: "Electrical Engineer",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      full: true,
      remote: true,
      part: false,
      freelance: false,
      time: "2 days",
    },
    {
      key: 3,
      name: "huwawei",
      jobTitle: "Frontend React Developer",
      desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      freelance: true,
      full: true,
      part: false,
      remote: false,
      time: "5 months",
    },
    {
      key: 4,
      name: "huwawei",
      jobTitle: "Financial Advisor",
      desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      part: true,
      freelance: true,
      remote: false,
      full: false,
      time: "2 years",
    },
  ];

  const myEmployees = [
    {
      id: "e1",
      name: "Omar Nasr",
      title: "Software Engineering Team Leader",
      country: "Egypt",
      city: "Cairo",
      photo:"p1"
    },
    {
      id: "e2",
      name: "Atef Alaa Eldin",
      title: "Frontend Developer Angular",
      country: "Egypt",
      city: "Cairo",
      photo:"p2"
    },
    {
      id: "e3",
      name: "Sameh GadAllah",
      title: "Accounting",
      country: "Egypt",
      city: "Cairo",
      photo:"p3"
    },
    {
      id: "e4",
      name: "Ramdan Kareem",
      title: "Unit Tester| Mern Stack",
      country: "Egypt",
      city: "Cairo",
      photo:"p4"
    },
    {
      id: "e5",
      name: "Mohsen Ali",
      title: "sales & marketing director",
      country: "Egypt",
      city: "Cairo",
      photo:"p5"
    },
    {
      id: "e6",
      name: "Mohand Mostafa",
      title: "Assistant Floor @Huwawei",
      country: "Egypt",
      city: "Cairo",
      photo:"p6"
    },
  ];

  return (
    <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example" fill>
      <Tab eventKey="overview" title="Overview">
        <div className={styles.main_style}>
          <h3 className={styles.sec_title}>Company Overview</h3>
          <EdietPenIcon />
          <Row className={styles.general_info}>
            <Col md={7}>
              <ul className={styles.general_info_list}>
                <li>
                  <span className={styles.info_title}>
                    {" "}
                    <FontAwesomeIcon icon={faLocationDot} /> Location:
                  </span>{" "}
                  <span>Cairo, Egypt</span>
                </li>
                <li>
                  <span className={styles.info_title}>
                    <FontAwesomeIcon icon={faClockRotateLeft} /> Founded:
                  </span>{" "}
                  <span>2/2/2024</span>
                </li>
                <li>
                  <span className={styles.info_title}>
                    <FontAwesomeIcon icon={faBuildingCircleCheck} /> Industry:
                  </span>{" "}
                  <span>Information and communications technology (ICT)</span>
                </li>
                <li>
                  <span className={styles.info_title}>
                    <FontAwesomeIcon icon={faUsers} /> Company size:
                  </span>{" "}
                  <span>more than 1000 employees</span>
                </li>
                <li>
                  <span className={styles.info_title}>
                    <FontAwesomeIcon icon={faSquarePhone} /> Contact links:
                  </span>{" "}
                  <div className={`${styles.contact_icons}`}>
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className={styles.contact_icon}
                    />
                    <FontAwesomeIcon
                      icon={faGithub}
                      className={styles.contact_icon}
                    />
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className={styles.contact_icon}
                    />
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className={styles.contact_icon}
                    />
                  </div>
                </li>
              </ul>
            </Col>
            <Col md={5} className={styles.desc_container}>
              <div className={styles.desc}>
                <h6 className={styles.desc_title}>Company Desc:</h6>
                <span>
                  Founded in 1987, Huawei is a leading global provider of
                  information and communications technology (ICT) infrastructure
                  and smart devices. We have 207,000 employees and operate in
                  over 170 countries and regions, serving more than three
                  billion people around the world
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </Tab>
      <Tab eventKey="jobs" title="Jobs">
        <div className={`${styles.main_style} ${styles.job_section}`}>
          <h3 className={styles.sec_title}>Posted Jobs</h3>
          <div className="mt-4">
            {myJobs.map((job) => {
              return (
                <JobPost
                  key={job.key}
                  name={job.name}
                  jobTitle={job.jobTitle}
                  desc={job.desc}
                  logo={job.logo}
                  full={job.full}
                  remote={job.remote}
                  part={job.part}
                  freelance={job.freelance}
                  time={job.time}
                  grid={false}
                  profile={true}
                />
              );
            })}

            <div className="text-center">
              <MainBtnThree text="Load More" />
            </div>
          </div>
        </div>
      </Tab>
      
      <Tab eventKey="employees" title="Employees">
        <div className={`${styles.main_style} ${styles.employees_section}`}>
          <h3 className={styles.sec_title}> Employees Working on Huwawei</h3>
          <ul className={`${styles.employee_ul} mt-4`}>
            {myEmployees.map((employee) => {
              return (
                <li className="my-5 py-4">
                  <ListedEmployees
                    key={employee.id}
                    pic={employee.photo}
                    name={employee.name}
                    title={employee.title}
                    country={employee.country}
                    city={employee.city}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </Tab>
    </Tabs>
  );
};

export default CompanyProfileSections;
