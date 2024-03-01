import React, { useState } from "react";
import styles from "./ProfileSections.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import EdietPenIcon from "./EdietPenIcon";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import contact_info from "../../images/contact_info.png";
import { useDispatch } from "react-redux";
import { edietActions } from "../../Store/defaultEdietPage-slice";
import { Link, useNavigate } from "react-router-dom";
import NoDataBox from "./NoDataBox";
import {
  faBehance,
  faFacebook,
  faGithub,
  faLinkedin,
  faStackOverflow,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import WorkExperienceBox from "./WorkExperienceBox";
import FloatingPopup from './FloatingPopup';
import EducationBox from "./EducationBox";


const ProfileSections = ({
  phone,
  email,
  url,
  birthDate,
  nationality,
  gender,
  about,
  drivingLicense,
  facebook,
  stackOverflow,
  linkedin,
  twitter,
  youtube,
  website,
  behance,
  github,
  Experiences,
  Education
}) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(Experiences);
  const toggleShowContactInfoDiv = () => {
    setShowContactInfo((showContactInfo) => !showContactInfo);
  };

  const navigateToEdiet = (type) => {
    dispatch(edietActions.setDefaultEdietPage(type));
    navigate("/user-info");
  };

  return (
    <>
      {/* contacts */}
      {!phone && !url && !birthDate && !nationality && !gender ? (
        <section className={`${styles.main_style}`}>
          <EdietPenIcon onClick={() => navigateToEdiet("info")} />
          <h3 className={styles.sec_title}>Contact Info</h3>
          <div className={styles.contact_info_body}>
            <div className={styles.noData_container}>
              <NoDataBox
                text="Complete your Profile Information"
                path="/user-info"
              />
            </div>
          </div>
        </section>
      ) : (
        <>
          <section
            className={`${styles.main_style} ${styles.contact_info_section} ${
              showContactInfo ? styles.main_style_spread : ""
            }`}
          >
            <EdietPenIcon onClick={() => navigateToEdiet("info")} />
            <h3 className={styles.sec_title}>Contact Info</h3>
            <div className={styles.contact_info_body}>
              <div className={styles.contact_info_body_header}>
                <ul>
                  {phone && (
                    <li className={styles.info_header_li}>
                      <FontAwesomeIcon
                        icon={faPhone}
                        className={styles.list_icon}
                      />
                      {phone}
                    </li>
                  )}
                  {email && (
                    <li className={styles.info_header_li}>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className={styles.list_icon}
                      />
                      {email}
                    </li>
                  )}
                </ul>
              </div>
              <button
                onClick={toggleShowContactInfoDiv}
                className={styles.show_more_btn}
              >
                {showContactInfo ? "Show Less" : "Show More"}{" "}
                <FontAwesomeIcon icon={faCaretDown} />
              </button>
              <Row
                className={`${styles.contact_info_body_tail} ${
                  showContactInfo ? styles.showContactInfo : ""
                }`}
              >
                <Col md={6}>
                  <ul>
                    <li className={styles.info_tail_li}>
                      <span className={styles.info_tail_li_title}>
                        Profile url:
                      </span>
                      <span>easy-job/profile/Bassam-Hafez-5134</span>
                    </li>
                    {birthDate && (
                      <li className={styles.info_tail_li}>
                        <span className={styles.info_tail_li_title}>
                          Birthdate:
                        </span>
                        <span>{birthDate}</span>
                      </li>
                    )}
                    {nationality && (
                      <li className={styles.info_tail_li}>
                        <span className={styles.info_tail_li_title}>
                          Nationality:
                        </span>
                        <span>{nationality}</span>
                      </li>
                    )}
                    {gender && (
                      <li className={styles.info_tail_li}>
                        <span className={styles.info_tail_li_title}>
                          Gender:
                        </span>
                        <span>{gender}</span>
                      </li>
                    )}
                    {drivingLicense !== null && (
                      <li className={styles.info_tail_li}>
                        <span className={styles.info_tail_li_title}>
                          Driving License:
                        </span>
                        <span>{drivingLicense ? "Yes" : "No"}</span>
                      </li>
                    )}
                  </ul>
                </Col>
                <Col
                  md={6}
                  className={`${styles.contact_info_container} d-flex justify-content-center align-items-center`}
                >
                  <div className={styles.contact_info_img}>
                    <img
                      src={contact_info}
                      className="w-100"
                      alt="contact info"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </section>
        </>
      )}

      {/* about */}
      <section className={`${styles.main_style} ${styles.about_sec}`}>
        <EdietPenIcon onClick={() => navigateToEdiet("info")} />
        <h3 className={styles.sec_title}>About</h3>
        {about ? (
          <p className={styles.about_p}>{about}</p>
        ) : (
          <NoDataBox
            text="Introduce Yourself to get Jobs faster"
            path="/user-info"
          />
        )}
      </section>

      {/* education */}
      <section className={`${styles.main_style} ${styles.education_sec}`}>
        <EdietPenIcon text="+Add" onClick={()=>navigateToEdiet("education")} />
        <h3 className={styles.sec_title}>Education</h3>
        <ul>
        {Education.length !== 0 ? (
          Education.map((item) => (
            <EducationBox
              key={item.id}
              itemId={item.id}
              grade={item.grade}
              school={item.school}
              degree={item.degree}
              fieldsOfStudy={item.fieldsOfStudy}
              startDate={item.startDate}
              endDate={item.endDate}
              description={item.description}
              setSecResponseMsg={setResponseMessage}
              setSecSuccess={setSuccessResponse}
              setSecShowResponse={setShowResponse}
            />
          ))
        ) : (
          <NoDataBox text="Start Adding Your Contact Links" path="/user-info" />
        )}
        </ul>
      </section>

      {/* skills */}
      <section className={`${styles.main_style}`}>
        <EdietPenIcon text="+Add" />
        <h3 className={styles.sec_title}>Skills</h3>
        <div className={`${styles.skill_color} d-flex`}>
          <div className="d-flex justify-content-center align-items-center mx-2">
            <div className={styles.red_circle}></div>{" "}
            <span className="mini_word">Entry</span>
          </div>
          <div className="d-flex justify-content-center align-items-center mx-2">
            <div className={styles.yellow_circle}></div>{" "}
            <span className="mini_word">Medium</span>
          </div>
          <div className="d-flex justify-content-center align-items-center mx-2">
            <div className={styles.green_circle}></div>{" "}
            <span className="mini_word">Expert</span>
          </div>
        </div>
        <Container className="my-4 ">
          <Row className={`${styles.candidate_skills} gy-2 w-100`}>
            <Col sm={2} className={`${styles.skill} ${styles.expert} mx-2`}>
              <span>HTML</span>
            </Col>
            <Col sm={2} className={`${styles.skill}  ${styles.expert} mx-2`}>
              <span>CSS</span>
            </Col>
            <Col sm={2} className={`${styles.skill}  ${styles.medium} mx-2`}>
              <span>JS</span>
            </Col>
            <Col sm={2} className={`${styles.skill}  ${styles.medium} mx-2`}>
              <span>JQuery</span>
            </Col>
            <Col sm={2} className={`${styles.skill}  ${styles.medium} mx-2`}>
              <span>React Js</span>
            </Col>
            <Col sm={2} className={`${styles.skill}  ${styles.expert} mx-2`}>
              <span>TypeScript</span>
            </Col>
            <Col sm={2} className={`${styles.skill}  ${styles.low} mx-2`}>
              <span>SQL</span>
            </Col>
            <Col sm={2} className={`${styles.skill}  ${styles.expert} mx-2`}>
              <span>Office</span>
            </Col>
            <Col sm={2} className={`${styles.skill}  ${styles.low} mx-2`}>
              <span>Java</span>
            </Col>
          </Row>
        </Container>
   
      </section>


      {/* Experiance */}
      <section className={styles.main_style}>
        <EdietPenIcon
          text="+Add"
          onClick={() => navigateToEdiet("experience")}
        />
        <h3 className={styles.sec_title}>Work Experience</h3>
        {Experiences.length !== 0 ? (
          Experiences.map((exp) => (
            <WorkExperienceBox
              key={exp.id}
              expId={exp.id}
              title={exp.title}
              type={exp.type}
              category={exp.category}
              description={exp.description}
              startDate={exp.startDate}
              endDate={exp.endDate}
              organization={exp.organization}
              setSecResponseMsg={setResponseMessage}
              setSecSuccess={setSuccessResponse}
              setSecShowResponse={setShowResponse}
            />
          ))
        ) : (
          <NoDataBox text="Start Adding Your Contact Links" path="/user-info" />
        )}
      </section>
      
      {/* contact */}
      <section className={`${styles.main_style}`}>
        <EdietPenIcon text="Ediet" onClick={() => navigateToEdiet("contact")} />
        <h3 className={styles.sec_title}>Contact Links</h3>
        {website ||
        facebook ||
        linkedin ||
        twitter ||
        stackOverflow ||
        github ||
        behance ||
        youtube ? (
          <div className={styles.contact_links}>
            {website && (
              <Link to={website} target="_blank">
                <FontAwesomeIcon icon={faEnvelope} />
              </Link>
            )}
            {facebook && (
              <Link to={facebook} target="_blank">
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
            )}
            {linkedin && (
              <Link to={linkedin} target="_blank">
                <FontAwesomeIcon icon={faLinkedin} />
              </Link>
            )}
            {twitter && (
              <Link to={twitter} target="_blank">
                <FontAwesomeIcon icon={faXTwitter} />
              </Link>
            )}
            {stackOverflow && (
              <Link to={stackOverflow} target="_blank">
                <FontAwesomeIcon icon={faStackOverflow} />
              </Link>
            )}
            {github && (
              <Link to={github} target="_blank">
                <FontAwesomeIcon icon={faGithub} />
              </Link>
            )}
            {behance && (
              <Link to={behance} target="_blank">
                <FontAwesomeIcon icon={faBehance} />
              </Link>
            )}
            {youtube && (
              <Link to={youtube} target="_blank">
                <FontAwesomeIcon icon={faYoutube} />
              </Link>
            )}
          </div>
        ) : (
          <NoDataBox text="Start Adding Your Contact Links" path="/user-info" />
        )}
      </section>

      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </>
  );
};

export default ProfileSections;
