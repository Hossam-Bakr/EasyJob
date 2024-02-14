import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import EdietPenIcon from "./EdietPenIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faVimeo,
  faYoutube,
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
import noData from "../../images/noData.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { edietActions } from "../../Store/defaultEdietPage-slice";

const CompanyProfileSections = ({
  city,
  country,
  founded,
  industry,
  size,
  desc,
  phone,
  facebook,
  instagram,
  website,
  twitter,
  linkedin,
  youtube,
  behance,
  vimeo
}) => {
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
      photo: "p1",
    },
    {
      id: "e2",
      name: "Atef Alaa Eldin",
      title: "Frontend Developer Angular",
      country: "Egypt",
      city: "Cairo",
      photo: "p2",
    },
    {
      id: "e3",
      name: "Sameh GadAllah",
      title: "Accounting",
      country: "Egypt",
      city: "Cairo",
      photo: "p3",
    },
    {
      id: "e4",
      name: "Ramdan Kareem",
      title: "Unit Tester| Mern Stack",
      country: "Egypt",
      city: "Cairo",
      photo: "p4",
    },
    {
      id: "e5",
      name: "Mohsen Ali",
      title: "sales & marketing director",
      country: "Egypt",
      city: "Cairo",
      photo: "p5",
    },
    {
      id: "e6",
      name: "Mohand Mostafa",
      title: "Assistant Floor @Huwawei",
      country: "Egypt",
      city: "Cairo",
      photo: "p6",
    },
  ];

  let companyIndustry="Software Engineering";

  switch (industry) {
    case 10:
      companyIndustry = "Information and communications technology (ICT)";
      break;

    default:
      break;
  }

  const dispatch=useDispatch();
  const navigate=useNavigate()

  const navigateToEdietProfile=(type)=>{
    dispatch(edietActions.setDefaultEdietPage(type))
    navigate("/company-info")
  }


  return (
    <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example" fill>
      <Tab eventKey="overview" title="Overview" >
        {!city && !country && !size && !desc && !founded ? (
          <div className="d-flex flex-column align-items-center p-5">
            <div className={styles.no_data}>
              <img src={noData} alt="noData" />
            </div>
            <span className="mini_word">
              Complete your Profile Information{" "}
              <Link to={"/company-info"}>here</Link>
            </span>
          </div>
        ) : (
          <div className={styles.main_style}>
            <EdietPenIcon onClick={()=>navigateToEdietProfile("info")}/>
            <h3 className={styles.sec_title}>Company Overview</h3>
            <Row className={styles.general_info}>
              <Col md={7}>
                <ul className={styles.general_info_list}>
                  {city && country && (
                    <li>
                      <span className={styles.info_title}>
                        {" "}
                        <FontAwesomeIcon icon={faLocationDot} /> Location:
                      </span>{" "}
                      <span>
                        {city ? city : ""} {country ? ", " + country : ""}
                      </span>
                    </li>
                  )}
                  {founded && (
                    <li>
                      <span className={styles.info_title}>
                        <FontAwesomeIcon icon={faClockRotateLeft} /> Founded:
                      </span>{" "}
                      <span>{founded}</span>
                    </li>
                  )}
                  <li>
                    <span className={styles.info_title}>
                      <FontAwesomeIcon icon={faBuildingCircleCheck} /> Industry:
                    </span>{" "}
                    <span>{companyIndustry}</span>
                  </li>
                  {size && (
                    <li>
                      <span className={styles.info_title}>
                        <FontAwesomeIcon icon={faUsers} /> Company size:
                      </span>{" "}
                      <span>{size}</span>
                    </li>
                  )}
                  {phone && (
                    <li>
                      <span className={styles.info_title}>
                        <FontAwesomeIcon icon={faUsers} /> Phone Number:
                      </span>{" "}
                      <span>{phone}</span>
                    </li>
                  )}

                {(linkedin || facebook || youtube || website || twitter|| behance || instagram)&&
                      <li>
                      <span className={styles.info_title}>
                        <FontAwesomeIcon icon={faSquarePhone} /> Contact links:
                      </span>{" "}
                      <div className={`${styles.contact_icons}`}>
                        {linkedin && (
                          <Link to={linkedin} target={"_blank"}>
                            <FontAwesomeIcon
                              icon={faLinkedin}
                              className={styles.contact_icon}
                            />
                          </Link>
                        )}
                        {facebook && (
                          <Link to={facebook} target={"_blank"}>
                            <FontAwesomeIcon
                              icon={faFacebook}
                              className={styles.contact_icon}
                            />
                          </Link>
                        )}
                        {youtube && (
                          <Link to={youtube} target={"_blank"}>
                            <FontAwesomeIcon
                              icon={faYoutube}
                              className={styles.contact_icon}
                            />
                          </Link>
                        )}
                        {website && (
                          <Link to={website} target={"_blank"}>
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              className={styles.contact_icon}
                            />
                          </Link>
                        )}
                        {twitter && (
                          <Link to={twitter} target={"_blank"}>
                            <FontAwesomeIcon
                              icon={faTwitter}
                              className={styles.contact_icon}
                            />
                          </Link>
                        )}
                        {instagram && (
                          <Link to={instagram} target={"_blank"}>
                            <FontAwesomeIcon
                              icon={faInstagram}
                              className={styles.contact_icon}
                            />
                          </Link>
                        )}
                        {behance && (
                          <Link to={behance} target={"_blank"}>
                            <FontAwesomeIcon
                              icon={faInstagram}
                              className={styles.contact_icon}
                            />
                          </Link>
                        )}
                        {vimeo && (
                          <Link to={vimeo} target={"_blank"}>
                            <FontAwesomeIcon
                              icon={faVimeo}
                              className={styles.contact_icon}
                            />
                          </Link>
                        )}
                      </div>
                    </li>
                }
              
                </ul>
              </Col>
              <Col md={5} className={styles.desc_container}>
                <div className={styles.desc}>
                  <h6 className={styles.desc_title}>Company Desc:</h6>
                  <span>
                    {desc?desc:'Add You Description here'}
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        )}
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
                <li className="my-5 py-4" key={employee.id}>
                  <ListedEmployees
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
