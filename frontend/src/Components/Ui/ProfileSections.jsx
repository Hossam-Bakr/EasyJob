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
import contact_info from "../../images/contact_info.png";
import azhar_logo from "../../images/azharlogo.jpeg";

const ProfileSections = () => {
  const [showContactInfo, setShowContactInfo] = useState(false);

  const toggleShowContactInfoDiv = () => {
    setShowContactInfo((showContactInfo) => !showContactInfo);
  };

  return (
    <>
      {/* contacts */}
      <section
        className={`${styles.main_style} ${styles.contact_info_section} ${
          showContactInfo ? styles.main_style_spread : ""
        }`}
      >
        <EdietPenIcon />
        <h3 className={styles.sec_title}>Contact Info</h3>
        <div className={styles.contact_info_body}>
          <div className={styles.contact_info_body_header}>
            <ul>
              <li className={styles.info_header_li}>
                <FontAwesomeIcon icon={faPhone} className={styles.list_icon} />{" "}
                0114360092/01550922214
              </li>
              <li className={styles.info_header_li}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={styles.list_icon}
                />{" "}
                Bassam@gmail.com
              </li>
            </ul>
          </div>
          <button
            onClick={toggleShowContactInfoDiv}
            className={styles.show_more_btn}
          >
            show more <FontAwesomeIcon icon={faCaretDown} />
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
                <li className={styles.info_tail_li}>
                  <span className={styles.info_tail_li_title}>Birthday:</span>
                  <span>3/1/2001</span>
                </li>
                <li className={styles.info_tail_li}>
                  <span className={styles.info_tail_li_title}>
                    Nationality:
                  </span>
                  <span>Egypt</span>
                </li>
                <li className={styles.info_tail_li}>
                  <span className={styles.info_tail_li_title}>Gender:</span>
                  <span>Male</span>
                </li>
                <li className={styles.info_tail_li}>
                  <span className={styles.info_tail_li_title}>
                    Minimum Salary:
                  </span>
                  <span>confidential</span>
                </li>
              </ul>
            </Col>
            <Col
              md={6}
              className={`${styles.contact_info_container} d-flex justify-content-center align-items-center`}
            >
              <div className={styles.contact_info_img}>
                <img src={contact_info} className="w-100" alt="contact info" />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* about */}
      <section className={`${styles.main_style} ${styles.about_sec}`}>
        <EdietPenIcon />
        <h3 className={styles.sec_title}>About</h3>
        <p className={styles.about_p}>
          I'm Bassam, a student in Faculty of Engineering, Department of
          Computer System and Information Technology Al-Azhar University, As a
          Frontend Developer, I'm passionate about building responsive and
          intuitive web interfaces that engage users and drive results. With
          expertise in modern web development technologies such as HTML5, CSS3,
          JavaScript, jQuery and React frameworks , I'm skilled at turning
          complex design concepts into elegant and effective code. Whether
          collaborating with designers, stakeholders, or cross-functional teams,
          I thrive in fast-paced environments and can deliver high-quality
          projects on time and within budget. Let's connect to discuss how I can
          help bring your next digital project to life.
        </p>
      </section>

      {/* education */}
      <section className={`${styles.main_style} ${styles.education_sec}`}>
        <EdietPenIcon />
        <h3 className={styles.sec_title}>Education</h3>
        <ul>
          <li>
            <div className={styles.education_logo}>
              <img src={azhar_logo} alt="azhar logo" className="w-100" />
            </div>
            <div className={styles.education_caption}>
              <h3>Al-Azhar University</h3>
              <span className="mini_word">
                Bachelor of Engineer, Faculty of Engineering Department of
                System & Information Technology Bachelor of Engineer, Faculty of
                Engineering Department of System & Information Technology
              </span>
              <span className="mini_word">Jul 2019 - Jul 2024</span>
              <span className={styles.education_grade}>Grade: very good</span>
            </div>
          </li>
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

        <div className={`${styles.candidate_skills} d-flex mt-4`}>
          <div className={`${styles.skill} ${styles.expert} mx-2`}>
            <span>HTML</span>
          </div>
          <div className={`${styles.skill}  ${styles.expert} mx-2`}>
            <span>CSS</span>
          </div>
          <div className={`${styles.skill}  ${styles.medium} mx-2`}>
            <span>JS</span>
          </div>
          <div className={`${styles.skill}  ${styles.medium} mx-2`}>
            <span>JQuery</span>
          </div>
          <div className={`${styles.skill}  ${styles.medium} mx-2`}>
            <span>React Js</span>
          </div>
          <div className={`${styles.skill}  ${styles.expert} mx-2`}>
            <span>TypeScript</span>
          </div>
          <div className={`${styles.skill}  ${styles.low} mx-2`}>
            <span>SQL</span>
          </div>
          <div className={`${styles.skill}  ${styles.expert} mx-2`}>
            <span>Office</span>
          </div>
          <div className={`${styles.skill}  ${styles.low} mx-2`}>
            <span>Java</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileSections;
