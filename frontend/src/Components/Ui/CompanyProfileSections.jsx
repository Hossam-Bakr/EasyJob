import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import EdietPenIcon from "./EdietPenIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBehance,
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faVimeo,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./CompanyProfileSections.module.css";
import JobPost from "./JobPost";
import MainBtnThree from "./MainBtnThree";
import ListedEmployees from "./ListedEmployees";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { edietActions } from "../../Store/defaultEdietPage-slice";
import NoDataBox from "./NoDataBox";

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
  vimeo,
}) => {
  const myJobs = [
    {
      key: 1,
      name: "huwawei",
      jobTitle: "Call Center",
      req: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      type: "full-time",
      workplace: "remote",
      time: "5 min",
    },
    {
      key: 2,
      name: "Huwawei",
      jobTitle: "Electrical Engineer",
      req: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      type: "full-time",
      workplace: "remote",
      
     
      time: "2 days",
    },
    {
      key: 3,
      name: "huwawei",
      jobTitle: "Frontend React Developer",
      req: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      type: "full-time",
      workplace: "remote",
      time: "5 months",
    },
    {
      key: 4,
      name: "huwawei",
      jobTitle: "Financial Advisor",
      req: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      workplace: "remote",
      type: "full-time",
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
    },
    {
      id: "e2",
      name: "Atef Alaa Eldin",
      title: "Frontend Developer Angular",
      country: "Egypt",
      city: "Cairo",
    },
    {
      id: "e3",
      name: "Sameh GadAllah",
      title: "Accounting",
      country: "Egypt",
      city: "Cairo",
      type: "part-time",
      workplace: "on site",
    },
    {
      id: "e4",
      name: "Ramdan Kareem",
      title: "Unit Tester| Mern Stack",
      country: "Egypt",
      city: "Cairo",
    },
    {
      id: "e5",
      name: "Mohsen Ali",
      title: "sales & marketing director",
      country: "Egypt",
      city: "Cairo",
    },
    {
      id: "e6",
      name: "Mohand Mostafa",
      title: "Assistant Floor @Huwawei",
      country: "Egypt",
      city: "Cairo",
    },
  ];

  let companyIndustry = "Software Engineering";

  switch (industry) {
    case 10:
      companyIndustry = "Information and communications technology (ICT)";
      break;

    default:
      break;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToEdietProfile = (type) => {
    dispatch(edietActions.setDefaultEdietPage(type));
    navigate("/company-info");
  };

  return (
    <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example" fill>
      <Tab eventKey="overview" title="Overview">
        {!city && !country && !size && !desc && !founded ? (
          <NoDataBox
            text="Complete your Profile Information"
            path="/company-info"
          />
        ) : (
          <>
            <div className={styles.main_style}>
              <EdietPenIcon onClick={() => navigateToEdietProfile("info")} />
              <h3 className={styles.sec_title}>Company Overview</h3>
              <Row className={styles.general_info}>
                <Col md={7}>
                  <ul className={styles.general_info_list}>
                    {city && country && (
                      <li>
                        <span className={styles.info_title}>Location:</span>
                        <span>
                          {city ? city : ""} {country ? ", " + country : ""}
                        </span>
                      </li>
                    )}
                    {founded && (
                      <li>
                        <span className={styles.info_title}>Founded:</span>
                        <span>{founded}</span>
                      </li>
                    )}
                    <li>
                      <span className={styles.info_title}>Industry:</span>
                      <span>{companyIndustry}</span>
                    </li>
                    {size && (
                      <li>
                        <span className={styles.info_title}>Company size:</span>
                        <span>{size} employee</span>
                      </li>
                    )}
                    {phone && (
                      <li>
                        <span className={styles.info_title}>Phone Number:</span>
                        <span>{phone}</span>
                      </li>
                    )}
                  </ul>
                </Col>
                <Col md={5} className={styles.desc_container}>
                  <div className={styles.desc}>
                    <h6 className={styles.desc_title}>Company Desc:</h6>
                    <span>{desc ? desc : "Add You Description here"}</span>
                  </div>
                </Col>
              </Row>
            </div>

              <div className={styles.contact_links}>
                {(linkedin ||
                  facebook ||
                  youtube ||
                  website ||
                  twitter ||
                  behance ||
                  instagram) && (
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
                          icon={faBehance}
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
                )}
              </div>
          </>
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
                  req={job.req}
                  logo={null}
                  type={job.type}
                  workplace={job.workplace}
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
